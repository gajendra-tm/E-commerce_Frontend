import React,{useState,useEffect} from 'react';
import { useAnimate, stagger, motion } from "framer-motion";

const staggerWebItems = stagger(0.01, { startDelay: 0.1 });

//sort animation
function useSortAnimation(sortIsOpen) {
    const [sortScope, animate] = useAnimate();
  
    useEffect(() => {
      animate(".arrow", { rotate: sortIsOpen ? 360 : 0 }, { duration: 0.3 });
  
      animate(
        "ul",
        {
          clipPath: sortIsOpen
            ? "inset(0% 0% 0% 0% round 10px)"
            : "inset(10% 50% 90% 50% round 10px)",
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
          delay: sortIsOpen ? staggerWebItems : 0,
        }
      );
    }, [sortIsOpen,animate]);
  
    return sortScope;
  }

export default function ProductSortWeb({propsList}) {
    const [sortIsOpen, setSortIsOpen] = useState(false);
    const sortScope = useSortAnimation(sortIsOpen);
    
  return (
    <>
    <div className="hidden sm:block sm:text-xl relative" ref={sortScope}>
            <div className="flex justify-end">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setSortIsOpen(!sortIsOpen)}
              >
                Sort
                <svg
                  className="inline-block sm:ml-2 arrow"
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
              className="flex flex-col justify-center items-center absolute top-8 right-3 w-48 p-2 box-content border-2 bg-white drop-shadow-2xl rounded-lg text-lg leading-loose"
            >
              {propsList.sortOptions.map((sortOption, sortIndex) => {
                return (
                  <li
                    key={sortIndex}
                    onClick={(e) => propsList.handleSort(e, sortOption)}
                    className="hover:bg-gray-100 rounded-lg px-2 cursor-pointer w-full"
                  >
                    {sortOption.name}
                  </li>
                );
              })}
            </ul>
          </div>
    </>
  )
}
