/** création des instances de la classe "Arme" */
let mitraillette = new Arme("mitraillette", "./img/mitraillette.png", 10);
let pistolet = new Arme("pistolet", "./img/pistolet.png", 5);
let lancegrenades = new Arme("lance-grenades", "./img/lance-grenades.png", 50);
let fusil = new Arme("fusil", "./img/fusil2.png", 25);

/**  tableau qui regroupe les armes */
let tabArmes = [mitraillette, pistolet, lancegrenades, fusil];

/**  création des instances de la classe "Joueurs" */
let joueurUn = new Joueur("Edea", "./img/edea.png");
let joueurDeux = new Joueur("Grounch", "./img/grounch.png");

/** tableau qui regroupe les joueurs */
let tabJoueurs = [joueurUn, joueurDeux];

/** création de la carte qui comprend : nombre de lignes, nombre de colonnes, nombre de cellules Inaccessibles, tableau des armes, tableau des joueurs */
let carteUne = new Carte(4, 6, 3, tabJoueurs, tabArmes);

