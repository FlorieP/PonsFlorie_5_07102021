////////// PROMESSE //////////
//Déclaration d'une promesse 
const PromesseCart = new Promise((resolve, reject) => {
    resolve("Affichage du panier & validation du formulaire")
  });
  console.log(PromesseCart);
  
  //Appel des fonctions dans la promesse
  PromesseCart
    .then((resolve) => {
      //function
  
    })
    //catch de la promesse
    .catch((erreur) => {
      console.log(erreur);
    });
  
  ////////// CONSTANTES ET VARIABLES //////////  
  let api = 'http://localhost:3000/api/products';
  
  /////////// FONCTIONS //////////
  