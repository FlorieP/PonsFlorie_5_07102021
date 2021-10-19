
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
          let colorStructure = [];
          let colorsvalues = [];
          //Création de la fonction d'affichage dynamique
          function colorsDisplay(colors) {
            colorsvalues = products.find((element) => element.colors);
            console.log(colorsvalues);
            //sélection élément du DOM
            const positionElement = document.querySelector('#colors');
            //Création de la boucle
            for (var i = 0; i < colors.length; i++) {
              //Stockage des données dans les variables
              colorsvalues.forEach((element, i) => {
                colorsProduct[i] = colorsvalues[i];
              });
              //Affichage des objets dans la page
              colorStructure += `
              <option value="${colorsProduct[i]}">--SVP, choisissez une couleur --</option>
  		      `;
              //Injection dans le HTML
              positionElement.innerHTML = colorStructure;
            }
            //Appel de la fonction d’affichage des produits 
            colorsDisplay(colors);
          }
          //Catch du Try
        } catch (err) {
          alert("Il y a eu un problème avec l'opération try: " + err.message)
        }
      })
      //Catch du Fetch
      .catch((error) => {
        alert("Il y a eu un problème avec l'opération fetch: " + error.message)
      })
      .catch((erreur) => {
        console.log(erreur);
      })
  });