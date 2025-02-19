import { SearchIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

function Header({ cartQuantity }) {
  const navigate = useNavigate();
  return (
    <div className=" h-[60px] bg-slate-950 flex justify-between px-4 gap-4">
      <NavLink to={"/"} className="flex mx-4 max-sm:hidden min-w-[100px]">
        <img
          src="../../images/amazon-logo-white.png"
          alt="Amazon logo"
          className="my-auto h-[30px] object-contain"
        />
      </NavLink>
      <NavLink to={"/"} className="flex sm:hidden">
        <img
          src="../../images/amazon-mobile-logo-white.png"
          alt="Amazon logo"
          className="w-[40px] my-auto ml-4 mr-9 "
        />
      </NavLink>
      <div className="h-[40px] w-[80%] max-w-[800px] flex self-center mx-auto">
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          className="search-input w-full bg-white  align-bottom rounded-l-md pl-2"
        />
        <button
          onClick={() => {
            const input = document.querySelector("#search-input");
            input.value ? navigate(`/?search=${input.value}`) : navigate("/");
            input.value = null;
          }}
        >
          <SearchIcon className="bg-orange-300 h-[40px] w-[40px] rounded-r-md p-2" />
        </button>
      </div>
      <div className="flex justify-between gap-2 self-center">
        <NavLink to={"/orders"} className="text-white min-w-[70px]">
          <p className="size-[10px] mb-1">Returns</p>
          <p className="font-bold">& Orders</p>
        </NavLink>
        <NavLink to={"/checkout"} className="flex ">
          <div className="relative">
            <img
              src="../../images/icons/cart-icon.png"
              alt="Cart icon"
              className="w-[40px] min-w-[40px] h-[40px] object-contain my-auto"
            />
            <div className="w-[30px] text-orange-400 font-medium absolute bottom-5 left-2 text-center">
              {cartQuantity}
            </div>
          </div>

          <p className="text-white font-bold mt-4 max-sm:hidden">
            Cart
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
