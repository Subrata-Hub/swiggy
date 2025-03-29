import { useRef } from "react";

import useMenuCategoryClick from "../hooks/useMenuCategoryClick";
import useOutSideClick from "../hooks/useOutsideClick";

/* eslint-disable react/prop-types */
const PopupCategoryList = ({
  resMenuData,
  setShowCategoryListPopup,
  menuRef,
}) => {
  console.log(resMenuData);
  const category_list_ref = useRef(null);

  useMenuCategoryClick(category_list_ref, () =>
    setShowCategoryListPopup(false)
  );

  useOutSideClick(
    category_list_ref,
    () => {
      setShowCategoryListPopup(false);
    },
    menuRef
  );

  const getNestedMenuLength = (categories) => {
    const nestedMenuLength = categories
      ?.map((subMenu) => subMenu?.itemCards)
      .map((item) => item?.length)
      .reduce((acc, item) => (acc += item), 0);

    return nestedMenuLength;
  };

  return (
    <div className="w-[520px] h-auto p-[30px] bg-slate-700 fixed z-[11999] bottom-15 right-[30%] rounded-3xl ">
      <div
        className="overflow-y-auto hide-scrollbar max-h-[350px] category_list"
        ref={category_list_ref}
      >
        {resMenuData?.map((item, index) => (
          <div
            className="flex justify-between pb-4 category cursor-pointer"
            aria-label={`Category-${item?.card?.card?.title}`}
            key={index}
            data-categoryid={`${item?.card?.card?.categoryId}`}
          >
            <div>{item?.card?.card?.title}</div>
            <div>
              {item?.card?.card?.itemCards?.length > 0 &&
                item?.card?.card?.itemCards?.length}
            </div>
            {item?.card?.card?.categories && (
              <div>{getNestedMenuLength(item?.card?.card?.categories)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupCategoryList;
