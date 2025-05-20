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
        className="w-15 sm:w-20 h-15 sm:h-20 rounded-full bg-slate-700 fixed bottom-32 sm:bottom-20 right-[8%] sm:right-[8%] md:right-[6%] lg:right-[10%] xl:right-[20%] 2xl:right-[26%] flex justify-center items-center z-[20000000]"
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
