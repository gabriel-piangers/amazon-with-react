import { useState, } from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import { getCartQuantity } from "../scripts/Cart";
import { useSearchParams } from "react-router";


function HomePage() {
    const [cartQuantity, setCartQuantity] = useState(getCartQuantity())
    
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search')

    return (
        <div>
            <Header cartQuantity={cartQuantity}/>
            <Products cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} search={search}/>
        </div>
    )
}

export default HomePage;