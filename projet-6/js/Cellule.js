 /**
  * Représente les différentes cellules du tableau.
  * @constructor
  * @param {string} id - l'id généré à la création de la carte
  * @param {number} x - la position verticale
  * @param {number} y - la position horizontale
  * @param {boolean} accessible - définit si la case est ou non un obstacle
  * @param {boolean} disponible - définit si la case peut accueillir une arme ou un joueur
  * @param {object} contientArme - l'arme contenue par la case 
  */

 class Cellule {
     constructor(id, x, y, accessible = true, disponible = true) {
         this.id = id;
         this.x = x;
         this.y = y;
         this.accessible = accessible;
         this.disponible = disponible;
         this.contientArme = null;
     }

 }