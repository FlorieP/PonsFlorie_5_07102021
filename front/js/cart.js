////////// CONSTANTES ET VARIABLES //////////  
let cart = [];

let quantity = [];

////////// APPEL DES FONCTIONS //////////  
// Checker le contenu du localStorage et le retourner
viewStorage();
// Afficher les produits du panier     
cartDisplay();
// Préparer l'action de suppression d'une ligne
deleteProduct();
// Mettre à jour la quantité et mettre à jour localStorage       
updateQuantity(cart);
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
    let cartStructure = [];
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
function checkProductIdColor(cart, idProduct, colorProduct) {
    let find = null;
    console.log(cart.idProduct);
    console.log(cart.colorProduct);
    for (let jsonCartProduct of cart) {
        console.log(cart);
        console.log(jsonCartProduct.id + ' / ' + cart.idProduct);
        console.log(jsonCartProduct.color + ' / ' + cart.colorProduct);
        if (jsonCartProduct.idProduct == cart.idProduct && jsonCartProduct.colorProduct == cart.colorProduct) {
            find = cart.indexOf(jsonCartProduct);
            console.log(jsonCartProduct.id + ' / ' + idProduct);
            console.log(jsonCartProduct.color + ' / ' + colorProduct);
            break;
        }
    }
    return find;
}


// Création fonction pour lire le changement de quantité
function updateQuantity(cart, idProduct, colorProduct, quantityProduct) {
    //Selection de la balise quantité 
    document.querySelectorAll('.itemQuantity').forEach(qty => {
        //Ecoute de l'évenement au changement
        qty.addEventListener('change', function (event) {
            event.stopPropagation();
            event.preventDefault();
            // Affichage console de l'id et de la couleur concerné
            console.log("id: " + this.closest(".cart__item").dataset.id);
            console.log("color: " + this.closest(".cart__item").dataset.color);
            //Condition de quantité min et max
            if (qty < 1 || qty > 100) {
                window.alert("La quantité choisie est incorrecte, elle doit être comprise entre 1 et 100");
            } else {
                //Recherche du produit correspondant et changement de quantité
                let findProduct = checkProductIdColor(cart, idProduct, colorProduct);
                console.log(findProduct);
                //cart[findProduct].quantityProduct = parseInt(qty):
                //Mise à jour du locatStorage     
                localStorage.setItem("product", JSON.stringify(cart));
                //Alerte produit supprimé et refresh
                alert('La quantité de ce produit à bien été modifié');
                location.reload();
            };
        });
    });
}

