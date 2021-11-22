//Déclaration variable et constant
let order_id = '';

//Appel des fonctions
idRecovery();
idOrderDisplay();

//Création fonction de récupération de l'ID du produit
function idRecovery() {
  //Récupération de l'ID dans l'URL
  const Urlrécup = new URLSearchParams(window.location.search);
  order_id = Urlrécup.get("orderId");
  console.log("L'id de la commande est : " + order_id);
}

function idOrderDisplay (jsonres) {
    let idOrder = document.getElementById('orderId');
    console.log(order_id + ' / ' + idOrder);
    idOrder.innerHTML = order_id;
}