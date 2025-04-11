import { useSelector } from "react-redux";

const PopupCardView = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <>
      {cartItems.length >= 1 && (
        <div className=" mx-48 w-[850px] bg-green-700 h-14 flex justify-between items-center px-4 fixed bottom-0 z-1000000">
          <div>
            <span>{cartItems.length}</span> Items Added
          </div>
          <div>VIEW CARD</div>
        </div>
      )}
    </>
  );
};

export default PopupCardView;
