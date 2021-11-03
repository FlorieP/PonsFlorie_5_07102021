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

    //addStorage();
  })
}

//Création de la fonction de mise en stckage local
function addStorage() {
  //Déclaration variable de stockage des valeurs du storage
  let productsStorage = JSON.parse(localStorage.getItem("keyProduct")); //conversion des données du local de JSON en JS
  console.log(productsStorage);
  //Fonction d'ajout de produit dans le storage
  const addProductStorage = () => {
    //Ajout du produit avec option choisi dans le tableau du storage
    productsStorage.push(valuesProduct);
    //Transformation en JSON et envoie dans la clé du storage
    localStorage.setItem("keyProduct", JSON.stringify(productsStorage));
  };
  //Création d'une condition pour vérifier s'il y a ou non des données dans le storage
  if (productsStorage) {
    addProductStorage();
    console.log(productsStorage);
  } else {
    productsStorage = [];
    addProductStorage();
    console.log(productsStorage);
  }
}
