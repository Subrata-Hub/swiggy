/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { addCartItems, addResInfo, reSetStore } from "../utils/cartSlice";

const PopupResetCard = ({
  setShowResetCardPopup,
  resInformation,
  menuInfo,
  counter,
  searchDishesData,
  setShowPopupBeforeReset,
}) => {
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart);

  const handleResetCart = () => {
    dispatch(reSetStore());

    dispatch(addResInfo(resInformation));
    const newCounter = counter + 1;
    // setCounter(newCounter);

    const updatedCardInfo = {
      ...menuInfo,
      totalMenuItems: newCounter,
    };
    dispatch(addCartItems(updatedCardInfo));

    if (searchDishesData?.info.addons) {
      // setShowMenuCardPopup(!showMenuCardPopup);

      setShowPopupBeforeReset(true);
      dispatch(reSetStore());
    }
    setShowResetCardPopup(false);
  };
  return (
    <div className="w-[520px] h-[220px] p-[30px] bg-slate-800 fixed z-[11999] bottom-15 right-[30%] rounded-3xl">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-bold text-[22px]">Items already in cart</h2>
        </div>
        <p>
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex justify-between items-center mt-2">
          <button
            className="w-[220px] h-[50px] bg-slate-600"
            onClick={() => setShowResetCardPopup(false)}
          >
            NO
          </button>
          <button
            className="w-[220px] h-[50px] bg-green-500"
            onClick={handleResetCart}
          >
            YES START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupResetCard;
