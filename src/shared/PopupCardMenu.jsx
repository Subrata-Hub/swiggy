/* eslint-disable react/prop-types */
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCartItems, addResInfo, reSetStore } from "../utils/cartSlice";
const PopupCardMenu = ({
  searchDishesData,
  setShowMenuCardPopup,
  // handleShowMenuCardPopup,
  // setCounter,
  resInformation,
  counter,
  resId,
  setShowPopupBeforeReset,
  showPopupBeforeReset,
  // showMenuCardPopup,
  // onContinue,
}) => {
  const [totalPrice, setTotalPrice] = useState(
    +searchDishesData?.info?.price / 100 ||
      +searchDishesData?.info?.defaultPrice / 100
  );

  const dispatch = useDispatch();

  // const [showIndex, setShowIndex] = useState(0);

  // const [selectedRadioOption, setSelectedRadioOption] = useState({});
  const [selectedAddons, setSelectedAddons] = useState({});
  // const [addonsList, setAddonsList] = useState([]);
  // console.log(addonsList);

  // const addons = searchDishesData?.info?.addons?.[0]?.choices;

  // const handleIndex = () => {
  //   onContinue();
  //   if (
  //     showIndex + 1 >=
  //     searchDishesData?.info?.variantsV2?.variantGroups?.length
  //   ) {
  //     // onPopupClose();
  //   } else {
  //     setShowIndex((prevIndex) => prevIndex + 1);
  //   }
  // };

  // const handleRadioOption = (value) => {
  //   setSelectedRadioOption(value);
  // };

  // console.log(selectedRadioOption);

  const updateTotalPrice = (id, value, isChecked) => {
    setSelectedAddons((prevState) => ({ ...prevState, [id]: isChecked }));

    if (isChecked) {
      setTotalPrice((preValue) => preValue + value);
      // setAddonsList(addonsList.push(name));
    } else {
      setTotalPrice((preValue) => preValue + -value);
    }
  };

  const menuInfo = {
    menuId: searchDishesData?.info?.id,
    resId: resId,
    menuName: searchDishesData?.info?.name,
    vegClassifier: searchDishesData?.info?.itemAttribute?.vegClassifier,

    menuPrice: totalPrice,
  };

  const handleAddItemToCart = (item) => {
    if (showPopupBeforeReset) {
      counter = 0;
      dispatch(reSetStore());
      const updatedCardInfo = {
        ...menuInfo,
        totalMenuItems: item,
      };
      dispatch(addResInfo(resInformation));
      dispatch(addCartItems(updatedCardInfo));
      setShowPopupBeforeReset(false);
      setShowMenuCardPopup(false);
    } else {
      const updatedCardInfo = {
        ...menuInfo,
        totalMenuItems: item,
      };
      dispatch(addResInfo(resInformation));
      dispatch(addCartItems(updatedCardInfo));
      setShowPopupBeforeReset(false);
      setShowMenuCardPopup(false);
    }
  };
  return (
    <div className="w-[600px] h-auto bg-slate-800 fixed z-[11999] top-15 right-[30%] rounded-3xl p-4 ">
      <h2 className="mt-2">
        {searchDishesData?.info?.name} .{" "}
        <span>
          ₹
          {searchDishesData?.info?.price
            ? searchDishesData?.info?.price / 100
            : searchDishesData?.info?.defaultPrice / 100}
        </span>
      </h2>
      <div className="absolute top-0 right-0">
        <div
          className="w-6 h-6 rounded-full bg-amber-500 flex justify-center items-center"
          onClick={() => (
            setShowMenuCardPopup(false), setShowPopupBeforeReset(false)
          )}
        >
          <HiMiniXMark />
        </div>
      </div>
      <h1 className="font-bold text-2xl">Coutomise as per your test</h1>
      <div className="w-full h-[1px] bg-slate-600 mt-4"></div>

      <div className="overflow-y-auto hide-scrollbar max-h-[400px]">
        {searchDishesData?.info?.addons?.map((group) => (
          <>
            <h2 className="py-4" key={group?.id}>
              {/* {group?.groupName}(0/
              {group?.maxAddons === -1 ? "Optional" : group?.maxAddons}) */}
              {group?.groupName} (
              {group?.maxAddons === -1 ? "Optional" : `0 / ${group?.maxAddons}`}
              )
            </h2>
            <div className="p-2 bg-slate-900">
              {group?.choices?.map((item) => (
                <div key={item?.id}>
                  <div className="flex justify-between px-1 py-2">
                    <div className="flex gap-3">
                      <div>
                        {item?.isVeg === 1 ? (
                          <img src={veg} />
                        ) : (
                          <img src={nonVeg} />
                        )}
                      </div>
                      <div>{item?.name}</div>
                    </div>
                    <div className="flex gap-3">
                      {item?.price && <p>+ ₹ {item?.price / 100}</p>}
                      <input
                        type="checkbox"
                        checked={!!selectedAddons[item.id]}
                        onChange={(e) => {
                          updateTotalPrice(
                            item?.id,
                            // item?.name,
                            item?.price / 100,
                            e.target.checked
                          );
                          // setAddonsList(addonsList.push(item?.name));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>{<span>₹{totalPrice}</span>}</div>
        <div>
          <button
            className="px-15 py-3 bg-emerald-600 rounded-2xl"
            onClick={() => handleAddItemToCart(counter + 1)}
          >
            Add Item to Cart
          </button>
        </div>
      </div>

      {/* <div className="overflow-y-auto hide-scrollbar max-h-[400px]">
        {searchDishesData?.info?.variantsV2?.variantGroups?.map(
          (variant, index) => (
            <div key={index}>
              {index === showIndex && (
                <>
                  <h2 className="py-4" key={variant?.name}>
                    {variant?.name}
                  </h2>
                  <div className="p-2 bg-slate-900">
                    {variant?.variations?.map((item) => (
                      <div key={item?.id}>
                        <div className="flex justify-between px-1 py-2">
                          <div className="flex gap-3">
                            <div>
                              {item?.isVeg === 1 ? (
                                <img src={veg} />
                              ) : (
                                <img src={nonVeg} />
                              )}
                            </div>
                            <div>{item?.name}</div>
                          </div>
                          <div className="flex gap-3">
                            {item?.price && <p>₹{item.price}</p>}
                            <input
                              type="radio"
                              name={variant?.name}
                              // value={item?.name}
                              // id={item?.id}
                              checked={
                                selectedRadioOption?.variationId === item?.id
                              }
                              onChange={() =>
                                handleRadioOption(item?.dependantVariation)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      Step {showIndex + 1}/
                      {searchDishesData?.info?.variantsV2?.variantGroups.length}
                    </div>
                    <div>
                      <button
                        className="px-15 py-3 bg-emerald-600 rounded-2xl"
                        onClick={handleIndex}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div> */}
    </div>
  );
};

export default PopupCardMenu;
