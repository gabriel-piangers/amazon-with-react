import { useReducer, useState } from "react";
import Header from "../components/Header";
import Orders from "../components/Orders";
import { cartQuantityReducer, getCartQuantity } from "../scripts/Cart";

function OrdersPage() {
  const [orders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [cartQuantity, dispatchCartQuantity] = useReducer(cartQuantityReducer, getCartQuantity())


  return (
    <div>
      <Header cartQuantity={cartQuantity} />
      <div className="flex">
        <Orders orders={orders} dispatchCartQuantity={dispatchCartQuantity}/>
      </div>
    </div>
  );
}

export default OrdersPage;
