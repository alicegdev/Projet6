/**
 * Représente la carte de jeu et ses attributs.
 * @constructor
 * @param {number} lignes - le nombre de lignes du tableau généré.
 * @param {number} colonnes - le nombre de colonnes généré.
 * @param {number} nbCasesInaccessibles - le nombre de cases inaccessibles.
 * @param {array} cellules - contient instances de la classe "Cellule".
 * @param {array} tabJoueurs - contient instances de la classe "Joueurs" - générées dans le main.js
 * @param {array} tabArmes - contient instances de la classe "Armes"  - générées dans le main.js
 */

class Carte {
  constructor(lignes, colonnes, nbCasesInaccessibles, tabJoueurs, tabArmes) {
    this.lignes = lignes;
    this.colonnes = colonnes;
    this.nbCasesInaccessibles = nbCasesInaccessibles;
    this.cellules = [];
    this.tabJoueurs = tabJoueurs;
    this.tabArmes = tabArmes;
    let btnGenerer = document.getElementById("btn_generer");
    btnGenerer.addEventListener("click", () => {
      this.generer();
    });
  }

  /**
   * génère la carte avec le tableau HTML et le tableau des instances Cellules, affiche les encadrés joueurs
   */
  generer() {
    let banner = document.getElementById("banner");
    banner.style.display = "none";
    let game = document.getElementById("game");
    let tbl = document.createElement("table");
    let espaceJoueurs = document.createElement("aside");
    let coteJoueurUn = document.createElement("article");
    this.tabJoueurs[0].coteJoueur = coteJoueurUn;
    let coteJoueurDeux = document.createElement("article");
    joueurDeux.coteJoueur = coteJoueurDeux;
    tbl.append(espaceJoueurs);
    espaceJoueurs.append(coteJoueurUn, coteJoueurDeux);
    espaceJoueurs.setAttribute("id", "espaceJoueurs");
    let tblBody = document.createElement("tbody");

    for (let i = 0; i < this.lignes; i++) {
      let colonne = document.createElement("tr");
      for (let j = 0; j < this.colonnes; j++) {
        let cellule = document.createElement("td");
        cellule.id += "cellule" + j + i;

        this.cellules.push(new Cellule("cellule" + j + i, j, i, true));
        colonne.appendChild(cellule);
      }
      tblBody.appendChild(colonne);
    }
    tbl.appendChild(tblBody);
    game.appendChild(tbl);
    tbl.setAttribute("border", "2");
    joueurUn.actif = true;
    joueurDeux.actif = false;
    tabJoueurs.forEach((joueur) => {
      joueur.afficheInfos();
    });
    this.genererCasesInaccessibles();
    this.genererCasesArmes();
    this.genererCasesJoueurs();
  }
  /**
   * génère des cases sur lesquelles rien ne peut être placé
   */
  genererCasesInaccessibles() {
    let k = 0;
    let cellulesInaccessibles = [];
    let randomCellule;

    while (k < this.nbCasesInaccessibles) {
      do {
        randomCellule = this.rechercheCasesDisponibles();
      } while (randomCellule === undefined);
      randomCellule.accessible = false;
      randomCellule.disponible = false;
      let $randomCell = document.getElementById(randomCellule.id);
      $randomCell.innerHTML =
        "<div class = 'croix'><i class='fas fa-times'></i></div>";
      if (cellulesInaccessibles.includes(randomCellule.id) === false) {
        k++;
        cellulesInaccessibles.push(randomCellule.id);
      }
    }
  }
  /**
   * retourne une case aléatoire qui n'est pas déjà prise par une arme, un joueur, un obstacle
   */
  rechercheCasesDisponibles() {
    let celluleRandom;
    do {
      let randomX = Math.floor(Math.random() * this.colonnes);
      let randomY = Math.floor(Math.random() * this.lignes);

      celluleRandom = this.cellules.find((cellule) => {
        return (
          cellule.x === randomX &&
          cellule.y === randomY &&
          cellule.disponible === true &&
          cellule.accessible === true
        );
      });
    } while (celluleRandom === undefined);

    return celluleRandom;
  }
  /**
   * place les instances de la classe Arme sur la carte
   */
  genererCasesArmes() {
    let randomCellule;

    for (const arme of tabArmes) {
      randomCellule = this.rechercheCasesDisponibles();
      randomCellule.disponible = false;
      let $randomCell = document.getElementById(randomCellule.id);
      $randomCell.style.backgroundImage = "url(" + arme.visuel + ")";
      this.cellules.forEach((cellule) => {
        if (cellule.id === randomCellule.id) {
          cellule.contientArme = arme;
        }
      });
    }
  }
  /**
   * place les instances de la classe Joueur sur la carte
   */
  genererCasesJoueurs() {
    let randomCellule;
    let randomCellulePOne, randomCellulePTwo;
    let placementCorrect = true;
    randomCellulePOne = this.rechercheCasesDisponibles();
    tabJoueurs[0].posX = randomCellulePOne.x;
    tabJoueurs[0].posY = randomCellulePOne.y;

    do {
      randomCellulePTwo = this.rechercheCasesDisponibles();
      tabJoueurs[1].posX = randomCellulePTwo.x;
      tabJoueurs[1].posY = randomCellulePTwo.y;
      if (
        randomCellulePTwo.id ===
          `cellule${tabJoueurs[0].posX - 1}${tabJoueurs[0].posY}` ||
        randomCellulePTwo.id ===
          `cellule${tabJoueurs[0].posX + 1}${tabJoueurs[0].posY}` ||
        randomCellulePTwo.id ===
          `cellule${tabJoueurs[0].posX}${tabJoueurs[0].posY - 1}` ||
        randomCellulePTwo.id ===
          `cellule${tabJoueurs[0].posX}${tabJoueurs[0].posY + 1}`
      ) {
        placementCorrect = false;
      } else {
        placementCorrect = true;
      }
    } while (placementCorrect === false);

    tabJoueurs.forEach((joueur) => {
      let $randomCell = document.getElementById(
        "cellule" + joueur.posX + joueur.posY
      );
      $randomCell.style.backgroundImage = "url(" + joueur.visuel + ")";
      do {
        randomCellule = this.cellules.find((cellule) => {
          return cellule.x === joueur.posX && cellule.y === joueur.posY;
        });
        randomCellule.disponible = false;
      } while (randomCellule === undefined);
    });
  }
}
