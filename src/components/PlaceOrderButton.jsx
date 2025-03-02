import { v4 } from "uuid"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { useNavigate } from "react-router";
import { cartReducer } from "../scripts/Cart";


function PlaceOrderButton({cart, totalPriceCents}) {
    let navigate = useNavigate()

    function placeOrder(cart, totalPriceCents) {
        const orders = JSON.parse(localStorage.getItem('orders')) || []
        const newOrder = {
            id: v4(),
            placedTime: dayjs(),
            totalPriceCents: totalPriceCents,
            products: cart.map((cartItem) => {
                    return {
                        ...cartItem.product,
                        quantity: cartItem.quantity,
                        arrivingOn: dayjs().add(cartItem.deliveryOption.timeToDelivery, 'days')
                    }
                })
        }
        orders.push(newOrder)
        localStorage.setItem('orders', JSON.stringify(orders))
        cartReducer(JSON.parse(localStorage.getItem('cart')), {type:'clear'})
    }

    if (cart.length > 0) {
        return (
            <button className="bg-yellow-300 px-15 py-2 rounded-md mx-auto mt-6 hover:cursor-pointer" onClick={() => {
                placeOrder(cart, totalPriceCents)
                navigate('/orders')
            }}>
                Place your order
            </button>
        )
    } else {
        return (
            <button className="bg-yellow-300 px-15 py-2 rounded-md mx-auto mt-6 opacity-45">
                Place your order
            </button>
        )
    }
}

export default PlaceOrderButton