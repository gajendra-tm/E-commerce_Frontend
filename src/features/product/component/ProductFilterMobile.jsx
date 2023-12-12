import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";

const staggerMobileItems = stagger(0.01, { startDelay: 0.1 });

//sort animation
function useSortAnimation(sortIsOpen) {
  const [sortscope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: sortIsOpen ? 360 : 0 }, { duration: 0.3 });

    animate(
      "ul",
      {
        clipPath: sortIsOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(100% 0% 0% 0% round 0px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      sortIsOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: sortIsOpen ? staggerMobileItems : 0,
      }
    );
  }, [sortIsOpen]);

  return sortscope;
}

//filter animation
function useFilterAnimation(filterIsOpen) {
  const [filterscope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "#filter_animation",
      {
        clipPath: filterIsOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(100% 0% 0% 0% round 0px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "input,label",
      filterIsOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: filterIsOpen ? staggerMobileItems : 0,
      }
    );
  }, [filterIsOpen]);

  return filterscope;
}

export default function ProductFilterMobile({ propsList }) {
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const sortscope = useSortAnimation(sortIsOpen);
  const filterscope = useFilterAnimation(filterIsOpen);

  return (
    <>
      <div className="fixed block sm:hidden z-50 bottom-0 left-0 w-full h-12 bg-red-600">
        <div className="flex justify-evenly relative w-full h-full items-center">
          <div ref={sortscope}>
            <div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setSortIsOpen(!sortIsOpen)}
              >
                Sort
                <svg
                  className="inline-block arrow"
                  style={{ transformOrigin: "50% 55%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  width="25"
                  height="25"
                >
                  <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
                </svg>
              </motion.button>
            </div>
            <ul
              style={{
                pointerEvents: sortIsOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
              }}
              onClick={() => setSortIsOpen(!sortIsOpen)}
              className="flex flex-col justify-center overflow-hidden absolute z-10 left-0 bottom-0 w-full p-2 box-border bg-gray-800 font-medium text-white drop-shadow-2xl text-lg leading-loose"
            >
              <span className=" h-5 flex justify-end items-end">
                <svg
                  onClick={() => setSortIsOpen(!sortIsOpen)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                </svg>
              </span>
              {propsList.sortOptions.map((sortOption, sortIndex) => {
                return (
                  <li
                    key={sortIndex}
                    onClick={(e) => propsList.handleSort(e, sortOption)}
                    className="hover:text-gray-400 rounded-lg px-2 cursor-pointer w-full"
                  >
                    {sortOption.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="inline-block" ref={filterscope}>
            <div className="ml-0 sm:ml-48">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="text-base sm:text-xl"
                onClick={() => setFilterIsOpen(!filterIsOpen)}
              >
                Filter
                <svg
                  className="inline ml-1"
                  style={{ transformOrigin: "50% 55%" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 28"
                  width="20"
                  height="20"
                >
                  <path d="M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.4037 6L11 12.8944V20H13V12.8944L17.5963 6H6.4037Z"></path>
                </svg>
              </motion.button>
            </div>
            <div
              style={{
                pointerEvents: filterIsOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
              }}
              id="filter_animation"
              className="absolute bottom-0 left-0 h-screen overflow-x-auto p-1  bg-gray-800 w-full text-white"
            >
              <span className=" h-6 flex justify-end items-end invert">
                <svg
                  onClick={() => setFilterIsOpen(!filterIsOpen)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                </svg>
              </span>
              {propsList.filters.map((section) => {
                return (
                  <span
                    className="flex flex-col px-9 w-full mb-5"
                    key={section.id}
                  >
                    <span className="font-medium border-t-2 border-gray-300 text-gray-200">
                      {section.name}
                    </span>
                    <div>
                      {section.options.map((option, optionIdx) => {
                        return (
                          <div
                            key={option.value}
                            className="flex justify-start items-center w-40"
                          >
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={section.name}
                              type="checkbox"
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              onChange={(e) =>
                                propsList.handleFilter(e, section, option)
                              }
                              className="h-4 w-4 rounded border-gray-300  focus:ring-2 ring-blue-500 ring-offset-2"
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}`}
                              className="ml-3 text-sm truncate  text-gray-100 leading-6 font-medium"
                            >
                              {option.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
