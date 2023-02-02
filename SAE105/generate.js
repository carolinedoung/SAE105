
// Pour générer les analogies 
var analogieperso = [];
fetch('data.json').then(function (response) {
    response.json().then(function (data) {

        var modele = "<section class=\"bloc\"><div class=\"image\"><img src=\"{{image}}\" alt=\"{{alt}}\"></div><div class=\"texte\"><p class='boiteanalogie'>Si j’étais {{analogie}}, je serais {{valeurAnalogie}} parce que {{explication}}</p></div></section>";

        var main = document.getElementById("main");

        var text = "";
        data.forEach(function (element) {
            text += modele
            Object.keys(element).forEach(function (clef) {
                text = text.replaceAll("{{" + clef + "}}", element[clef]);
            })
        })

        main.innerHTML = text
    })

    const infoanalogieperso = document.querySelector('p.send');
    // Les données du formulaire sont envoyés à l'API après qu'on appuie sur le bouton "Envoyer"
    infoanalogieperso.addEventListener('click', function () {

        var main = document.getElementById("main");
        main.innerHTML += "<section class=\"bloc\"><div class=\"image\"><img src=\"" + document.querySelector('input#photo').value + "\"></div><div class=\"texte\"><p class='boiteanalogie'>Si j’étais " + document.querySelector('input#analogie').value + ", je serais " + document.querySelector('input#valeur-analogie').value + " parce que" + document.querySelector('textarea#explicationform').value + "</p></div></section>"

        // C'est le lien de l'api et c'est à cet endroit qu'on change les valeurs.
        const lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=caroline.doung&courriel=" + document.querySelector('input#mail').value + "&message=Si j'étais " + document.querySelector('input#analogie').value + "alors je serais " + document.querySelector('input#valeur-analogie').value + " car " + document.querySelector('textarea#explicationform').value + " Image proposée : " + document.querySelector('input#photo').value;

        // Affichage d'un message de confirmation de réception des données.
        fetch(lien).then(function (response) {
            response.json().then(function (data) {
                console.log("Réponse reçue : ")
                console.log(data);
                alert(data.message)
            })
        })
        // Sert à réinitialiser le formulaire. 
        resetForm();
    })

})

function resetForm() {
    const formulaire = document.querySelectorAll('form input, form textarea');
    formulaire.forEach(function (entree) {
        entree.value = "";
    })
}



//bouton mentions légales
const openModalButtons = document.querySelectorAll('[data-modal-target')
const closeModalButtons = document.querySelectorAll('[data-close-button')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button =>{
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () =>{
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal =>{
        closeModal(modal)
    })

})

closeModalButtons.forEach(button =>{
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')

}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')

}