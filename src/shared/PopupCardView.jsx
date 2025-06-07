import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIsCheckOutPage } from "../utils/configSlice";

const PopupCardView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const handleCheckPage = () => {
    navigate("/checkout");
    dispatch(addIsCheckOutPage(true));
  };
  return (
    <div className="flex justify-center" onClick={handleCheckPage}>
      {cartItems.length >= 1 && (
        <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[940px] 2xl:w-[850px]  -ml-2 sm:-ml-0  bg-green-700 h-14 flex justify-between items-center px-4 fixed bottom-0 z-1000000">
          <div>
            <span>{cartItems.length}</span> Items Added
          </div>
          <div>VIEW CARD</div>
        </div>
      )}
    </div>
  );
};

export default PopupCardView;
