/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import updateCardItemAndFirestore from "../actions/updateCardItemAndFirestore";

const PopupUpdateCard = ({
  setShowPopupBeforeUpdate,
  // setSelectedItemForUpdate,
  menuInfo,
  menuItem,
  userMenuItem,
  // counter,

  setShowMenuCardPopupBeforeUpdate,
  // cartIdForRepetItem,
}) => {
  const dispatch = useDispatch();

  const updatingCardItem = async (
    item,
    action,
    cartId,
    coustomizedItems,
    selectedAddons
  ) => {
    dispatch(
      updateCardItemAndFirestore(
        {
          ...item,
          totalMenuItems: item?.totalMenuItems + 1,
          menuPrice: item.menuPrice,
          finalmenuPrice: item.finalmenuPrice,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        },

        action,
        cartId,
        coustomizedItems,
        selectedAddons
      )
    );

    setShowPopupBeforeUpdate(false);

    // if (item === 0) {
    //   dispatch(removeCardItems(updatedCardInfo));
    //   await deleteMenutem(cartId);
    // }
  };

  const handleShowPopupCardMenu = () => {
    setShowMenuCardPopupBeforeUpdate(true);
    setShowPopupBeforeUpdate(false);

    // setShowPopupBeforeReset(false);
  };
  return (
    <div className="w-full sm:w-[600px] h-auto p-[20px] sm:p-[30px] bg-slate-800 fixed z-[119996552255255] bottom-60 sm:bottom-36 md:bottom-15 right-[0%] sm:right-[10%] md:right-[18%] lg:right-[25%] xl:right-[30%] 2xl:right-[35%] rounded-3xl">
      <div className="flex flex-col gap-4">
        <div>
          <p className="">{menuInfo.menuName}</p>
        </div>
        <h1 className="font-bold text-[22px]">
          Repeat previous customisation?
        </h1>
        {(menuItem || userMenuItem)?.addonsList?.length > 0 && (
          <div className="w-full py-6 bg-slate-900 flex items-center px-2">
            {(menuItem || userMenuItem)?.addonsList?.slice().join(" . ")}
          </div>
        )}
        <div className="flex justify-between items-center mt-2">
          <button
            className="w-[220px] h-[50px] bg-slate-600"
            onClick={handleShowPopupCardMenu}
            // ref={addonButtonRef}
          >
            I&apos;ll Choose
          </button>
          <button
            className="w-[220px] h-[50px] bg-green-500"
            onClick={() => {
              updatingCardItem(
                menuItem,
                // (menuItem || userMenuItem)?.totalMenuItems + 1,
                "Add",
                menuItem?.cartId || userMenuItem?.cartId,
                // cartIdForRepetItem
                menuItem?.addonsList || userMenuItem?.addonsList,
                menuItem?.selectedAddons || userMenuItem?.selectedAddons
              );
            }}
          >
            Repeat Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupUpdateCard;
