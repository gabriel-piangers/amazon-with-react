import Header from "../components/Header";
import TrackProduct from "../components/TrackProduct";
import { useSearchParams } from "react-router";
import { getCartQuantity } from "../scripts/Cart";

function TrackingPage() {
    const [searchParams] = useSearchParams();
    const orders = JSON.parse(localStorage.getItem('orders'))
    let product = undefined
    orders.forEach((order) => {
        if (order.id === searchParams.get('orderId')) {
            order.products.forEach((orderProduct) => {
                if (orderProduct.id === searchParams.get('productId')) {
                    product = {
                        ...orderProduct,
                        placedTime: order.placedTime
                    }
                }
            })
        }
    })

    
    return (
        <div>
            <Header cartQuantity={getCartQuantity()}/> 
            <div className="flex">
              <TrackProduct product={product}/>
            </div>
           
        </div>
    )
}

export default TrackingPage