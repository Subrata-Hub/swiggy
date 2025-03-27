/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useMenuCategoryClick = (ref, callback) => {
  useEffect(() => {
    const category_list_ele = ref.current;
    if (category_list_ele) {
      const handleClick = (e) => {
        // e.preventDefault();

        const categoryDiv = e.target.closest(".category"); // Get the closest element with class "category"

        if (categoryDiv) {
          const id = categoryDiv.dataset.categoryid;
          document
            .querySelector(`.category--${id}`)
            .scrollIntoView({ behavior: "smooth" });
        }
        callback();
      };
      category_list_ele.addEventListener("click", handleClick);

      return () => category_list_ele.removeEventListener("click", handleClick);
    }
  }, [ref]);
};

export default useMenuCategoryClick;
