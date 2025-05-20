import { useSelector } from "react-redux";

const PopupCardView = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="flex justify-center">
      {cartItems.length >= 1 && (
        <div className="w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[940px] 2xl:w-[850px]  -ml-2 sm:-ml-0  bg-green-700 h-14 flex justify-between items-center px-4 fixed bottom-16 sm:bottom-0 z-1000000">
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
