/* eslint-disable react/prop-types */

import MenuItemList from "./MenuItemList";
import PopupCategoryList from "../shared/PopupCategoryList";
import { useRef, useState } from "react";

const MenuCategoryList = ({ resMenuData, filterOption, resInformation }) => {
  const [showCategoryListPopup, setShowCategoryListPopup] = useState(false);
  const menuRef = useRef(null);

  return (
    <>
      <div className="mt-6">
        {resMenuData?.map((resMenu) => (
          <MenuItemList
            resMenu={resMenu?.card?.card}
            filterOption={filterOption}
            key={resMenu?.card?.card?.categoryId}
            resInformation={resInformation}
          />
        ))}
      </div>
      <div
        className="w-24 h-24 rounded-full bg-slate-700 fixed bottom-20 right-[22%] flex justify-center items-center"
        onClick={() => setShowCategoryListPopup(!showCategoryListPopup)}
        ref={menuRef}
      >
        Menu
      </div>
      <div>
        {showCategoryListPopup && (
          <div>
            <PopupCategoryList
              resMenuData={resMenuData}
              setShowCategoryListPopup={setShowCategoryListPopup}
              menuRef={menuRef}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MenuCategoryList;
