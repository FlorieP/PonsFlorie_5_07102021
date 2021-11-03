////////// PROMESSE //////////
//Déclaration d'une promesse pour l'ID
const PromesseProduit = new Promise((resolve, reject) => {
  resolve("Affichage du produit & ajout au panier réussi")
});
console.log(PromesseProduit);

//Appel des fonctions dans la promesse
PromesseProduit
  .then((resolve) => {
    idRecovery();

  })
  //catch de la promesse
  .catch((erreur) => {
    console.log(erreur);
  });

////////// CONSTANTES ET VARIABLES //////////  
let api = 'http://localhost:3000/api/products';

/////////// FONCTIONS //////////
//Création fonction de récupération de l'ID du produit
function idRecovery() {
  //Récupération de l'ID dans l'URL
  const Urlrécup = new URLSearchParams(window.location.search);
  const product_id = Urlrécup.get("id");
  console.log(product_id);

  loadData(api + "/" + product_id);
}

//Création fonction appel API
function loadData(url) {
  //Récupération des données de l'API
  fetch(url)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => {
      console.log(products);

      try {
        //Appel de la fonction d’affichage des produits 
        productDisplay(products);
        recoveryChoice(products);

        //Catch du Try
      } catch (err) {
        alert("Il y a eu un problème avec l'opération try: " + err.message)
      }
    })

    //Catch du Fetch
    .catch((error) => {
      alert("Il y a eu un problème avec l'opération fetch: " + error.message)
    });
}

//Création fonction d'affichage dynamique du produit
function productDisplay(product) {

  //Affichage des éléments du produit sur la page
    //Affichage image
    document.querySelector('.item__img img').src = product.imageUrl;
    document.querySelector('.item__img img').alt = product.altTxt;
    //Affichage title
    const affichage_Name = document.querySelector("#title");
    affichage_Name.innerHTML = product.name;
    //Affichage Price
    const affichage_Price = document.querySelector("#price");
    affichage_Price.innerHTML = product.price;
    //Affichage Description
    const affichage_Description = document.querySelector("#description");
    affichage_Description.innerHTML = product.description;
    //Retour des options couleurs
      //Déclaration des variables
      let colors = [];
      let optionStructure = [];
      let nameOption = [];
      //Importation des couleurs
      colors = product.colors;
      console.log(product.colors);
      //sélection élément du DOM
      var elt = document.querySelector("#colors");
      //Création de la boucle
      for (var i = 0; i < colors.length; i++) {
        //Stockage des données dans les variables
        nameOption[i] = colors[i]

        //Affichage des objets dans la page
        optionStructure += `
                        <option value="${nameOption[i]}">${nameOption[i]}</option>
                        `;
        //Injection dans le HTML
        elt.innerHTML = optionStructure;
      }
}

// Création de la fonction de mise en panier
function recoveryChoice(product) {
  //Récupération des données utilisateurs concernant le produit
  const color = document.querySelector("#colors");
  console.log(color);
  const quantity = document.querySelector("#quantity");
  console.log(quantity);
  //Selection du bouton de commande
  const btnPanier = document.querySelector("#addToCart");
  console.log(btnPanier);
  //Ecouter le bouton de commande
  btnPanier.addEventListener("click", (event) => {
    event.preventDefault();

    //Sélection du choix couleur et quantité de l'utilisateur
    console.log(color.value);
    console.log(quantity.value);

    //Récupération des valeurs du produits
    valuesProduct = {
      imgProduct: product.imageUrl,
      atlProduct: product.altTxt,
      nameProduct: product.name,
      colorProduct: color.value,
      quantityProduct: quantity.value,
      priceProduct: product.price,
    }
    console.log(valuesProduct);

    addToCart (valuesProduct);
  })
}

//Création de la fonction d'ffichage du contenu du Storage
function viewStorage () {
  let cart = localStorage.getItem("product");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

//Création de la donction de sauvegarde du panier dans le storage
function addStorage (cart) {
  localStorage.setItem("product", JSON.stringify(cart));
}

//Création de la fonction de vérification des doublons de produits
function checkSameProduct (cart, nameProduct, colorProduct) {
  let same = null;
  for (let jsonCartProduct of cart) {
    if (jsonCartProduct.name == nameProduct && jsonCartProduct.color == colorProduct) {
      same = cart.indexOf(jsonCartProduct);
      console.log(same);
      break;
    }
  }
  return same;
}

//Création de la fonction de la mise en panier
function addToCart (valuesProduct) {
  let cart = viewStorage();
  let sameProduct = checkSameProduct(cart, valuesProduct.name, valuesProduct.color);
  if (sameProduct == null) {
    cart.push(valuesProduct);
  } else {
    cart[sameProduct].quantityProduct = parseInt(cart[sameProduct].quantityProduct) + parseInt(sameProduct.quantityProduct);
  }
  addStorage(cart);
}