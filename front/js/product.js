const dataApi = fetch('http://localhost:3000/api/products');

dataApi
  .then((httpBodyResponse) => httpBodyResponse.json())
  .then((products) => {
    console.table(products);

    try {
      //Retour Image & Alt 
      const imgUrl = products[0].imageUrl;
      console.log(imgUrl);
      const imgAlt = products[0].altTxt;
      console.log(imgAlt);
      document.querySelector('.item__img img').src = imgUrl;
      document.querySelector('.item__img img').alt = imgAlt;

      //Retour Name
      const productName = products[0].name;
      console.log(productName);
      const affichage_Name = document.querySelector("#title");
      affichage_Name.innerHTML = productName;

      //Retour Price
      const productPrice = products[0].price;
      console.log(productPrice);
      const affichage_Price = document.querySelector("#price");
      affichage_Price.innerHTML = productPrice;      
        
      //Retour Description
      const productDescription = products[0].description;
      console.log(productDescription);
      const affichage_Description = document.querySelector("#description");
      affichage_Description.innerHTML = productDescription;

      //Catch du Try
    } catch (err) {
      alert("Il y a eu un problème avec l'opération try: " + err.message)
    }
  })
  //Catch du Fetch
  .catch((error) => {
    alert("Il y a eu un problème avec l'opération fetch: " + error.message)
  });