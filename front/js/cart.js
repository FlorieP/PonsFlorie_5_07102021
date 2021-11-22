////////// CONSTANTES ET VARIABLES //////////  
let cart = [];
let quantity = [];
let cartStructure = [];

////////// APPEL DES FONCTIONS //////////  
// Checker le contenu du localStorage et le retourner
viewStorage();
// Afficher les produits du panier     
cartDisplay();
// Préparer l'action de suppression d'une ligne
deleteProduct();
// Mettre à jour la quantité et mettre à jour localStorage       
updateQuantity();
//Calculter la quantité et le prix total du panier
totalQuantityCart();
totalPriceCart();


/////////// FONCTIONS //////////
//Création de la fonction d'affichage du contenu du Storage
function viewStorage() {
    cart = JSON.parse(localStorage.getItem("product"));
    if (cart == null) {
        cart = [];
    }
    console.table(cart);
}

//Création de la fonction d'affichage dynamique
function cartDisplay() {
    //Déclaration des variables
    //let cartStructure = [];
    //sélection élément du DOM
    const positionElement = document.querySelector('#cart__items');
    //Création de la boucle
    for (var i = 0; i < cart.length; i++) {
        //Affichage des produits dans la page
        cartStructure += `
        <article class="cart__item" data-color="${cart[i].colorProduct}" data-id="${cart[i].idProduct}">
            <div class="cart__item__img">
                <img src="${cart[i].imgProduct}" alt="${cart[i].altProduct}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                <h2>${cart[i].nameProduct}</h2>
                <p>${cart[i].colorProduct}</p>
                <p>${cart[i].priceProduct}</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantityProduct}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>
        `;
    }
    //Injection dans le HTML
    positionElement.innerHTML = cartStructure;
}


function deleteProduct() {
    //Selection du bouton de suppression  
    document.querySelectorAll('.deleteItem').forEach(element => {
        //Ecoute de l'évenement au clique
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            // Affichage console de l'id et de la couleur concerné
            console.log("id: " + this.closest(".cart__item").dataset.id);
            console.log("color: " + this.closest(".cart__item").dataset.color);
            //Selection de l'élément à supprimer en fonction de son id et de sa couleur
            let idDelete = this.closest(".cart__item").dataset.id;
            let colorDelete = this.closest(".cart__item").dataset.color;
            console.log("L'id de l'élément à supprimé est: " + idDelete + " de couleur: " + colorDelete);
            cart = cart.filter(el => el.idProduct !== idDelete || el.colorProduct !== colorDelete);
            //Mise à jour du locatStorage     
            localStorage.setItem("product", JSON.stringify(cart));
            //Alerte produit supprimé et refresh
            alert('Ce produit a bien été supprimé du panier');
            location.reload();
        });
    });
}

//Fonction quantité total panier
function totalQuantityCart() {
    let totalQuantity = 0;
    //let quantity = [];
    // Parcourir la quantité disponible dans le localStorage
    for (var i = 0; i < cart.length; i++) {
        quantity += cart[i].quantityProduct;
    }
    //Calcul quantité total
    for (var j = 0; j < quantity.length; j++) {
        totalQuantity += parseInt(quantity[j]);
    }
    console.log(totalQuantity);
    //Affichage quantité total
    totalQuantity = document.getElementById('totalQuantity').textContent = totalQuantity;
}

//Fonction calcul total panier 
function totalPriceCart() {
    let totalPrice = 0;
    //Calcul prix
    for (var i = 0; i < cart.length; i++) {
        totalPrice += cart[i].quantityProduct * cart[i].priceProduct;
    }
    console.log(totalPrice);
    //Affichage prix total
    totalPrice = document.getElementById('totalPrice').textContent = totalPrice;

};

//Fonction qui permet de voir si un produit est présent dans le tableau par son id et sa couleur
function checkProductIdColor(idProduct, colorProduct) {
    let find = null;
    console.log(idProduct);
    console.log(colorProduct);
    for (let jsonCartProduct of cart) {
        
        console.log(jsonCartProduct.idProduct + ' / ' + idProduct);
        console.log(jsonCartProduct.colorProduct + ' / ' + colorProduct);
        if (jsonCartProduct.idProduct == idProduct &&
             jsonCartProduct.colorProduct == colorProduct) {
            find = cart.indexOf(jsonCartProduct);
            console.log(jsonCartProduct.idProduct + ' / ' + idProduct);
            console.log(jsonCartProduct.colorProduct + ' / ' + colorProduct);
            break;
        }
    }
    return find;
}


// Création fonction pour lire le changement de quantité
function updateQuantity() {
    //Selection de la balise quantité 
    document.querySelectorAll('.itemQuantity').forEach(qty => {
        //Ecoute de l'évenement au changement
        qty.addEventListener('change', function (event) {
            event.stopPropagation();
            event.preventDefault();
            // Affichage console de l'id et de la couleur concerné
            console.log("id: " + this.closest(".cart__item").dataset.id);
            console.log("color: " + this.closest(".cart__item").dataset.color);
            let id= this.closest(".cart__item").dataset.id;
            let color= this.closest(".cart__item").dataset.color;
            //Condition de quantité min et max
            if (qty < 1 || qty > 100) {
                window.alert("La quantité choisie est incorrecte, elle doit être comprise entre 1 et 100");
            } else {
                //Recherche du produit correspondant et changement de quantité
                let findProduct = checkProductIdColor(id, color);
                console.log(findProduct);
                console.log("qté:"+cart[findProduct].quantityProduct);
                cart[findProduct].quantityProduct = parseInt(this.value);
                //Mise à jour du locatStorage     
                localStorage.setItem("product", JSON.stringify(cart));
                //Alerte produit supprimé et refresh
                alert('La quantité de ce produit à bien été modifié');
                location.reload();
            };
        });
    });
}


/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// VALIDATION DU FORMULAIRE //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



// Regex Prénom
var firstName = document.getElementById('firstName');
var firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
firstName.addEventListener('change', (event) => {
    var firstName_validation = /^[A-Za-zÀÁÂÃÄÅÈÉÊËÌÍÎÏàáâãäâèéêëìíîïç][a-zàáâãäâèéêëìíîïç]+([-'\s][A-Za-zÀÁÂÃÄÅÈÉÊËÌÍÎÏàáâãäâèéêëìíîïç][a-zàáâãäâèéêëìíîïç]+)?/;

    if (firstName_validation.test(firstName.value) == false){
        event.preventDefault();
        firstNameErrorMsg.textContent = 'Format du prénom incorrecte';
        firstNameErrorMsg.style.color = 'lightred';
    } else {
        console.log(firstName.value);
    }
});

// Regex Nom
var lastName = document.getElementById('lastName');
var lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
lastName.addEventListener('change', (event) => {
    var lastName_validation = /[A-Za-zÀÁÂÃÄÅÈÉÊËÌÍÎÏàáâãäâèéêëìíîïç]+([-'\s][A-Za-zÀÁÂÃÄÅÈÉÊËÌÍÎÏàáâãäâèéêëìíîïç]+)?/;

    if (lastName_validation.test(lastName.value) == false){
        event.preventDefault();
        lastNameErrorMsg.textContent = 'Format du nom incorrecte';
        lastNameErrorMsg.style.color = 'lightred';
    } else {
        console.log(lastName.value);
    }
});

// Regex adresse
var address = document.getElementById('address');
var addressErrorMsg = document.getElementById('addressErrorMsg');
address.addEventListener('change', (event) => {
    var address_validation = /[ ]/;

    if (address_validation.test(address.value) == false){
        event.preventDefault();
        addressErrorMsg.textContent = 'Format de l\'adresse incorrecte';
        addressErrorMsg.style.color = 'lightred';
    } else {
        console.log(address.value);
    }
});

// Regex ville
var city = document.getElementById('city');
var cityErrorMsg = document.getElementById('cityErrorMsg');
city.addEventListener('change', (event) => {
    var city_validation = /[A-Za-zÀÁÂÃÄÅÈÉÊËÌÍÎÏàáâãäâèéêëìíîïç]+([-\s][A-Za-zÀÁÂÃÄÅÈÉÊËÌÍÎÏàáâãäâèéêëìíîïç]+)?/;

    if (city_validation.test(city.value) == false){
        event.preventDefault();
        cityErrorMsg.textContent = 'Format de la ville incorrecte';
        cityErrorMsg.style.color = 'lightred';
    } else {
        console.log(city.value);
    }
});

// Regex email
var email = document.getElementById('email');
var emailErrorMsg = document.getElementById('emailErrorMsg');
email.addEventListener('change', (event) => {
    var email_validation = /^[a-zA-Z0-9.-_]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]/;

    if (email_validation.test(email.value) == false){
        event.preventDefault();
        emailErrorMsg.textContent = 'Format de l\'adresse email incorrecte';
        emailErrorMsg.style.color = 'lightred';
    } else {
        console.log(email.value);
    }
});



// Récupération du bouton Commander   
var validation = document.getElementById('order')
console.log(validation);
validation.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (lastName && firstName && address && city && email) {

        // Ajout des informations du contact dans l'object contact
        let contact = {
          lastName : lastName.value,
          firstName : firstName.value,
          address : address.value,
          city : city.value,
          email : email.value
        };
        console.log(contact);

        // Ajout de l'id des produits commandé dans l'objetc products
        let productsList = [];
        for (var i = 0; i < cart.length; i++) {
           productsList.push(cart[i].idProduct);
        }
        console.log(productsList);

        //Fetch 
        fetch("http://localhost:3000/api/products/order", {
            method:
                "POST",
            headers: {
                'Accept':
                    'application/json',
                'Content-Type':
                    'application/json'
            },
            body:
                JSON.stringify({
                    contact: contact,
                    products: productsList
                })
        })
    
            .then(function (resultat) {
    
                if (resultat.ok) {
                    console.log(resultat);
                    return resultat.json();
                }
            })
    
            .then(function (jsonres) {
                console.log(jsonres);
                console.log(jsonres.orderId);
               // localStorage.removeItem('product');
                document.location.href = `./confirmation.html?orderId=${jsonres.orderId}`;
               // idOrderDisplay (jsonres);
            })
            
            .catch(function (erreur) {
                alert("Impossible de passer la commande");
                console.log(erreur);
            });
    }
});

function idOrderDisplay (jsonres) {
    let idOrder = document.getElementById('orderId');
    idOrder = jsonres.orderId;
    console.log(jsonres.orderId + ' / ' + idOrder);
}


