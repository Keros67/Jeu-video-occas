// Mon petit panier JS
// https://www.1formatik.com

// 0 pour désactiver les commandes par lot
// 1 pour activer la fonctionnalité de commande par lot
var Qte_Minimum = 0;

// Nombre de produits minimum par lot
var Qte_Minimum_Valeur = 6;

// 0 pour désactiver l'ajout du prix de la livraison
// 1 pour activer la fonctionnalité de modification du prix total pour inclure le prix de la livraison selon un pourcentage du prix total
// 2 pour activer la fonctionnalité de modification du prix total pour inclure le prix de la livraison selon un forfait fixe
var Livraison = 0;

// % du prix total total correspondant au prix de la livraison
var Poucentage_Livraison = 25;

// Forfait de la livraison en euro
var Forfait_Livraison = 19;

// les messages concernant la fonctionnalité de commande par lot
var txt_qte_minimum_bad =
  "<font color='red'>Attention les quantités ne sont pas correctes, les commandes se font par lot de " +
  Qte_Minimum_Valeur +
  " produits</font>";
var txt_qte_minimum_ok =
  "<font color='green'>Le nombre de produits est correcte</font>";
var txt_qte_minimum_defaut =
  "Les commandes se font par lot de " + Qte_Minimum_Valeur + " produits";

// ne pas modifier la suite sauf si vous désirez modifier le code
var MonPanier = (function () {
  panier = [];
  function Item(nom, prix, quantite) {
    this.nom = nom;
    this.prix = prix;
    this.quantite = quantite;
  }

  function savepanier() {
    sessionStorage.setItem("MonPanier", JSON.stringify(panier));
  }

  function loadpanier() {
    panier = JSON.parse(sessionStorage.getItem("MonPanier"));
  }
  if (sessionStorage.getItem("MonPanier") != null) {
    loadpanier();
  }

  var obj = {};

  obj.ajouter_produit_dans_panier = function (nom, prix, quantite) {
    for (var item in panier) {
      if (panier[item].nom === nom) {
        panier[item].quantite++;
        savepanier();
        return;
      }
    }
    var item = new Item(nom, prix, quantite);
    panier.push(item);
    savepanier();
  };

  obj.setquantiteForItem = function (nom, quantite) {
    for (var i in panier) {
      if (panier[i].nom === nom) {
        panier[i].quantite = quantite;
        break;
      }
    }
  };

  obj.enlever_produit_de_panier = function (nom) {
    for (var item in panier) {
      if (panier[item].nom === nom) {
        panier[item].quantite--;
        if (panier[item].quantite === 0) {
          panier.splice(item, 1);
        }
        break;
      }
    }
    savepanier();
  };

  obj.enlever_produit_de_panier_tous = function (nom) {
    for (var item in panier) {
      if (panier[item].nom === nom) {
        panier.splice(item, 1);
        break;
      }
    }
    savepanier();
  };

  obj.clearpanier = function () {
    panier = [];
    savepanier();
  };

  obj.totalquantite = function () {
    var totalquantite = 0;
    for (var item in panier) {
      totalquantite += panier[item].quantite;
    }
    return totalquantite;
  };

  obj.totalpanier = function () {
    var totalpanier = 0;
    for (var item in panier) {
      totalpanier += panier[item].prix * panier[item].quantite;
    }
    return Number(totalpanier.toFixed(2));
  };

  obj.listpanier = function () {
    var panierCopy = [];
    for (i in panier) {
      item = panier[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.prix * item.quantite).toFixed(2);
      panierCopy.push(itemCopy);
    }
    return panierCopy;
  };

  return obj;
})();

$(".ajouter-panier").click(function (event) {
  event.preventDefault();
  var nom_option = "";
  var prix_option = 0;
  var option_checkbox = $(this).data("checkbox");
  var option_clicked = $(this).data("clicked");
  var option_value = $(this).data("value");

  if (option_checkbox != "") {
    var checkboxes = document.getElementsByClassName(option_checkbox);
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {
        var nom_option =
          nom_option +
          " (" +
          $(checkboxes[i]).data("nom") +
          ")" +
          nom_option +
          option_value;
        var prix_option = prix_option + Number($(checkboxes[i]).data("prix"));
      }
    }

    if (option_clicked != "") {
      var clicked = document.getElementsByClassName(option_clicked);
      for (var i = 0; i < clicked.length; i++) {
        if (clicked[i].click == true) {
          var nom_option = nom_option + " (" + $(clicked[i]).data("nom") + ")";
          var prix_option = prix_option + Number($(clicked[i]).data("prix"));
        }
      }
    }
  }
  if ($(this).data("select")) {
    var nom =
      $(this).data("nom") +
      " (" +
      document.getElementsByClassName("" + $(this).data("select") + "").value +
      ")" +
      nom_option;
  } else var nom = $(this).data("nom") + nom_option;
  var prix = Number($(this).data("prix")) + prix_option;

  if ($(this).data("clicked")) {
    var nom =
      $(this).data("nom") +
      " (" +
      document.getElementsByClassName("" + $(this).data("clicked") + "").value +
      ")";
  } else var nom = $(this).data("nom");
  var prix = Number($(this).data("prix")) + prix_option;

  MonPanier.ajouter_produit_dans_panier(nom, prix, 1);

  afficherpanier();
});

function afficherpanier() {
  var panierArray = MonPanier.listpanier();
  var output = "";
  for (var i in panierArray) {
    output +=
      "<tr>" +
      "<td>" +
      panierArray[i].nom +
      "</td>" +
      "<td>(" +
      panierArray[i].prix.toFixed(2) +
      ")</td>" +
      "<td class='form-inline'><div class='input-group'><button class='btn btn-primary moins-item' data-nom='" +
      panierArray[i].nom +
      "'>-</button>" +
      "<input type='number' min='1' class='form-control item-quantite' data-nom='" +
      panierArray[i].nom +
      "' value='" +
      panierArray[i].quantite +
      "'>" +
      "<button class='btn btn-primary plus-item' data-nom='" +
      panierArray[i].nom +
      "'>+</button></div></td>" +
      "<td><button class='btn btn-danger effacer-item' data-nom='" +
      panierArray[i].nom +
      "'>X</button></td>" +
      " = " +
      "<td>" +
      panierArray[i].total +
      "</td>" +
      "</tr>";
  }
  $(".show-panier").html(output);
  if (Livraison == 1) {
    $(".total-panier").html(
      (
        MonPanier.totalpanier() +
        MonPanier.totalpanier() / (100 / Poucentage_Livraison)
      ).toFixed(2)
    );
    document.getElementById("livraison-detail").innerHTML =
      "Livraison incluse: " + Poucentage_Livraison + "% du prix total.";
  }
  if (Livraison == 2) {
    $(".total-panier").html(
      (MonPanier.totalpanier() + Forfait_Livraison).toFixed(2)
    );
    document.getElementById("livraison-detail").innerHTML =
      "Livraison incluse: " + Forfait_Livraison + " euros.";
  }
  if (Livraison == 0) {
    $(".total-panier").html(MonPanier.totalpanier().toFixed(2));
  }
  $(".total-panier-modal").html(MonPanier.totalpanier());
  $(".total-quantite").html(MonPanier.totalquantite());
  if (
    Qte_Minimum == 1 &&
    Number.isInteger(MonPanier.totalquantite() / Qte_Minimum_Valeur) == false &&
    MonPanier.totalquantite() != 0
  ) {
    document.getElementById("qte_minimum_report").innerHTML =
      txt_qte_minimum_bad;
  } else if (
    Qte_Minimum == 1 &&
    Number.isInteger(MonPanier.totalquantite() / Qte_Minimum_Valeur) == true &&
    MonPanier.totalquantite() != 0
  ) {
    document.getElementById("qte_minimum_report").innerHTML =
      txt_qte_minimum_ok;
  } else if (Qte_Minimum == 1) {
    document.getElementById("qte_minimum_report").innerHTML =
      txt_qte_minimum_defaut;
  } else if (Qte_Minimum == 0) {
    document.getElementById("qte_minimum_report").innerHTML = "";
  }
}

$(".show-panier").on("click", ".effacer-item", function (event) {
  var nom = $(this).data("nom");
  MonPanier.enlever_produit_de_panier_tous(nom);
  afficherpanier();
});

$(".show-panier").on("click", ".moins-item", function (event) {
  var nom = $(this).data("nom");
  MonPanier.enlever_produit_de_panier(nom);
  afficherpanier();
});

$(".show-panier").on("click", ".plus-item", function (event) {
  var nom = $(this).data("nom");
  MonPanier.ajouter_produit_dans_panier(nom);
  afficherpanier();
});

$(".show-panier").on("change", ".item-quantite", function (event) {
  var nom = $(this).data("nom");
  var quantite = Number($(this).val());
  MonPanier.setquantiteForItem(nom, quantite);
  afficherpanier();
});

$(".clear-panier").click(function (event) {
  MonPanier.clearpanier();
  afficherpanier();
});

afficherpanier();
