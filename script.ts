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

/* Conteneur du mot secret */

let secretDiv = document.createElement("div")
secretDiv.classList.add("secretDiv")
container.appendChild(secretDiv)

/* Création de la div d'affichage du mot secret */

let secretDisplay = document.createElement("div")
secretDisplay.classList.add("secretDisplay")
secretDiv.appendChild(secretDisplay)

/* Création du clavier virtuel */

/* Création du tableau des touches du clavier virtuel */

let paveKeyboard = ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P", "Q", "S", "D", "F", "G", "H", "J", "K", "L", "M", "W", "X", "C", "V", "B", "N"]

/* Création de la div des touches du clavier virtuel */

let keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
secretDiv.appendChild(keyboard);

paveKeyboard.forEach(element => {

    let key = document.createElement("div");
    key.textContent = element;
    key.setAttribute("id",element)
    key.classList.add("key");
    keyboard.appendChild(key);

});



