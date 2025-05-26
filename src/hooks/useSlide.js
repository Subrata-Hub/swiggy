import { useEffect, useState } from "react";

const useSlide = (listRef, noToShiftCart, gapWidth) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);

  // Effect to calculate and update maxSlide
  useEffect(() => {
    if (listRef.current) {
      const totalItems = listRef.current.querySelectorAll(".slide").length;
      // Calculate maxSlide based on total items and items per shift
      // This ensures we only allow slides up to the point where the last item is visible
      const newMaxSlide = Math.ceil(totalItems / noToShiftCart) - 1; // Subtract 1 because currentSlide is 0-indexed
      setMaxSlide(Math.max(0, newMaxSlide)); // Ensure maxSlide is not negative
    }
  }, [listRef, noToShiftCart, listRef?.current?.children.length]); // Depend on listRef.current.children.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : prev));
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    if (listRef.current && listRef.current.children.length > 0) {
      // Get the width of a single item (including margins/gaps if any)
      // You might need to adjust this based on your actual CSS for gap
      const itemWidth = listRef.current.children[0].offsetWidth;
      console.log(listRef.current?.getBoundingClientRect());

      // Assuming sm:gap-4 translates to 16px. Adjust as needed.
      const totalItemWidth = itemWidth + gapWidth;

      // Calculate the total shift needed based on the number of items to shift

      listRef.current.style.transform = `translateX(-${
        currentSlide * totalItemWidth * noToShiftCart
      }px)`;
      console.log(
        (listRef.current.style.transform = `translateX(-${
          currentSlide * totalItemWidth * noToShiftCart
        }px)`)
      );
    }
  }, [currentSlide, listRef, noToShiftCart, gapWidth]); // Add noToShiftCart as dependency

  return { nextSlide, previousSlide, currentSlide, maxSlide };
};

export default useSlide;
