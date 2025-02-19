import { NavLink } from "react-router";

function CheckoutHeader({ cartQuantity }) {
  return (
    <div className=" h-[40px] m-4 flex justify-between">
      <NavLink to={'/'} className="mx-[2%] my-auto max-sm:hidden">
        <img src="../../images/amazon-logo.png" className="w-[100px] object-contain hover:cursor-pointer"/>
      </NavLink>
      <NavLink to={'/'} className="mx-[2%] my-auto sm:hidden">
        <img src="../../images/amazon-mobile-logo.png" className="h-[40px] object-contain hover:cursor-pointer"/>
      </NavLink>
      <div className="my-auto text-[24px] font-medium">
        Checkout <span className="text-blue-700">({cartQuantity} items)</span>
      </div>
      <div className="flex h-[20px] mx-2 my-auto">
        <img src="../../images/icons/checkout-lock-icon.png"/>
      </div>
    </div>
  );
}

export default CheckoutHeader;
