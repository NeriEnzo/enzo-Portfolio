<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Adresse email où envoyer le message
    $destinataire = "enzoneri164@gmail.com";
    
    // Sujet du message
    $sujet = "Nouveau message de $nom";
    
    // Construction du corps du message
    $contenu = "Nom: $nom\n";
    $contenu .= "Email: $email\n\n";
    $contenu .= "Message:\n$message";
    
    // Envoi du message
    mail($destinataire, $sujet, $contenu);
    
    // Redirection après envoi
    header('Location: confirmation.html');
    exit;
}
?>
