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
import updateCardItemAndFirestore from "../actions/updateCardItemAndFirestore";
import { addShowNavigation } from "../utils/configSlice";

const PopupCardMenu = ({
  searchDishesData,
  setShowMenuCardPopup,

  resInformation,
  counter,
  resId,

  onContinue,
  setShowPopupBeforeReset = false,
  showPopupBeforeReset = false,
  setShowAddToCardSearchResultsData,
  showAddToCardSearchResultsData,
  showMenuCardPopupBeforeUpdate,
  setShowMenuCardPopupBeforeUpdate,
  menuItem,
  userMenuItem,
  isCustomize,
  showSelectedCustomizeItems,
  // setSelectedItemForUpdate,
  // selectedItemForUpdate,

  // userMenuItem,
}) => {
  const [totalPrice, setTotalPrice] = useState(
    +searchDishesData?.info?.price / 100 ||
      +searchDishesData.menuPrice ||
      (+searchDishesData?.info?.defaultPrice || searchDishesData.defaultPrice) /
        100
  );

  const [totalFinalPrice, setTotalFinalPrice] = useState(
    +searchDishesData?.info?.finalPrice / 100 ||
      +searchDishesData?.finalPrice ||
      menuItem?.finalmenuPrice ||
      0
  );

  const dispatch = useDispatch();

  const [selectedAddons, setSelectedAddons] = useState(
    (showSelectedCustomizeItems
      ? menuItem?.selectedAddons || userMenuItem?.selectedAddons
      : {}) || {}
  );

  const [addonsList, setAddonsList] = useState([]);
  const [showCustomizedItems, setShowCustomizedItems] = useState(false);
  const [showAddons, setShowAddons] = useState(true);

  const resParamsObj = useSelector((store) => store?.search?.resParams);

  console.log(searchDishesData);

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

      if (totalFinalPrice > 0) {
        setTotalFinalPrice((prevValue) => prevValue + value);
      } else {
        setTotalFinalPrice((prevValue) => prevValue);
      }

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

      if (totalFinalPrice > 0) {
        setTotalFinalPrice((prevValue) => prevValue - value);
      }

      setTotalPrice((preValue) => preValue - value);

      setAddonsList((preArry) => preArry.filter((ele) => ele.name !== name));
    }
  };

  console.log(selectedAddons);

  const menuInfo = {
    menuId: searchDishesData?.info?.id || searchDishesData?.menuId,
    resId: resId,
    menuName: searchDishesData?.info?.name || searchDishesData?.menuName,

    vegClassifier:
      searchDishesData?.info?.isVeg === 1 || searchDishesData.isVeg === 1
        ? "VEG"
        : "NONVEG",

    menuPrice: totalPrice,

    // finalmenuPrice:
    //   ((searchDishesData?.info?.finalPrice ||
    //     searchDishesData?.finalmenuPrice) &&
    //     (searchDishesData?.info?.finalPrice ||
    //       searchDishesData?.finalmenuPrice) / 100) ||
    //   0,

    finalmenuPrice: totalFinalPrice,

    addons: searchDishesData?.info?.addons || searchDishesData?.addons || [],
  };

  console.log(searchDishesData?.addons);

  const previousCoustomizedItems = userMenuItem?.addonsList || [];

  const coustomizedItem =
    addonsList?.reduce((accu, item) => [...accu, item.name], []) || [];

  const coustomizedItems = [...previousCoustomizedItems, ...coustomizedItem];

  console.log(addonsList);
  console.log(coustomizedItems);

  const handleAddItemToCart = async (
    item,
    coustomizedItems,
    selectedAddons,
    // actionType = "Add",
    menuItem
  ) => {
    if (!isCustomize) {
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
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const newCartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          updatedCardInfo
        );

        if (window.innerWidth < 640 && location.pathname !== "/search") {
          const updateStore = {
            ...preservedMenuInfo,
            totalMenuItems: 1,
            userId: auth.currentUser.uid,
            addonsList: coustomizedItems,
            selectedAddons: selectedAddons,
          };

          dispatch(addResInfo(preservedResInfo)); // Update the restaurant info in Redux

          dispatch(addCartItems({ ...updateStore, newCartId }));
        }

        setShowMenuCardPopup(false);
        setShowPopupBeforeReset(false);

        dispatch(
          addResParams({
            resId: preservedResInfo?.restaurantId,
            menuId: preservedMenuInfo?.menuId,
          })
        );

        setShowAddToCardSearchResultsData(true);

        // dispatch(addShowNavigation(false));

        //
      } else if (
        showMenuCardPopupBeforeUpdate &&
        JSON.stringify(menuItem?.addonsList) !==
          JSON.stringify(coustomizedItems)
      ) {
        const updatedCardInfo = {
          // ...menuInfo,
          cartItems: menuInfo,
          resInfo: resInformation,
          totalMenuItems: 1,
          userId: auth.currentUser.uid,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const updateStore = {
          ...menuInfo,
          totalMenuItems: 1,
          userId: auth.currentUser.uid,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const cartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          updatedCardInfo
        );

        dispatch(addResInfo(resInformation));
        dispatch(addCartItems({ ...updateStore, cartId }));

        setShowMenuCardPopupBeforeUpdate(false);
        setShowMenuCardPopup();
      } else if (
        JSON.stringify(menuItem?.addonsList) !==
        JSON.stringify(coustomizedItems)
      ) {
        const updatedCardInfo = {
          // ...menuInfo,
          cartItems: menuInfo,
          resInfo: resInformation,
          totalMenuItems: 1,
          userId: auth.currentUser.uid,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const updateStore = {
          ...menuInfo,
          totalMenuItems: 1,
          userId: auth.currentUser.uid,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const cartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          updatedCardInfo
        );

        dispatch(addResInfo(resInformation));
        dispatch(addCartItems({ ...updateStore, cartId }));
        setShowMenuCardPopup();
        setShowMenuCardPopupBeforeUpdate(false);
      } else if (
        showMenuCardPopupBeforeUpdate &&
        JSON.stringify(menuItem?.addonsList) ===
          JSON.stringify(coustomizedItems)
      ) {
        dispatch(
          updateCardItemAndFirestore(
            {
              ...menuItem,
              totalMenuItems: item,
              addonsList: coustomizedItems,
              selectedAddons: selectedAddons,
            },
            "Add",
            menuItem?.cartId,
            coustomizedItems,
            selectedAddons
          )
        );

        setShowMenuCardPopupBeforeUpdate(false);
      } else {
        const updatedCardInfo = {
          // ...menuInfo,
          cartItems: menuInfo,
          resInfo: resInformation,
          totalMenuItems: item,
          userId: auth.currentUser.uid,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const updateStore = {
          ...menuInfo,
          totalMenuItems: item,
          userId: auth.currentUser.uid,
          addonsList: coustomizedItems,
          selectedAddons: selectedAddons,
        };

        const cartId = await createCartAndLinkToUser(
          auth?.currentUser?.uid,
          updatedCardInfo
        );
        dispatch(addResInfo(resInformation));
        dispatch(addCartItems({ ...updateStore, cartId }));

        setShowMenuCardPopup(false);

        setShowPopupBeforeReset(false);

        goToSearchResultsPage(resId, searchDishesData?.info?.id);
      }
    } else {
      dispatch(
        updateCardItemAndFirestore(
          {
            ...menuItem,
            totalMenuItems: menuItem?.totalMenuItems,
            menuPrice: totalPrice,
            finalmenuPrice: totalFinalPrice,
            addonsList: coustomizedItems,
            selectedAddons: selectedAddons,
          },

          "update",
          menuItem?.cartId,
          coustomizedItems,
          selectedAddons
        )
      );

      setShowMenuCardPopup(false);

      setShowMenuCardPopupBeforeUpdate(false);
    }

    // if (item === 0) {
    //   dispatch(removeCardItems(updatedCardInfo));
    //   await deleteMenutem(cartId);
    // }
  };

  const getSelectedItemCount = (groupId) => {
    const selectedItemCount = addonsList
      ?.map((item) => item.groupId)
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
      if (window.innerWidth < 640) {
        dispatch(addShowNavigation(false));
      }
      toast(`Add item to the card from ${resInformation.restaurantName}`);

      setShowAddToCardSearchResultsData(true);
      // dispatch(addShowNavigation(false));
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
      if (window.innerWidth < 640) {
        dispatch(addShowNavigation(false));
      }
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
        {searchDishesData?.info?.name || searchDishesData?.menuName} .{" "}
        <span>
          ₹
          {searchDishesData?.info?.price || searchDishesData?.menuPrice
            ? searchDishesData?.info?.price / 100 || searchDishesData?.menuPrice
            : searchDishesData?.info?.defaultPrice / 100}
        </span>
      </h2>
      <div className="absolute top-4 right-4">
        <div
          className="w-6 h-6 rounded-full bg-amber-600 flex justify-center items-center"
          onClick={() => {
            setShowMenuCardPopupBeforeUpdate(false);
            setShowMenuCardPopup();
            // setShowMenuCardPopup(false);
            setShowPopupBeforeReset(false);
          }}
        >
          <HiMiniXMark />
        </div>
      </div>
      <h1 className="font-bold text-2xl">Coutomise as per your test</h1>
      <div className="w-full h-[1px] bg-slate-600 mt-4"></div>

      <div className="overflow-y-auto hide-scrollbar max-h-[350px] ">
        {(searchDishesData?.info || searchDishesData)?.addons?.map(
          (group, index) => (
            <>
              <h2 className="py-4" key={index}>
                {/* {group?.groupName}(0/
              {group?.maxAddons === -1 ? "Optional" : group?.maxAddons}) */}
                {group?.groupName} (
                {group?.maxAddons === -1
                  ? "Optional"
                  : `${getSelectedItemCount(group?.groupId)} / ${
                      group?.maxAddons
                    }`}
                )
              </h2>
              <div className="p-2 bg-slate-900">
                {(showAddons
                  ? group?.choices?.slice(0, 5)
                  : group?.choices
                )?.map((item) => (
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
                          checked={!!selectedAddons[item?.id]}
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
                ))}
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
          )
        )}
      </div>

      {showCustomizedItems && (
        <>
          <div className="w-full sm:w-[570px] min-h-16 bg-slate-800 absolute bottom-24 flex items-center px-4 py-4 text-[14px]">
            {coustomizedItems?.slice().join(" . ")}
          </div>
          <div className="w-full sm:w-[570px] h-[1px] bottom-24 absolute bg-slate-700"></div>
        </>
      )}

      <div className="mt-7 flex justify-between items-center relative">
        <div className="flex flex-col">
          <div className="flex gap-3.5">
            {
              <span>
                ₹{getFormatedPrice(totalPrice || menuItem?.menuPrice)}
              </span>
            }
            {totalFinalPrice > 0 && (
              <div className="w-9 h-0.5 bg-slate-200 absolute bottom-8"></div>
            )}
            {totalFinalPrice > 0 && (
              <span>
                ₹
                {getFormatedPrice(
                  totalFinalPrice ||
                    menuItem?.finalmenuPrice ||
                    userMenuItem?.finalmenuPrice
                )}
              </span>
            )}
          </div>

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
              handleAddItemToCart(
                counter + 1,
                coustomizedItems || [],

                selectedAddons || {},
                menuItem
              );
            }}
          >
            {!isCustomize ? "Add Item to Cart" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCardMenu;
