import { formatCurrency } from "../scripts/money";
import PlaceOrderButton from "./PlaceOrderButton";

function OrderSummary({cart, cartQuantity}) {      


    let itemsPriceCents = 0
    let shippingPriceCents = 0
    cart.forEach((cartItem) => {
        itemsPriceCents += cartItem.product.priceCents * cartItem.quantity
        shippingPriceCents += cartItem.deliveryOption.priceCents;
    })
    
    const taxFreeTotal = itemsPriceCents + shippingPriceCents
    const taxPriceCents = taxFreeTotal * 0.1
    const totalPriceCents = taxFreeTotal + taxPriceCents
    return (
        <div className="min-w-[400px] max-w-[500px] border h-[300px] flex flex-col gap-1 p-3 border-slate-300 shadow-md rounded-md max-lg:order-1">
            <div className="text-[16px] font-bold mb-1">Order Summary</div>
            <div  className="flex justify-between">
                <p>Items ({cartQuantity}):</p>
                <p>{formatCurrency(itemsPriceCents)}</p>
            </div>
            <div className="flex justify-between">
                <p>Shipping & handling:</p>
                <p>{formatCurrency(shippingPriceCents)}</p>
            </div>
            <hr className="ml-auto w-[40px] text-neutral-400"/>
            <div className="flex justify-between">
                <p>Total before tax:</p>
                <p>{formatCurrency(taxFreeTotal)}</p>
            </div>
            <div className="flex justify-between">
                <p>Estimated Tax (10%):</p>
                <p>{formatCurrency(taxPriceCents)}</p>
            </div>
            <hr className="mx-2 text-neutral-400" />
            <div className="flex justify-between my-2 text-orange-800 text-[20px] font-bold">
                <p >Order total:</p>
                <p>{formatCurrency(totalPriceCents)}</p>
            </div>
            <PlaceOrderButton cart={cart} totalPriceCents={totalPriceCents}/>
        </div>
    )
}

export default OrderSummary;