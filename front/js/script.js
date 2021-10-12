/*fetch('http://localhost:3000/api/products')
  .then((httpBodyResponse) => httpBodyResponse.json())
  .then((products) => console.table(products[0]))
  
  .catch((error) => {
    alert('Il y a eu un problème avec l\'opération fetch: ' + error.message)
  });*/

  const dataApi = fetch('http://localhost:3000/api/products');

  dataApi
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => {
      console.table(products);
  
      try {
  
        for (var i = 0; i < products.length; i++) {
  
          //Creation nouveau <a>
          const newElt = document.createElement("a");
          let elt2 = document.getElementById('items');
          elt2.appendChild(newElt);
          newElt.innerHTML = "<a href=\"./product.html?id=42\"><article><img src=\"\" alt=\"\"><h3 class=\"productName\">Kanap name1</h3><p class=\"productDescription\">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>";
          //Retour Name
          const productName = products[i].name;
          console.log(productName);
          const affichage_Name = document.querySelector(".productName");
          affichage_Name.innerHTML = productName;
  
          //Retour Description
          const productDescription = products[i].description;
          console.log(productDescription);
          const affichage_Description = document.querySelector(".productDescription");
          affichage_Description.innerHTML = productDescription;
  
          //Retour Image & Alt 
          const imgUrl = products[i].imageUrl;
          console.log(imgUrl);
          const imgAlt = products[i].altTxt;
          console.log(imgAlt);
          document.querySelector('#items img').src = imgUrl;
          document.querySelector('#items img').alt = imgAlt;
        }
  
        //Catch du Try
      } catch (err) {
        alert("Il y a eu un problème avec l'opération try: " + err.message)
      }
    })
    //Catch du Fetch
    .catch((error) => {
      alert("Il y a eu un problème avec l'opération fetch: " + error.message)
    });