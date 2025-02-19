export function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemInCart = false
    let newCart = cart.map((cartItem) => {
        if (cartItem.product.id === product.id) {
            itemInCart = true
            return {...cartItem, quantity: quantity+cartItem.quantity}
        } else {
            return cartItem
        }
    })
    if (!itemInCart) {
        newCart.push({
            product,
            quantity,
            deliveryOption: {
                id: 1,
                timeToDelivery: 7,
                priceCents: 0,
              },
        })
    }
    localStorage.setItem('cart', JSON.stringify(newCart))
}

export function getCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })
    return cartQuantity
}

export function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]))
}
