/*//Déclaration d'une promesse pour l'ID
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
  .catch ((erreur) => {
  console.log(erreur);
  });

//Création fonction de récupération de l'ID du produit
function idRecovery() {
  //Récupération de l'ID dans l'URL
  const Url_id = window.location.search;
  console.log(Url_id);

  //Récupération de l'ID sans le ?
  const Urlrécup = new URLSearchParams(Url_id);
  const product_id = Urlrécup.get("id");
  console.log(product_id);

  loadData(api);
}

let api = 'http://localhost:3000/api/products';

//Création fonction appel API
function loadData(url) {
  //Récupération des données de l'API
  fetch(url)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => {
      console.table(products);

      try {
        //Appel de la fonction d’affichage des produits 
        productDisplay(products);
        //addCart(cart);

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
  //Retrouver dans l'API le produit correspondant à l'ID
  const idProduit = product.find((element) => element._id === product_id);
  console.log(idProduit);

  //Retour Image & Alt 
  const imgUrl = idProduit.imageUrl;
  console.log(imgUrl);
  const imgAlt = idProduit.altTxt;
  console.log(imgAlt);
  document.querySelector('.item__img img').src = imgUrl;
  document.querySelector('.item__img img').alt = imgAlt;

  //Retour Name
  const productName = idProduit.name;
  console.log(productName);
  const affichage_Name = document.querySelector("#title");
  affichage_Name.innerHTML = productName;

  //Retour Price
  const productPrice = idProduit.price;
  console.log(productPrice);
  const affichage_Price = document.querySelector("#price");
  affichage_Price.innerHTML = productPrice;

  //Retour Description
  const productDescription = idProduit.description;
  console.log(productDescription);
  const affichage_Description = document.querySelector("#description");
  affichage_Description.innerHTML = productDescription;

  //Retour des options couleurs
    //Déclaration des variables
    let colors = [];
    let optionStructure = [];
    let nameOption = [];
    //Importation des couleurs
    colors = idProduit.colors;
    console.log(colors);
    //sélection élément du DOM
    var elt = document.querySelector("#colors");
    //Création de la boucle
    for (var i = 0; i < colors.length; i++) {
      //Stockage des données dans les variables
      product.forEach((element, i) => {
        nameOption[i] = colors[i]
      });
      //Affichage des objets dans la page
      optionStructure += `
                    <option value="${nameOption[i]}">${nameOption[i]}</option>
                    `;
      //Injection dans le HTML
      elt.innerHTML = optionStructure;
    }
}

// Création de la fonction de mise en panier
function addCart(cart) {
  //Récupération des données du produits
  //Sélection de la couleur
  const color = document.querySelector("#colors");
  console.log(color);
  //Sélection de la quantité
  const quantity = document.querySelector("#quantity");
  console.log(quantity);
  //Selection du bouton de commande
  const btnPanier = document.querySelector("#addToCart");
  console.log(btnPanier);
  //Ecouter le bouton de commande
  btnPanier.addEventListener("click", (event) => {
    event.preventDefault();

    //Sélection du choix couleur et quantité de l'utilisateur
    const choiceColor = color.value;
    console.log(choiceColor);
    const choiceQuantity = quantity.value;
    console.log(choiceQuantity);

    //Récupération des valeurs du produits
    let valuesProduct = {
      imgProduct: imgUrl,
      atlProduct: imgAlt,
      nameProduct: productName,
      colorProduct: choiceColor,
      quantityProduct: choiceQuantity,
      priceProduct: productPrice,
    }
    console.log(valuesProduct);
  })

  addStorage(storage);
}

//Création de la fonction de mise en stckage local
function addStorage(storage) {
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
}*/


//Déclaration d'une promesse pour l'ID
const PromesseProduit = new Promise((resolve, reject) => {
  resolve("La récupération de l'id a marchée")
});

console.log(PromesseProduit);

//Récupération de l'ID dans la promesse
PromesseProduit
  .then((reponse) => {
    //Récupération de l'ID dans l'URL
    const Url_id = window.location.search;
    console.log(Url_id);

    //Récupération de l'ID sans le ?
    const Urlrécup = new URLSearchParams(Url_id);
    const product_id = Urlrécup.get("id");
    console.log(product_id);


    //Appel de l'API
    const dataApi = fetch('http://localhost:3000/api/products');

    //Récupération des données de l'API
    dataApi
      .then((httpBodyResponse) => httpBodyResponse.json())
      .then((products) => {
        console.table(products);

        try {
          //Retrouver dans l'API le produit correspondant à l'ID
          const idProduit = products.find((element) => element._id === product_id);
          console.log(idProduit)

          //Retour Image & Alt 
          const imgUrl = idProduit.imageUrl;
          console.log(imgUrl);
          const imgAlt = idProduit.altTxt;
          console.log(imgAlt);
          document.querySelector('.item__img img').src = imgUrl;
          document.querySelector('.item__img img').alt = imgAlt;

          //Retour Name
          const productName = idProduit.name;
          console.log(productName);
          const affichage_Name = document.querySelector("#title");
          affichage_Name.innerHTML = productName;

          //Retour Price
          const productPrice = idProduit.price;
          console.log(productPrice);
          const affichage_Price = document.querySelector("#price");
          affichage_Price.innerHTML = productPrice;

          //Retour Description
          const productDescription = idProduit.description;
          console.log(productDescription);
          const affichage_Description = document.querySelector("#description");
          affichage_Description.innerHTML = productDescription;

          //Retour des options couleurs
            //Déclaration des variables
            let colors = [];
            let optionStructure = [];
            let nameOption = [];
            //Importation des couleurs
            colors = idProduit.colors;
            console.log(colors);
            //sélection élément du DOM
            var elt = document.querySelector("#colors");
            //Création de la boucle
            for (var i = 0; i < colors.length; i++) {
              //Stockage des données dans les variables
              products.forEach((element, i) => {
                nameOption[i] = colors[i]
              });
              //Affichage des objets dans la page
              optionStructure += `
              <option value="${nameOption[i]}">${nameOption[i]}</option>
              `;
              //Injection dans le HTML
              elt.innerHTML = optionStructure;
            }

          //Création de l'évènement mise en panier
            //Récupération des données du produits
            //Sélection de la couleur
            const color = document.querySelector("#colors");
            console.log(color);
            //Sélection de la quantité
            const quantity = document.querySelector("#quantity")
            
            //Selection du bouton de commande
            const btnPanier = document.querySelector("#addToCart");
            console.log(btnPanier);
            //Ecouter le bouton de commande
            btnPanier.addEventListener("click", (event) => {
              event.preventDefault();
              
              //Sélection du choix couleur et quantité de l'utilisateur
              const choiceColor = color.value;
              console.log(choiceColor);
              const choiceQuantity = quantity.value;
              console.log(choiceQuantity);

              //Récupération des valeurs du produits
              let valuesProduct = {
                imgProduct: imgUrl, 
                atlProduct: imgAlt,
                nameProduct: productName, 
                colorProduct: choiceColor, 
                quantityProduct: choiceQuantity,
                priceProduct: productPrice
              }
              console.log(valuesProduct);

              //Mise en LocalStorage de l'évènement
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
                if(productsStorage){
                  addProductStorage(); 
                  console.log(productsStorage);
                } else {
                  productsStorage = []; 
                  addProductStorage();
                  console.log(productsStorage);
                }
            });
          
          //Catch du Try
        } catch (err) {
          alert("Il y a eu un problème avec l'opération try: " + err.message)
        }
      })

      //Catch du Fetch
      .catch((error) => {
        alert("Il y a eu un problème avec l'opération fetch: " + error.message)
      })

  //catch de la promesse
  .catch((erreur) => {
    console.log(erreur);
  })
});