window.addEventListener('load', main);

import {filtrerLaSaisie, read, write, formater} from './fonction.js';


// Déclaration des variables permettant l'accès aux chmps de saisie de l'interface
let mtARegler;
let mtRegle;

// conserver le reste à rendre pendant la répartition manuelle à 0 la répartition n'est pas possible
let reste = 0;

// Utilisation d'un objet json de la forme clé : valeur qui correspond à la notion de dictionnaire
// la clé correspond à l'id de l'image à afficher sur l'interface et la valeur correspond à la valeur du billet ou de la pièce
// L'accès à la valeur s'effectue par la clé : lesElements['e50'] renvoie 5000
// On peut aussi utiliser lesElements.e50 qui renvoie aussi 5000 mais cette notation n'est pas possible si la clé contient des caractères spéciaux
const lesElements = {
    e50: 5000,
    e20: 2000,
    e10: 1000,
    e5: 500,
    e2: 200,
    e1: 100,
    c50: 50,
    c20: 20,
    c10: 10,
    c5: 5,
    c2: 2,
    c1: 1
};

function main() {
    // initialisation des variables permettant l'accès aux chmps de saisie de l'interface
    mtARegler = document.getElementById('mtARegler');
    mtRegle = document.getElementById('mtRegle');

    // Controles des données saisies
    filtrerLaSaisie('mtARegler', /[0-9.]/);
    filtrerLaSaisie('mtRegle', /[0-9.]/);

    // Si le champ mtARegler, reçoit le focus on replace l'interface dans son état initial qui ne permet que la saisie de ce montant
    mtARegler.onfocus = function () {
        this.value = '';
        mtRegle.value = '';
        mtRegle.disabled = true;
        initialiserRepartition();
    };

    // Si l'utilisateur appuie sur la touche entrée ou la touche tab en déclenche la fonction activerMtRegle
    mtARegler.addEventListener('keydown', e => {
        // pour la touche tab, il faut empêcher le comportement par défaut
        if (e.key === 'Tab') {
            event.preventDefault();
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
            activerMtRegle();
        }
    });

    // Après chaque caractère saisi, il faut examiner la valeur saisie pour activer le champ mtRegle
    // et lui donner eventuellement le focus
    mtARegler.oninput = function () {
        // Si on trouve un '.' et que la différence entre la longueur total et la position du point vaut 3 alors on a bien deux chiffres après le séparateur
        const value = this.value;
        // si on trouve un .
        if (value.indexOf('.') !== -1) {
            // combien de chiffres après le point ?
            const nbDecimale = value.length - value.indexOf('.') - 1;
            if (nbDecimale === 2) {
                activerMtRegle();
            } else if (nbDecimale > 2) {
                // supprimer le dernier caractère
                this.value = value.slice(0, -1);
            }
        }
    };

    // problème si l'utilisateur colle une valeur dans les champs
    // le plus simple est de l'interdire
    mtARegler.onpaste = function (e) {
        e.preventDefault();
    };

    // Si le champ mtRegle reçoit le focus, on efface la valeur actuelle et on efface la répartition afin de permettre une nouvelle répartition
    mtRegle.onfocus = function () {
        this.value = '';
        initialiserRepartition();
    };

    // Si l'utilisateur appuie sur la touche entrée ou la touche tab
    mtRegle.addEventListener('keydown', e => {
        // pour la touche tab, il faut empêcher le comportement par défaut
        if (e.key === 'Tab') {
            event.preventDefault();
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
            lancerRepartition();
        }
    });

    // après chaque caractère saisi, au niveau du champ mtRegle
    mtRegle.oninput = function () {
        // récupérarer la valeur saisie
        const value = this.value;
        // si on trouve un .
        if (value.indexOf('.') !== -1) {
            // combien de chiffres après le point ?
            const nbDecimale = value.length - value.indexOf('.') - 1;
            if (nbDecimale === 2) {
                lancerRepartition();
            }
        }
    };

    // si l'utilisateur colle une valeur dans le champ mtRegle
    mtRegle.onpaste = function (e) {
        e.preventDefault();
    };

    // on ajoute un écouteur d'événement sur chaque image
    document.querySelectorAll('#grid-container img').forEach(image => image.addEventListener('click', () => {
        // si le reste à rendre est supéreieur ou égale à la valeur du billet ou de la pièce cliqué, on décrémente le reste à rendre
        // et on incrémente le nombre de billet ou de pièce correspondant sur l'interface (balise span qui suit l'image)
        if (reste >= lesElements[image.id]) {
            reste -= lesElements[image.id];
            const span = image.nextElementSibling;
            span.textContent = (parseInt(span.textContent) || 0) + 1;
            write('mtARendre', (reste / 100).toFixed(2));
        }
    })
    );
}

/**
 * Chaque balise span situé après une image contient le nombre de billet ou de pièce à rendre
 * il faut effacer ce nombre
 */
function initialiserRepartition() {
    for (const id in lesElements) {
        document.getElementById(id).nextElementSibling.textContent = '';
    }
    reste = 0;
    write('mtARendre', '');
}

/**
 *  On active le champ mtRegle si la valeur du montant à régler est numérique et positive
 */
function activerMtRegle() {
    const valeur = parseFloat(mtARegler.value);
    if (!isNaN(valeur) && valeur > 0) {
        mtARegler.value = formater(parseFloat(mtARegler.value));
        mtRegle.disabled = false;
        mtRegle.focus();
    }
}

/**
 *   Contrôle que les valeurs sont valides (mtAregler <= mtRegle)
 *   Si ce n'est pas le cas, efface l'éventuelle répartition précédente en appelant la méthode intialiserRepartition()
 */
function lancerRepartition() {
    reste = Math.round(parseFloat(mtRegle.value) * 100) - Math.round(parseFloat(mtARegler.value) * 100);
    if (isNaN(reste) || reste < 0) {
        initialiserRepartition();
    } else {
        write('mtARendre', formater(reste / 100));
    }
}
