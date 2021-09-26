<?php 
error_reporting(E_ALL);
// Passez la valeur ci-dessous de 0 à 1 pour afficher les erreurs
ini_set("display_errors", 0);

// Saisissez ici l'adresse mail du destinataire
$destinataire = "craig03@hotmail.fr";

if (   (isset($_GET["nom"]) && ($_GET["nom"] != "")) 
&& (isset($_GET["prenom"]) && ($_GET["prenom"] != ""))
&& (isset($_GET["adresse"]) && ($_GET["adresse"] != ""))
&& (isset($_GET["cp"]) && ($_GET["cp"] != ""))
&& (isset($_GET["ville"]) && ($_GET["ville"] != ""))
&& (isset($_GET["email"]) && ($_GET["email"] != ""))
&& (isset($_GET["commande"]) && ($_GET["commande"] != ""))
)
{
$nom = htmlspecialchars($_GET["nom"], ENT_QUOTES);
$prenom = htmlspecialchars($_GET["prenom"], ENT_QUOTES);
$adresse = htmlspecialchars($_GET["adresse"], ENT_QUOTES);
$cp = htmlspecialchars($_GET["cp"], ENT_QUOTES);
$ville = htmlspecialchars($_GET["ville"], ENT_QUOTES);
$email = htmlspecialchars($_GET["email"], ENT_QUOTES);
$message = nl2br(htmlspecialchars($_GET["message"], ENT_QUOTES));
$commande = $_GET["commande"];
$prix_total = htmlspecialchars($_GET["prix_total"], ENT_QUOTES);
$sujet = 'Commande reçue';
$messagez = "Nom: ".$nom."<br>
Prénom: ".$prenom."<br>
Adresse: ".$adresse."<br>
Code postal: ".$cp."<br>
Ville: ".$ville."<br>
Adresse e-Mail: ".$email."<br>
Message: ".$message."<br>
Liste des produits: <br><br><table>".$commande."</table><br>
Prix Total: ".$prix_total."";
$headers = "From: \"Commande\"<".$destinataire.">\n";
$headers .= "Reply-To: ".$destinataire."\n";
$headers .= "Content-Type: text/html; charset=\"utf-8\"";
if(mail($destinataire,$sujet,$messagez,$headers))
{
echo "1";
echo $message;
}
else
{
echo "0";
}
}
else echo "0";
