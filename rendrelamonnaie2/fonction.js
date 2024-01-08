/**
 * bibliothèque de fonction facilitant la saisie, la conversion et la mise en forme
 *
 * @Author : Guy Verghote
 * @Version 1.5 05/10/2023
 */

// -----------------------------------------------------------
// Fonctions d'affichage
// ------------------------------------------------------------

/**
 * Génération d'un message dans une mise en forme bootstrap (class='alert-dismissible')
 * Nécessite le composant bootstrap avec la partie js !!!
 * @param {string} texte à afficher.
 * @param {string} couleur de fond : vert, rouge ou orange
 * @return {string} Chaîne au format HTML
 */

export function genererMessage(texte, couleur = 'rouge') {
    // Ne pas transformer un message x_debug
    if (texte.startsWith('<br />')) {
        return texte;
    }
    // détermination de la classe bootstrap à utiliser en fonction de la couleur choisie
    let code;
    let icone;
    if (couleur === 'vert') {
        code = '#1FA055';
        icone = 'bi-check-circle';
    } else if (couleur === 'rouge') {
        code = '#C60800';
        icone = 'bi-x-circle';
    } else if (couleur === 'orange') {
        code = '#FF7415';
        icone = 'bi-exclamation-triangle';
    }
    return `
            <div class="alert alert-dismissible fade show" 
                 style="color:white; background-color:${code}" 
                 role="alert">
                 <i class="bi ${icone}" ></i>
                 ${texte}
                 <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
            </div>`;
}

/**
 * Affiche un message dans une fenêtre modale 'Noty'
 * Nécessite le composant noty
 * @param {object} parametre doit contenir les propriétés suivantes
 * <br> message : message à afficher
 * <br>type : [facultatif] alert, success, error (défaut), warning, info
 * <br>position : [facultatif] top, topLeft, topCenter, topRight, center (center), centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight
 * <br>fermeture :[facultatif] 0 (défaut) la fenêtre disparait automatiquement, 1 il faut cliquer dans la fenêtre pour la fermer
 * <br>surFermeture : [facultatif] fonction à lancer après l'affichage
 *  <br>delai : [facultatif] délai avant la fermeture automatique de la fenêtre
 */

export function afficherMessage(parametre) {

    const type = (parametre.type) ? parametre.type : 'error';
    const position = (parametre.position) ? parametre.position : 'center';
    const fermeture = (parametre.fermeture) ? parametre.fermeture : 0;
    const delai = (parametre.delai) ? parametre.delai : 500;
    if (fermeture === 1) {
        const n = new Noty({
            text: parametre.message,
            type: type,
            modal: true,
            killer: true,
            layout: position,
            theme: 'sunset',
            buttons: [
                Noty.button('Ok', 'btn btn-sm btn-secondary float-end mt-0 mb-1', function () {
                    n.close();
                    if (parametre.surFermeture) {
                        parametre.surFermeture();
                    }
                })],
            animation: {
                open: 'animated lightSpeedI',
                close: 'animated lightSpeedOut'
            },
        });
        n.show();
    } else {
        const n = new Noty({
            text: parametre.message,
            type: type,
            modal: true,
            layout: position,
            theme: 'sunset',
            animation: {
                open: 'animated lightSpeedI',
                close: 'animated lightSpeedOut'
            },
            callbacks: {
                onClose: parametre.surFermeture
            }
        });
        n.show().setTimeout(delai);
        if (parametre.surFermeture) {
            parametre.surFermeture();
        }
    }
}

/**
 * Affiche le message d'erreur dans une boîte de dialogue
 * @param {string} message message à afficher
 */

export function afficherErreur(message) {

    const n = new Noty({
        text: message,
        type: 'error',
        modal: true,
        killer: true,
        layout: 'center',
        theme: 'sunset',
        buttons: [
            Noty.button('Ok', 'btn btn-sm btn-secondary float-end mt-0 mb-1', function () {
                n.close();
            })],
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
    });
    n.show();
}

/**
 * Affiche le message de succès de l'opération dans une boîte de dialogue avec fermeture automatique
 * la boîte sera affichée dans le coin supérieur droit
 * @param {string} message message à afficher
 */
export function afficherSucces(message) {
    const n = new Noty({
        text: message,
        type: 'success',
        modal: true,
        killer: true,
        layout: 'topRight',
        theme: 'sunset',
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
    });
    n.show().setTimeout(500);
}

/**
 * Affiche le message d'erreur dans une boîte de dialogue
 * @param {string} message message à afficher
 */
export function confirmerSucces(message) {
    const n = new Noty({
        text: message,
        type: 'success',
        modal: true,
        killer: true,
        layout: 'center',
        theme: 'sunset',
        buttons: [
            Noty.button('Ok', 'btn btn-sm btn-secondary float-end mt-0 mb-1', function () {
                n.close();
            })],
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
    });
    n.show();
}

/**
 * Affiche le message dans une fenêtre modale et redirige l'utilisateur vers l'url passée en paramètre
 * La fenêtre se ferme automatiquement
 * @param {string} message
 * @param {string} url
 */
export function retournerVers(message, url) {
    const n = new Noty({
        text: message,
        type: 'success',
        modal: true,
        layout: 'center',
        theme: 'sunset',

        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
        callbacks: {
            onClose: () => {
                location.href = url;
            }
        }
    });
    n.show().setTimeout(500);
}

/**
 * Affiche le message dans une fenêtre modale et redirige l'utilisateur vers l'url passée en paramètre
 * La fênêtre doit être fermée par l'utilisateur
 * @param {string} message
 * @param {string} url
 */
export function retournerVersApresConfirmation(message, url) {
    const n = new Noty({
        text: message,
        type: 'success',
        modal: true,
        layout: 'center',
        theme: 'sunset',
        buttons: [
            Noty.button('Ok', 'btn btn-sm btn-secondary float-end mt-0 mb-1', function () {
                n.close();
            })],
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
        callbacks: {
            onClose: () => {
                location.href = url;
            }
        }
    });
    n.show();
}


/**
 * Affiche le message d'erreur dans une boîte de dialogue puis replace dans le champ son ancienne valeur
 * S'il s'agit d'une case à cocher la propriété checked est inversée
 * Si la balise input comporte un attribut data old, sa valeur remplace la valeur actuelle sinon la valeur est effacée
 * @param {Node} input
 * @param {?string} message
 * @param {?string} oldValue
 */
export function corriger(input, message = input.validationMessage, oldValue = null) {
    const n = new Noty({
        text: message,
        type: 'error',
        modal: true,
        killer: true,
        layout: 'center',
        theme: 'sunset',
        buttons: [
            Noty.button('Ok', 'btn btn-sm btn-secondary float-end mt-0 mb-1', function () {
                n.close();
            })],
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
        callbacks: {
            onClose: () => {
                if (input.type === 'checkbox') {
                    input.checked = !input.checked;
                } else if (input.hasAttribute('data-old')) {
                    input.value = input.dataset.old;
                } else {
                    input.value = oldValue;
                }
            }
        }
    });
    n.show();
}

/**
 * Affiche le message d'erreur lié au champ dans une boîte de dialogue puis replace dans le champ son ancienne valeur
 * la balise input doit comporter un attribut data-old
 * @param {object} input
 */
export function corrigerInput(input) {
    const n = new Noty({
        text: input.validationMessage,
        type: 'error',
        modal: true,
        killer: true,
        layout: 'center',
        theme: 'sunset',
        buttons: [
            Noty.button('Ok', 'btn btn-sm btn-secondary float-end mt-0 mb-1', function () {
                n.close();
            })],
        animation: {
            open: 'animated lightSpeedI',
            close: 'animated lightSpeedOut'
        },
        callbacks: {
            onClose: () => {
                input.value = input.dataset.old;
            }
        }
    });
    n.show();
}

/**
 * Demande de confirmation avant de lancer un traitement
 * @param {function} callback pointeur sur la fonction à lancer
 */
export function confirmer(callback) {
    const n = new Noty({
        text: 'Confirmer votre demande ',
        layout: 'center',
        theme: 'sunset',
        modal: true,
        type: 'info',
        animation: {
            open: 'animated lightSpeedIn',
            close: 'animated lightSpeedOut'
        },
        buttons: [
            Noty.button('Oui', 'btn btn-sm btn-success marge ', function () {
                callback();
                n.close();
            }),
            Noty
                .button('Non', 'btn btn-sm btn-danger', function () {
                    n.close();
                })
        ]
    }).show();
}

// ------------------------------------------------------------
// fonctions de contrôle sur les données saisies
// ------------------------------------------------------------

/**
 * Création d'un style 'messageErreur' et Ajout après chaque balise input d'une balise div utilisant ce style
 * Cette balise div sera utilisée pour afficher le message d'erreur
 * @param {boolean} onInput false par défaut, si true le message d'erreur est affiché après chaque caractère saisi
 */
export function configurerFormulaire(onInput = false) {
    // ajout d'un style dans la section head du document
    const style = document.createElement('style');
    style.innerHTML = '.messageErreur { color: red; margin-bottom: 15px; font-size: 0.75rem; font-style: italic; padding: 0; margin: 0; }';
    document.head.appendChild(style);
    // ajout d'ue balise div après chaque balise input ou textarea
    for (const input of document.querySelectorAll('input, textarea, select')) {
        const div = document.createElement('div');
        div.classList.add('messageErreur');
        input.insertAdjacentElement('afterend', div);
        input.addEventListener('input', () => {
            input.nextElementSibling.innerText = '';
        });
        // Ajout d'un écouteur d'événement sur l'événement input pour signaler l'erreur après chaque caractère saisi
        if (onInput) {
            input.addEventListener('input', () => {
                input.nextElementSibling.innerText = input.validationMessage;
            });
        }
    }
}

/**
 * Affiche un message d'erreur de saisie à côté de l'élément d'entrée spécifié.
 *
 * @param {string} idInput - L'ID de l'élément d'entrée.
 * @param {string | null} message - Le message d'erreur personnalisé (facultatif).
 */
export function afficherErreurSaisie(idInput, message = null) {
    const input = document.getElementById(idInput);
    if (input) {
        let msg = input.validationMessage;
        if (message !== null) {
            msg = message;
        }
        // Parcourir les balises suivantes pour trouver la div devant afficher le message de validation
        let nextElement = input.nextElementSibling;
        let trouve = false;

        while (nextElement && !trouve) {
            // Vérifier si l'élément a l'attribut class avec la valeur 'messageErreur'
            if (nextElement.classList.contains('messageErreur')) {
                nextElement.innerText = msg;
                trouve = true;
            }
            nextElement = nextElement.nextElementSibling;
        }

        if (!trouve) {
            // Si aucun élément avec la classe 'messageErreur' n'a été trouvé, on affiche le message dans la console
            console.error(`L'élément d'entrée ${idInput} n'est pas suivi d'une balise div de classe 'messageErreur'`);
        }
    } else {
        console.error(`L'élément d'entrée ${idInput} n'existe pas.`);
    }
}


/**
 * Filtre les caractères autorisés lors de la saisie
 * @param {string} idInput attribut id de la balise input
 * @param {RegExp} regExp expression régulière contenant les caractères autorisés
 */
export function filtrerLaSaisie(idInput, regExp) {
    const input = document.getElementById(idInput);
    input.addEventListener('keydown', (e) => {
        // Autoriser le passage des touches spéciales
        if (e.key.length > 1) {
            return;
        }
        // Vérifier si la touche est un chiffre
        if (!regExp.test(e.key)) {
            e.preventDefault(); // Empêcher la saisie de caractères non contenus dans l'expression régulière
        }
    });
}

/**
 * Contrôle la valeur saisie
 * En cas d'erreur un message d'erreur sous la balise input correspondante est affiché
 * La classe 'erreur' est ajouté au niveau de la balise ce qui ajoute une image à la fin du champ
 * à condition d'avoir défini la style input.erreur dans la feuille de style
 * @param {string} idInput attribut id de la balise input
 * @return {boolean} true si la valeur saisie est valide
 */
export function controler(idInput) {
    const input = document.getElementById(idInput);
    afficherErreurSaisie(idInput);
    if (input.checkValidity()) {
        input.classList.remove('erreur');
        return true;
    } else {
        input.classList.add('erreur');
        return false;
    }
}

/**
 * Contrôle la valeur saisie
 * En cas d'erreur la couleur du texte et de la bordure change de couleur (rouge)
 * @param {string} idInput attribut id de la balise input
 * @returns {boolean} true si la valeur saisie est valide
 */
export function verifier(idInput) {
    const input = document.getElementById(idInput);
    if (input.checkValidity()) {
        input.classList.remove('erreur');
        return true;
    } else {
        input.classList.add('erreur');
        return false;
    }
}

/**
 * Vérifie si l'objet file possède une extension et un type mime autorisés
 * Le message d'erreur est renvoyé dans la propriété réponse du paramètre controle
 * @param {object} file objet file à contrôler
 * @param {object} controle
 * controle peut contenir les propriétés suivantes :
 * <br> lesExtensions : [Facultatif] tableau contenant les extensions autorisées
 * <br> taille : [Facultatif] Taille maximale en octet du fichier
 * <br> reponse : message d'erreur
 * @returns {boolean} true si le fichier est valide
 */
export function fichierValide(file, controle) {
    controle.reponse = '';
    // vérification qu'un fichier est bien transmis
    if (file === undefined) {
        controle.reponse = 'Aucun fichier transmis';
        return false;
    }
    // si la taille à ne pas dépasser est précisée, on contrôle la taille du fichier
    if (controle.taille && file.size > controle.taille) {
        const size = conversionOctet(file.size, 'Ko');
        const taille = conversionOctet(controle.taille, 'Ko');
        controle.reponse = `La taille du fichier (${size}) dépasse la taille autorisée (${taille})`;
        return false;

    }
    // si les extensions sont précisées, on contrôle l'extension du fichier
    if (controle.lesExtensions) {
        // récupération de l'extension : découpons au niveau du '.' et prenons le dernier élement
        const eltFichier = file.name.split('.');
        const extension = eltFichier[eltFichier.length - 1].toLowerCase();
        if (controle.lesExtensions.indexOf(extension) === -1) {
            controle.reponse = `Extension ${extension} non acceptée`;
            return false;
        }
    }
    return true;
}

/**
 * Contrôle tous les champs input et textarea et select
 * chaque champ xxx doit être suivi d'une balise <div class='messageErreur'></div> pour afficher le message d'erreur : méthode configurerFormulaire
 * @returns {boolean} true si tous les champs respectent les contraintes définies dans leurs attributs pattern, minlength, maxlength, required, min, max ...
 */
export function donneesValides(zone = document) {
    let valide = true;

    // Sélectionner tous les éléments input, select et textarea qui ne sont pas désactivés
    const lesInputs = zone.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea:not([disabled])');

    // Parcourir et traiter les éléments sélectionnés
    lesInputs.forEach(x => {
        afficherErreurSaisie(x.id);
        if (!x.checkValidity()) {
            valide = false;
        }
    });
    return valide;
}

/**
 * Controle la validité de la date saisie (format jj/mm/aaaa) dans la balise input dont l'id est trasnmis en paramètre
 * @param {string} idInput attribut id de la balise input
 * @returns {boolean} true si la date est valide
 */
export function dateValide(idInput) {

    const input = document.getElementById(idInput);

    // Vérifier le format jj/mm/aaaa avec une expression régulière
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(input.value)) {
        return false; // Le format n'est pas correct
    }

    // Récupération des éléments de la date
    const [jour, mois, annee] = input.value.split('/').map(Number);

    // création d'un objet Date avec les éléments de la date
    const date = new Date(annee, mois - 1, jour);

    // La date est valide si l'année, le mois et le jour sont identiques à ceux de l'objet Date
    if (date.getFullYear() === annee && date.getMonth() === mois - 1 && date.getDate() === jour) {
        return true;
    } else {
        afficherErreurSaisie(idInput, 'Cette date n\'est pas valide');
        return false;
    }
}

/**
 * Vide les champs de formulaire (input et textarea) dans une zone spécifiée.
 *
 * @param {Node} [zone=document] - La zone dans laquelle les champs doivent être vidés.
 * Par défaut, il s'agit du document entier.
 */
export function viderLesChamps(zone = document) {
    for (const input of zone.querySelectorAll('input, textarea')) {
        input.value = '';
    }
}

/**
 * Protége tous les champs de type input, textarea, select button dans une zone spécifiée.
 *
 * @param {Node} [zone=document] - La zone dans laquelle les champs doivent être protégés.
 * Par défaut, il s'agit du document entier.
 */
export function protegerLesChamps(zone = document) {
    for (const input of zone.querySelectorAll('input, textarea, select, button')) {
        input.disabled = true;
    }
}

/**
 * Déprotége tous les champs de type input, textarea, select, button
 * @param {Node} [zone=document] - La zone dans laquelle les champs doivent être protégés.
 * Par défaut, il s'agit du document entier.
 */
export function deprotegerLesChamps(zone = document) {
    for (const input of zone.querySelectorAll('input, textarea, select, button')) {
        input.disabled = false;
    }
}


/**
 * Efface les messages d'erreur sous chaque champ de saisie et dans la zone d'affichage des messages 'msg'
 */
export function effacerLesErreurs() {
    for (const div of document.getElementsByClassName('messageErreur')) {
        div.innerText = '';
    }
    const msg = document.getElementById('msg');
    if (msg !== null) {
        effacer('msg');
    }
}

/**
 * Encadre le champ avec une bordure rouge et change la couleur du texte en rouge
 * @param {Node} input - L'élément d'entrée à signaler en erreur.
 */
export function signalerErreur(input) {
    input.style.borderColor = 'red';
    input.style.color = 'red';
    input.focus();
}

/**
 * Remet la bordure et la couleur du texte par défaut
 * @param {Node} input - L'élément d'entrée à ne plus signaler en erreur.
 */
export function effacerErreur(input) {
    input.style.borderColor = '';
    input.style.color = '';
    input.focus();
}


// ------------------------------------------------------------
// fonctions diverses de conversion et mise en forme
// ------------------------------------------------------------

/**
 *  Arrondit la valeur passée en argument avec la précision demandée
 * @param {int} valeur
 * @param {int} precision
 * @returns {number}
 */
export function arrondir(valeur, precision = 0) {
    const tmp = 10 ** precision;
    return Math.round(valeur * tmp) / tmp;
}


/**
 * Conversion d'une chaine de format jj/mm/aaaa au format aaaa-mm-jj
 * @param {string} date au format jj/mm/aaaa
 * @return {string} Chaîne au aaaa-mm-jj
 */

export function encoderDate(date) {
    // la solution ci-dessous pose un problème si le format d'entrée est j/m/aaaa
    // return date.substring(6) + '-' + date.substring(3, 6) + '-' + date.substring(0, 2);
    // il faut plutôt découper la chaine et inverser les parties 1 et 3 en ajoutant éventuellement un 0 sur j et m
    // pour éviter l'usage d'une structure conditionnelle, on ajoute toujours un 0 au début
    // et on ne conserve que les deux derniers caractères en appelant la méthode slice(-2)
    const lesElements = date.split('/');
    return lesElements[2] + '-' + '0'.concat(lesElements[1]).slice(-2) + '0'.concat(lesElements[0]).slice(-2);

}

/**
 * Conversion d'une chaine de format aaaa-mm-jj  au format jj/mm/aaaa
 * @param {string} date au format aaaa-mm-jj
 * @return {string} Chaîne au jj/mm/aaaa
 */

export function decoderDate(date) {
    // return date.substring(8) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4);
    return date.split('-').reverse().join('/');
}

/**
 * Supprime les espaces superflus au début, à la fin et à l'intérieur de la valeur
 * @param {string} valeur
 * @returns {string} valeur sans espace superflu au début, à la fin et à l'intérieur
 */
export function supprimerEspace(valeur) {
    return valeur.trim().replace(/ {2,}/g, ' ');
}

/**
 * Remplace 2 espaces concécutifs ou plus par un seul
 * @param {string} valeur
 * @returns {string} valeur sans espace superflu à l'intérieur de la chaine
 */
export function supprimerDoubleEspace(valeur) {
    return valeur.replace(/ {2,}/g, ' ');
}


/**
 *   Enleve les accents
 *   en normalisant la chaine dans le jeu de caractère unicode, la lettre et son accent sont décomposés en deux codes
 *   tous les accents sont codés entre 0300 et 036f, il suffit donc de les remplacer par une chaîne vide
 *   https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 */
export const enleverAccent = (valeur) => valeur.normalize('NFD').replace(/[\u0300-\u036f]/g, '');


/**
 * Retourne la chaine passée en paramètre avec la première lettre de chaque mot en majuscule
 * @param {string} nom
 * @return {string} avec la première lettre de chaque mot en majuscule
 */
export function ucWord(nom) {
    const lesMots = nom.trim().toLowerCase().split(' ');
    for (let i = 0; i < lesMots.length; i++) {
        lesMots[i] = lesMots[i].charAt(0).toUpperCase() + lesMots[i].slice(1);
    }
    return lesMots.join(' ');
}

/**
 * Retourne la valeur passée en paramètre dans le format demandé
 * @param {number} valeur nombre à formater
 * @param {string} format par défaut €
 * @param {number} decimale à définir uniquement si le format est ''
 * @param {string} separateur à définir uniquement si le format est ''
 * @returns {string}
 */

export function formater(valeur, {format = '€', decimale = 2, separateur = '.'} = {}) {
    let resultat;
    if (format === '€') {
        resultat = valeur.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'});
    } else if (format === '%') {
        // recherche du nombre de décimales pour le pourcentage en fonction de la valeur initale
        const decimal = Math.max(nbDecimale(valeur) - 2, 0);
        resultat = valeur.toLocaleString('fr-FR', {
            style: 'percent',
            minimumFractionDigits: decimal,
            maximumFractionDigits: decimal
        });
    } else if (format.toLowerCase() === '') {
        resultat = valeur.toLocaleString('fr-FR', {minimumFractionDigits: decimale, maximumFractionDigits: decimale});
    }
    // recherche du séparateur courant
    // Obtenir la langue par défaut du navigateur
    const langue = navigator.language;

    // récupérer le séparateur décimal par défaut du navigateur
    const separateurDecimal = langue.includes('fr') ? ',' : '.';

    if (separateur !== separateurDecimal) {
        // la variable resultat est de type Number si le format est différent de % ou €
        resultat = resultat.toString().replace(separateurDecimal, separateur);
    }
    return resultat;
}

/**
 * retourne le nombre de décimales composant un nombre
 * @param {number} x nombre à analyser
 * @returns {number}
 */
function nbDecimale(x) {
    // Convertir le nombre en chaîne de caractères
    const nombreEnChaine = x.toString();

    // Rechercher l'indice du séparateur décimal (virgule ou point)
    const indiceSeparateur = nombreEnChaine.indexOf('.') === -1 ? nombreEnChaine.indexOf(',') : nombreEnChaine.indexOf('.');

    if (indiceSeparateur === -1) {
        // Le nombre est un nombre entier, il n'y a pas de décimales
        return 0;
    } else {
        // Le nombre possède des décimales, il faut retourner le nombre de chiffres après le séparateur
        return nombreEnChaine.length - indiceSeparateur - 1;
    }
}

/**
 * Retourne le numéro de téléphone passé en paramètre dans le format demandé
 *
 * @param {string} telephone un numéro de téléphone à mettre en forme
 * @param {string} separateur  le séparateur à utiliser entre les groupes de chiffres
 * @returns {string}
 */
export function miseEnFormeTelephone(telephone, separateur = '.') {
    // return telephone.substring(0, 2) + separateur + telephone.substring(2, 4) + separateur + telephone.substring(4, 6) + separateur + telephone.substring(6, 8) + separateur + telephone.substring(8);
    // Supprimer d'éventuels caractères non numériques du numéro
    const numero = telephone.replace(/\D/g, '');

    // Créer un tableau pour stocker les paires de chiffres
    const paires = [];

    // Diviser le numéro en paires de chiffres
    for (let i = 0; i < numero.length; i += 2) {
        paires.push(numero.slice(i, i + 2));
    }

    // Joindre les paires avec le séparateur souhaité (par exemple, '-')
    return paires.join(separateur);
}

/**
 *  Convertit un nombre exprimé en octet dans une autre unité (Ko, Mo ou Go)
 *  @param {number} nb nombre représentant un nombre d'octets
 *  @param {string} unite unité souhaitée : Ko Mo ou Go
 *  @return {string}  nombre exprimé dans l'unité avec une mise en forme par groupe de 3 chiffres
 */
export function conversionOctet(nb, unite = 'o') {
    let diviseur = 1;
    if (unite === 'Ko') {
        diviseur = 1024;
    } else if (unite === 'Mo') {
        diviseur = 1024 * 1024;
    } else if (unite === 'Go') {
        diviseur = 1024 * 1024 * 1024;
    }
    let str = Math.round(nb / diviseur).toString();
    let result = str.slice(-3);
    str = str.substring(0, str.length - 3);  // sans les trois derniers
    while (str.length > 3) {
        const elt = str.slice(-3);
        result = elt.concat(' ', result);
        str = str.substring(0, str.length - 3);
    }
    result = str.concat(result, ' ', unite);
    return result;
}

/**
 * Gestion de l'ouverture fermeture d'un conteneur
 * @param {Node} corps le conteneur à ouvrir/fermer
 * @param {Node} baliseI la balise i dont la classe doit être modifiée
 */
export function onOff(corps, baliseI) {
    if (corps.style.display === 'none') {
        corps.style.display = 'block';
        baliseI.classList.remove('bi-arrow-bar-down');
        baliseI.classList.add('bi-arrow-bar-up');
    } else {
        corps.style.display = 'none';
        baliseI.classList.remove('bi-arrow-bar-up');
        baliseI.classList.add('bi-arrow-bar-down');

    }
}

/**
 * Compare 2 chaînes sans tenir compte des accents et de la casse
 * @param {string} str1 chaîne à comparer
 * @param {string} str2 chaîne à comparer
 * @returns {boolean} true si les 2 chaînes sont identiques
 */
export function comparer(str1, str2) {
    const sansAccentsStr1 = str1.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sansAccentsStr2 = str2.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return sansAccentsStr1.toLowerCase() === sansAccentsStr2.toLowerCase();
}

// ------------------------------------------------------------
// fonctions sur les champs de saisie
// ------------------------------------------------------------

/**
 * Retourne la valeur d'un champ de saisie
 * @param {string} inputId attribut id de la balise input
 * @returns {string | boolean | number | null} valeur saisie
 */
export function read(inputId) {
    let valeur = '';
    const input = document.getElementById(inputId);

    if (input) {
        if (input instanceof HTMLInputElement) {
            const type = input.type.toLowerCase();
            if (type === 'checkbox' || type === 'radio') {
                valeur = input.checked ? 1 : 0;
            } else if (type === 'number') {
                const value = input.value;
                if (Number.isInteger(value)) {
                    valeur = parseInt(value);
                } else {
                    valeur = parseFloat(value);
                }
            } else if (type === 'text') {
                const value = input.value;
                if (Number.isInteger(value)) {
                    valeur = parseInt(value);
                } else {
                    valeur = parseFloat(value);
                }
                if (Number.isNaN(valeur)) {
                    valeur = value;
                }
                // pour tous les autres types, on retourne la valeur
            } else {
                valeur = input.value;
            }
        } else if (input instanceof HTMLTextAreaElement) {
            valeur = input.value;
        } else if (input instanceof HTMLSelectElement) {
            const value = input.value;
            if (Number.isInteger(value)) {
                valeur = parseInt(value);
            } else {
                valeur = parseFloat(value);
            }
            if (Number.isNaN(valeur)) {
                valeur = value;
            }
        }
    } else {
        console.error(`L'élément ${inputId} n'existe pas`);
    }
    return valeur;
}


/**
 * Ecrit la valeur dans la balise identifiée par id
 * @param {string} inputId attribut id de la balise input
 * @param {string| boolean| number} valeur valeur à écrire dans la balise
 * @param {string | null} format - Le format de la valeur (facultatif) '€' ou '%'.
 */
export function write(inputId, valeur, format = null) {
    const input = document.getElementById(inputId);
    if (input) {
        // s'agit-il d'une balise input ?
        if (input instanceof HTMLInputElement) {
            const type = input.type.toLowerCase();
            if (type === 'checkbox' || type === 'radio') {
                input.checked = valeur;
            } else {
                if (format) {
                    if (format === '€') {
                        input.value = valeur.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                        }).replace(',', '.');
                    } else if (format === '%') {
                        input.value = valeur.toLocaleString('fr-FR', {style: 'percent'});
                    } else {
                        input.value = valeur;
                    }
                } else {
                    input.value = valeur;
                }
            }
        } else if (input instanceof HTMLTextAreaElement) {
            input.value = valeur;
        } else if (input instanceof HTMLSelectElement) {
            input.value = valeur;
        } else if (input.tagName === 'DIV') {
            const p = document.createElement('p');
            p.innerText = valeur;
            input.appendChild(p);
        } else if (input.tagName === 'SPAN') {
            input.innerText = valeur;
        } else if (input.tagName === 'IMG') {
            input.src = valeur;
        } else {
            input.innerText = valeur;
        }
    } else {
        console.error(`L'élément ${inputId} n'existe pas`);
    }
}

/**
 * Efface le contenu de la balise dont l'id est passé en paramètre
 * @param {string} inputId attribut id de la balise input
 */
export function effacer(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        // s'agit-il d'une balise input ?
        if (input instanceof HTMLInputElement) {
            const type = input.type.toLowerCase();
            if (type === 'checkbox') {
                input.checked = false;
            } else if (type === 'number' || type === 'text') {
                input.value = '';
            }
        } else if (input instanceof HTMLSelectElement) {
            while (input.options.length > 0) {
                input.remove(0);
            }

        } else if (input.tagName === 'IMG') {
            input.src = '';
        } else {
            input.innerHTML = '';
        }
    } else {
        console.error(`L'élément ${inputId} n'existe pas`);
    }
}


/**
 * Mélange un tableau d'éléments
 * Principe : on prend le dernier élément et on le permute avec un autre élément choisi aléatoirement
 * @param {Array} lesElements
 */
export function melanger(lesElements) {
    for (let i = lesElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lesElements[i], lesElements[j]] = [lesElements[j], lesElements[i]];
    }
}

/**
 * Met en attente l'exécution du programme pendant le nombre de millisecondes passé en paramètre
 * @param {int} ms nombre de millisecondes
 * @returns {Promise<unknown>}
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Insère un composant (fichier CSS ou JavaScript) dans l'en-tête du document.
 * Le fichier appelalnt réalise 2 appels à cette fonction, un pour les css et un pour les js
 * Il peut y avoir plusieur url pour chaque type
 * @param {string} type - Le type de composant ('css' pour CSS ou 'js' pour JavaScript).
 * @param {string[]} urls - Un tableau d'URLs des fichiers à insérer.
 * @param {boolean} isDefered - Indique si les scripts JavaScript doivent être chargés de manière différée (optionnel).
 */

export function insererComposant(type, urls, isDefered = false) {
    for (const url of urls) {
        if (type === 'css') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            document.head.appendChild(link);
        } else if (type === 'js') {
            const script = document.createElement('script');
            script.src = url;
            if (isDefered) {
                script.defer = true;
            }
            document.head.appendChild(script);
        }
    }
}


/**
 * Charge un fichier css
 * @param {string} nom de la feuille de style sans son extension
 */
export function loadCSS(nom) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `/css/${nom}.css`;
    document.head.appendChild(link);
}

/**
 * Charge la bibliothèque jQuery de manière asynchrone si elle n'est pas déjà chargée.
 * Déclenche un événement 'jquery-loaded' lorsque jQuery est chargé avec succès.
 */
export async function loadJquery() {
    if (typeof jQuery === 'undefined') {
        try {
            await inserer('https://code.jquery.com/jquery-3.6.3.min.js');
            document.dispatchEvent(new Event('jquery-loaded'));
        } catch (error) {
            console.error('Erreur lors du chargement de jQuery:', error);
        }
    }
}

/**
 * Insère un script dans l'en-tête du document de manière asynchrone.
 *
 * @param {string} source - L'URL du script à insérer.
 * @returns {Promise<void>} Une promesse qui résout lorsque le script est chargé avec succès
 * ou est rejetée en cas d'erreur de chargement.
 */
function inserer(source) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = source;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}