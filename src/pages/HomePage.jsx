import { useReducer } from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import { cartQuantityReducer, getCartQuantity } from "../scripts/Cart";
import { useSearchParams } from "react-router";


function HomePage() {
    const [cartQuantity, dispatchCartQuantity] = useReducer(cartQuantityReducer, getCartQuantity())
    
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search')

    return (
        <div>
            <Header cartQuantity={cartQuantity}/>
            <Products dispatchCartQuantity={dispatchCartQuantity} search={search}/>
        </div>
    )
}

export default HomePage;