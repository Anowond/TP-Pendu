
/* Création des éléments */

let body = document.querySelector("body")

/* Conteneur principal */

let container = document.createElement("div")
container.classList.add("container")
if (body != null) {
    body.appendChild(container)
}

/* Conteneur du pendu */

let hangedDiv = document.createElement("div")
hangedDiv.classList.add("hangedDiv")
container.appendChild(hangedDiv)

/* DESSIN DU PENDU */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Création du canvas */

let canvas = document.createElement("canvas")
canvas.setAttribute("id", "canvas")
canvas.setAttribute("height", "300px")
canvas.setAttribute("width", "300px")
canvas.classList.add("canvas")

let ctx = canvas.getContext("2d")
hangedDiv.appendChild(canvas)

/* Définition d'un tableau contenant des tableaux répertoriant les différentes coordonnées du dessin du pendu */

let pendu = [

    //base: 
    [25, 250, 150, 250],
    //poutre1: 
    [85, 250, 85, 50],
    //poutre2: 
    [85, 50, 200, 50],
    //etai: 
    [85, 100, 140, 50],
    //corde: 
    [200, 50, 200, 85],
    //tête
    ["tete"],
    //corps: 
    [200, 125, 200, 200],
    //Bdroit: 
    [200, 135, 170, 155],
    //Bgauche: 
    [200, 135, 230, 155],
    //Jdroit: 
    [200, 200, 170, 225],
    //Jgauche: 
    [200, 200, 230, 225]

];

/* Fonction de dessin de la tête du pendu à part */

// Tête du pendu

function dessinerTete() {

    if (ctx != null) {

        ctx.beginPath();
        ctx.arc(200, 105, 20, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.closePath();

    }

}

/* Création d'un fonction de dessin à l'intérieur du canvas, avec comme paramétres les différents tableaux de coordonnées eux-mêmes stockés dans le tableau pendu */

function dessinerPendu(tableau) {

    if (tableau == "tete") {

        dessinerTete();

    } else if (ctx != null) {

        ctx.beginPath();
        ctx.moveTo(tableau[0], tableau[1]);
        ctx.lineTo(tableau[2], tableau[3]);
        ctx.stroke();
        ctx.closePath();

    }

}

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Conteneur du mot secret */

let secretDiv = document.createElement("div")
secretDiv.classList.add("secretDiv")
container.appendChild(secretDiv)

/* Création de la div d'affichage du mot secret */

let secretDisplay = document.createElement("div")
secretDisplay.classList.add("secretDisplay")
secretDiv.appendChild(secretDisplay)

/* Variable de la touche choisie par l'utilisateur */

let touche;

/* Variable de mot secret (mot décomposé a deviner) */

let motSecret;

/* Bouton de génération d'un nouveau mot */

let button = document.createElement("div")
button.classList.add("button")
button.textContent = "Nouveau mot !"
button.setAttribute("id", "buttonGO")
secretDiv.appendChild(button)

/* Création de la variable du compteur d'essai */

let essai = 0

/* Définition de la requête d'API */

async function getResponse() {

    const options = {
        method: 'GET',
        url: 'https://word-generator2.p.rapidapi.com/',
        headers: {
            'X-RapidAPI-Key': '7653558c72msh4744c32ce35a248p148572jsn1385e9bed9b2',
            'X-RapidAPI-Host': 'word-generator2.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
    }
}

/* Définition d'une variable "response" qui va accueillir la réponse de l'API */

let response = await getResponse()

/* Définition d'un tableau de mots */

let tableauMots = []

/* Ajout du mot aléatoire choisi par l'API dans le tableau "tableauMots" */

tableauMots.push(response.data.body[0])
console.log(tableauMots)

/* Définition de la fonction qui choisit un index dans le tableau de mots au hasard */

function choisirMot(tableau) {

    /* Définition d'une variable qui acceuillera le tableau du mot décomposé en lettres */

    let tableauLettres;

    /* Création de la variable qui récupére aléatoirement l'index du tableau */

    let random = Math.floor(Math.random() * tableau.length);

    /* Décomposition du contenu de l'index aléatoire choisi et ajout de ce contenu dans le tableau "tableauLettres" */

    tableauLettres = tableau[random].split("")

    /* Décomposition du tableau de lettres et affichage de chaque lettre dans une div a part dans la div parente "secretDisplay" */

    tableauLettres.forEach(element => {

        let divLettre = document.createElement("div")
        divLettre.classList.add("divLettre")
        divLettre.classList.add("hidden")
        divLettre.textContent = element
        secretDisplay.appendChild(divLettre)

    });

    return tableauLettres;

}

/* Création du clavier virtuel */

/* Création du tableau des touches du clavier virtuel */

let paveKeyboard = ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P", "Q", "S", "D", "F", "G", "H", "J", "K", "L", "M", "W", "X", "C", "V", "B", "N", "É", "È"]

/* Création de la div des touches du clavier virtuel */

let keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
secretDiv.appendChild(keyboard);


paveKeyboard.forEach(element => {

    let key = document.createElement("div");
    key.textContent = element;
    key.setAttribute("id", element)
    key.classList.add("key");
    keyboard.appendChild(key);

    /* Création d'un écouteur d'événement sur les touches du clavier pour récupérer leur valeur */

    key.addEventListener("click", (e) => {

        touche = e.target.id
        touche = touche.toLowerCase()
        console.log(secretDisplay)

        /* Condition de corrspondance des lettres contenues dans le tableau "motSecret" */

        if (motSecret.includes(touche)) {

            /* Décomposition des enfants de secretDisplay pour pouvoir accéder aux divs "divlettre" */

            secretDisplay.childNodes.forEach(element => {

                if (element.textContent == touche) {

                    /* Si il y a correspondance entre les lettres, alors on retire l'invisibilité de la div */

                    element.classList.remove("hidden")
                    key.classList.add("contourOK")

                }

            });

        } else {

            key.classList.add("contourFALSE")
            dessinerPendu(pendu[essai])
            essai++
            console.log(essai)

        }

    })

});



/* Création d'un écouteur d'événement sur le bouton pour générer un nouveau mot */

button.addEventListener("click", () => {

    if (secretDisplay.innerHTML == "") {

        motSecret = choisirMot(tableauMots)
        console.log(motSecret)
    } else {

        secretDisplay.innerHTML = "";
        motSecret = choisirMot(tableauMots)
        console.log(motSecret)
    }

})

motSecret = choisirMot(tableauMots)