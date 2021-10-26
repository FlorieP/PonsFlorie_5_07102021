//Stockage url API
let api = 'http://localhost:3000/api/products';

//Appel fonction loadApi
loadData(api);

//Création fonction appel API
function loadData(url) {
  //Récupération des données de l'API
  fetch(url)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((listProducts) => {
      console.table(listProducts);

      try {
        //Appel de la fonction d’affichage des produits 
        productsDisplay(listProducts);

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

//Création de la fonction d'affichage dynamique
function productsDisplay(products) {
  //Déclaration des variables
  let productId = []
  let productName = [];
  let productDescription = [];
  let imgUrl = [];
  let imgAlt = [];
  let cardStructure = [];

  //sélection élément du DOM
  const positionElement = document.querySelector('#items');

  //Création de la boucle
  for (var i = 0; i < products.length; i++) {

    //Stockage des données dans les variables
    products.forEach((element, i) => {
      productId[i] = products[i]._id;
      productName[i] = products[i].name;
      productDescription[i] = products[i].description;
      imgUrl[i] = products[i].imageUrl;
      imgAlt[i] = products[i].altTxt;
    });

    //Affichage des objets dans la page
    cardStructure += `
        <a href="./product.html?id=${productId[i]}">
          <article>
              <img src="${imgUrl[i]}" alt="${imgAlt[i]}">
              <h3 class="productName">${productName[i]}</h3>
              <p class="productDescription">${productDescription[i]}</p>
          </article>
        </a>
      `;

    //Injection dans le HTML
    positionElement.innerHTML = cardStructure;
  }
}

