<?php
$votre_adresse_mail = 'enzoneri164@gmail.com';
if(isset($_POST['envoyer'])){

if(empty($_POST['mail'])) {
echo "<p>Le champ mail est vide.</p>";

//on vérifie que l'adresse est correcte
}elseif(!preg_match("#^[a-z0-9_-]+((\.[a-z0-9_-]+){1,})?@[a-z0-9_-]+((\.[a-z0-9_-]+){1,})?\.[a-z]{2,}$#i", $_POST['mail'])){

echo "<p>L'adresse mail entrée est incorrecte.</p>";

}elseif(empty($_POST['sujet'])){

echo "<p>Le champ sujet est vide.</p>";

}elseif(empty($_POST['message'])){

echo "<p>Le champ message est vide.</p>";

}else{


$mail_de_lutilisateur = $_POST['mail'];

$entetes_du_mail = [];
$entetes_du_mail[] = 'MIME-Version: 1.0';
$entetes_du_mail[] = 'Content-type: text/html; charset=UTF-8';
$entetes_du_mail[] = 'From: Nom de votre site <' . $mail_de_lutilisateur . '>';
$entetes_du_mail[] = 'Reply-To: Nom de votre site <' . $mail_de_lutilisateur . '>';

//ajoute des sauts de ligne entre chaque headers
$entetes_du_mail = implode("\r\n", $entetes_du_mail);

//base64_encode() est fait pour permettre aux informations binaires d'être manipulées par les systèmes qui ne gèrent pas correctement les 8 bits (=?UTF-8?B? est une norme afin de transmettre correctement les caractères de la chaine)
$sujet = '=?UTF-8?B?' . base64_encode($_POST['sujet']) . '?=';

//htmlentities() converti tous les accents en entités HTML, ENT_QUOTES Convertit en + les guillemets doubles et les guillemets simples, en entités HTML
$message = htmlentities($_POST['message'], ENT_QUOTES, 'UTF-8');

//ajoute des sauts de ligne HTML si l'utilisateur en a utilisé
$message = nl2br($message);

//en fin, on envoi le mail


if(mail($votre_adresse_mail, $sujet, $message, $entetes_du_mail)){

echo "<p>Le mail à été envoyé avec succès !</p>";

}else{

echo "<p>Une erreur est survenue, le mail n'a pas été envoyé.</p>";

}
}
}
<php