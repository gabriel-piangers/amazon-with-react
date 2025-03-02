import { useEffect, useState } from "react";
import { formatCurrency } from "../scripts/money";
import { cartReducer } from "../scripts/Cart";

function Products({ dispatchCartQuantity, search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://supersimplebackend.dev/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  function AddedPopUp(productId) {
    const html = document.querySelector(`.added-popup-${productId}`);
    html.classList.remove("opacity-0");

    setTimeout(() => {
      html.classList.add("opacity-0");
    }, 1500);
  }

  function displayProduct(product) {
    return (
      <div
        key={product.id}
        className="flex flex-col justify-between py-8 px-5 items-center border-r border-b border-stone-300"
      >
        <div className="flex mb-1">
          <img
            src={`../../${product.image}`}
            className="w-[200px] h-[200px] object-contain p-4 "
          />
        </div>

        <div className="flex flex-col gap-2 mb-2 text-[17px] leading-tight">
          <p>{product.name}</p>

          <div className="flex gap-2">
            <div className="flex">
              <img
                className="w-[100px] object-contain"
                src={`../../images/ratings/rating-${
                  product.rating.stars * 10
                }.png`}
              />
            </div>

            <p className="size-[24px] my-auto text-blue-800">
              {product.rating.count}
            </p>
          </div>

          <p className="font-medium">{formatCurrency(product.priceCents)}</p>

          <select
            name={`${product.id}`}
            id={`quantity-selector-${product.id}`}
            className="bg-stone-100 rounded-md w-[50px] border border-stone-300 shadow-md focus:border-amber-500 focus:border-2"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div
          className={`added-popup-${product.id} mb-2 h-[24px] px-2 text-start w-[90%] flex gap-1 opacity-0 transition-opacity duration-300 text-green-800 font-medium`}
        >
          <img
            src="../../images/icons/checkmark.png"
            className="h-[20px] object-contain my-auto pr-1"
          />
          <div>Added</div>
        </div>

        <button
          className="bg-yellow-300 rounded-3xl mx-auto p-2 w-[90%] text-[14px]"
          onClick={() => {
            const quantity = Number.parseInt(
              document.querySelector(`#quantity-selector-${product.id}`).value
            );
            cartReducer(JSON.parse(localStorage.getItem('cart')), {type: 'add', payload: {item: product, quantity}})
            dispatchCartQuantity({ type: "increment", quantity });
            AddedPopUp(product.id);
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  }

  if (search) {
    const matching = products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(search.trimStart().trimEnd().toLowerCase());
    });
    console.log(matching);
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))]">
        {matching.map((product) => displayProduct(product))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,1fr))]">
        {products.map((product) => displayProduct(product))}
      </div>
    );
  }
}

export default Products;
