/* eslint-disable react/prop-types */
import veg from "../assets/veg.svg";
import nonVeg from "../assets/nonVeg.svg";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, addResInfo, reSetStore } from "../utils/cartSlice";
import { getFormatedPrice } from "../utils/constant";

import { toast } from "react-toastify";

import { addResParams } from "../utils/searchSlice";
import createCartAndLinkToUser from "../actions/createCartAndLinkToUser";
import { auth } from "../utils/firebase";
import deleteAllUserCarts from "../actions/deleteAllUserCarts";

const PopupCardMenu = ({
  searchDishesData,
  setShowMenuCardPopup,

  resInformation,
  counter,
  resId,
  setShowPopupBeforeReset,
  showPopupBeforeReset,

  onContinue,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,
}) => {
  const [totalPrice, setTotalPrice] = useState(
    +searchDishesData?.info?.price / 100 ||
      +searchDishesData?.info?.defaultPrice / 100
  );

  const dispatch = useDispatch();

  // const [showIndex, setShowIndex] = useState(0);

  // const [selectedRadioOption, setSelectedRadioOption] = useState({});
  const [selectedAddons, setSelectedAddons] = useState({});

  const [addonsList, setAddonsList] = useState([]);
  const [showCustomizedItems, setShowCustomizedItems] = useState(false);
  const [showAddons, setShowAddons] = useState(true);

  const resParamsObj = useSelector((store) => store?.search?.resParams);

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

  const updateTotalPrice = (
    groupId,
    groupName,
    maxAddons,
    id,
    name,
    value,
    isChecked
  ) => {
    const selectedCount = getSelectedItemCount(groupId);

    if (isChecked) {
      // Prevent adding if maxAddons is reached
      if (selectedCount >= maxAddons && maxAddons !== -1) {
        toast(`You can select a maximum of ${maxAddons} for ${groupName}`);
        return;
      }

      setSelectedAddons((prevState) => ({
        ...prevState,
        [id]: true,
      }));

      setTotalPrice((prevValue) => prevValue + value);
      setAddonsList((preArry) => [
        ...preArry,
        { name: name, groupId: groupId },
      ]);
    } else {
      // Allow removing the item
      setSelectedAddons((prevState) => ({
        ...prevState,
        [id]: false,
      }));

      setTotalPrice((preValue) => preValue - value);
      setAddonsList((preArry) => preArry.filter((ele) => ele.name !== name));
    }
  };

  const menuInfo = {
    menuId: searchDishesData?.info?.id,
    resId: resId,
    menuName: searchDishesData?.info?.name,

    vegClassifier: searchDishesData?.info?.isVeg === 1 ? "VEG" : "NONVEG",

    menuPrice: totalPrice,
  };

  const handleAddItemToCart = async (item) => {
    if (showPopupBeforeReset) {
      counter = 0;

      // Save previous cart info
      const preservedMenuInfo = { ...menuInfo };
      const preservedResInfo = { ...resInformation };
      await deleteAllUserCarts(auth?.currentUser?.uid);
      dispatch(reSetStore());
      const updatedCardInfo = {
        // ...preservedMenuInfo,
        cartItems: preservedMenuInfo,
        resInfo: preservedResInfo,
        totalMenuItems: item,
        userId: auth.currentUser.uid,
      };

      await createCartAndLinkToUser(auth?.currentUser?.uid, updatedCardInfo);

      setShowPopupBeforeReset(false);
      setShowMenuCardPopup(false);
      setShowAddToCardSearchResultsData(true);
      dispatch(
        addResParams({
          resId: preservedResInfo?.restaurantId,
          menuId: preservedMenuInfo?.menuId,
        })
      );
    } else {
      const updatedCardInfo = {
        // ...menuInfo,
        cartItems: menuInfo,
        resInfo: resInformation,
        totalMenuItems: item,
        userId: auth.currentUser.uid,
      };

      const updateStore = {
        ...menuInfo,
        totalMenuItems: item,
        userId: auth.currentUser.uid,
      };

      const cartId = await createCartAndLinkToUser(
        auth?.currentUser?.uid,
        updatedCardInfo
      );
      dispatch(addResInfo(resInformation));
      dispatch(addCartItems({ ...updateStore, cartId }));

      setShowPopupBeforeReset(false);
      setShowMenuCardPopup(false);

      goToSearchResultsPage(resId, searchDishesData?.info?.id);
    }
  };

  const coustomizedItems = addonsList.reduce(
    (accu, item) => [...accu, item.name],
    []
  );

  const getSelectedItemCount = (groupId) => {
    const selectedItemCount = addonsList
      .map((item) => item.groupId)
      .filter((item) => item === groupId).length;

    return selectedItemCount;
  };

  const goToSearchResultsPage = (resId, menuId) => {
    if (!resParamsObj?.resId && !resParamsObj?.menuId) {
      console.log("xyz");
      dispatch(
        addResParams({
          resId: resId,
          menuId: menuId,
        })
      );
      toast(`Add item to the card from ${resInformation.restaurantName}`);
      setShowAddToCardSearchResultsData(true);
    } else if (
      !showAddToCardSearchResultsData &&
      resParamsObj?.resId &&
      resParamsObj?.menuId
    ) {
      console.log("abc");
      dispatch(
        addResParams({
          resId: resId,
          menuId: menuId,
        })
      );
      toast(`Add item to the card from ${resInformation.restaurantName}`);

      setShowAddToCardSearchResultsData(true);
    } else if (
      showAddToCardSearchResultsData &&
      resParamsObj?.resId &&
      resParamsObj?.menuId
    ) {
      console.log("pqr");
      return;
    }
  };

  return (
    <div className=" w-full sm:w-[500px] md:sm:w-[600px] h-auto bg-slate-800 fixed  z-[819999999335588888556555555]  top-20 sm:top-28 md:top-28 lg:top-28 xl:top-24 right-[0%] sm:right-[10%] md:right-[10%] lg:right-[20%] xl:right-[25%] 2xl:right-[30%] shadow-md shadow-slate-700 rounded-3xl p-4 ">
      <h2 className="mt-2">
        {searchDishesData?.info?.name} .{" "}
        <span>
          ₹
          {searchDishesData?.info?.price
            ? searchDishesData?.info?.price / 100
            : searchDishesData?.info?.defaultPrice / 100}
        </span>
      </h2>
      <div className="absolute top-4 right-4">
        <div
          className="w-6 h-6 rounded-full bg-amber-600 flex justify-center items-center"
          onClick={() => (
            setShowMenuCardPopup(false), setShowPopupBeforeReset(false)
          )}
        >
          <HiMiniXMark />
        </div>
      </div>
      <h1 className="font-bold text-2xl">Coutomise as per your test</h1>
      <div className="w-full h-[1px] bg-slate-600 mt-4"></div>

      <div className="overflow-y-auto hide-scrollbar max-h-[350px] ">
        {searchDishesData?.info?.addons?.map((group, index) => (
          <>
            <h2 className="py-4" key={index}>
              {/* {group?.groupName}(0/
              {group?.maxAddons === -1 ? "Optional" : group?.maxAddons}) */}
              {group?.groupName} (
              {group?.maxAddons === -1
                ? "Optional"
                : `${getSelectedItemCount(group.groupId)} / ${
                    group?.maxAddons
                  }`}
              )
            </h2>
            <div className="p-2 bg-slate-900">
              {(showAddons ? group?.choices?.slice(0, 5) : group?.choices)?.map(
                (item) => (
                  <div key={item?.id}>
                    <div
                      className={`flex justify-between px-1 py-2 ${
                        item?.inStock !== 1 ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div>
                          {item?.isVeg === 1 ? (
                            <img src={veg} loading="lazy" />
                          ) : (
                            <img src={nonVeg} loading="lazy" />
                          )}
                        </div>
                        <div>{item?.name}</div>
                      </div>
                      <div className="flex gap-3">
                        {item?.price && <p>+ ₹ {item?.price / 100}</p>}

                        <input
                          type="checkbox"
                          checked={!!selectedAddons[item.id]}
                          // disabled={
                          //   (group?.maxAddons === 1 &&
                          //     getSelectedItemCount(group?.groupId) >= 1 &&
                          //     !selectedAddons[item.id]) ||
                          //   item.inStock !== 1
                          // }

                          disabled={item.inStock !== 1}
                          onChange={
                            (e) =>
                              updateTotalPrice(
                                group?.groupId,
                                group?.groupName,
                                group?.maxAddons,
                                item?.id,
                                item?.name,
                                item?.price / 100 || 0,

                                e.target.checked
                                // e.target.disabled
                              )
                            // setAddonsList(addonsList?.push(item?.name))
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
              {showAddons && (
                <button
                  className="pl-10 pt-2 opacity-80"
                  onClick={() => {
                    setShowAddons(false);
                    onContinue();
                  }}
                >
                  {group?.choices.length > 5 && <span>+ </span>}
                  {group?.choices.length > 5
                    ? group?.choices.length - 5
                    : ""}{" "}
                  {group?.choices.length > 5 && <span>more</span>}
                </button>
              )}
            </div>
          </>
        ))}
      </div>

      {showCustomizedItems && (
        <>
          <div className="w-full sm:w-[570px] min-h-16 bg-slate-800 absolute bottom-24 flex items-center px-4 py-4 text-[14px]">
            {coustomizedItems.slice().join(" . ")}
          </div>
          <div className="w-full sm:w-[570px] h-[1px] bottom-24 absolute bg-slate-700"></div>
        </>
      )}

      <div className="mt-7 flex justify-between items-center relative">
        <div className="flex flex-col">
          {<span>₹{getFormatedPrice(totalPrice)}</span>}
          <button
            onClick={() => setShowCustomizedItems(!showCustomizedItems)}
            className="text-[14.5px] text-orange-500 font-bold"
          >
            {showCustomizedItems
              ? "Hide Coutomized Item"
              : "Show Coutomized Item"}
          </button>
        </div>
        <div>
          <button
            className="px-8 sm:px-15 py-2 sm:py-3 bg-emerald-600 rounded-2xl"
            onClick={() => {
              handleAddItemToCart(counter + 1);
            }}
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
