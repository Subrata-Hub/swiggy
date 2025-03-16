import { useRef } from "react";

import useMenuCategoryClick from "../hooks/useMenuCategoryClick";
import useOutSideClick from "../hooks/useOutsideClick";

/* eslint-disable react/prop-types */
const PopupCategoryList = ({
  resMenuData,
  setShowCategoryListPopup,
  menuRef,
}) => {
  const category_list_ref = useRef(null);

  useMenuCategoryClick(category_list_ref);

  useOutSideClick(
    category_list_ref,
    () => {
      setShowCategoryListPopup(false);
    },
    menuRef
  );

  return (
    <div className="w-[520px] h-auto p-[30px] bg-slate-700 fixed z-[11999] bottom-15 right-[30%] rounded-3xl ">
      <div
        className="overflow-y-auto hide-scrollbar max-h-[350px] category_list"
        ref={category_list_ref}
      >
        {resMenuData?.map((item, index) => (
          <div
            className="flex justify-between pb-4 category"
            aria-label={`Category-${item?.card?.card?.title}`}
            key={index}
            data-categoryid={`${item?.card?.card?.categoryId}`}
          >
            <div>{item?.card?.card?.title}</div>
            <div>
              {item?.card?.card?.itemCards?.length > 0 &&
                item?.card?.card?.itemCards?.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupCategoryList;
