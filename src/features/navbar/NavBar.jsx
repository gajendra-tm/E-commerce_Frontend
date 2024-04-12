import React, { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../cart/cartSlice";
import { Zoom, toast } from "react-toastify";
import { selectUserInfo } from "../user/userSlice";

const navLists = [
  { name: "Products", href: "/", user: true },
  { name: "Products", href: "/admin", admin: true },
  { name: "Orders", href: "/admin/admin-order", admin: true },
];

const userMenu = [
  { name: "My Profile", href: "/my-profile" },
  { name: "My Orders", href: "/my-orders" },
  { name: "Sign out", href: "/signout" },
];

const staggerWebItems = stagger(0.01, { startDelay: 0.1 });

// for the animation
const Path = (props) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
);

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (scope.current) {
      const menuAnimations = isOpen
        ? [
            [
              "div",
              { transform: "translateX(0%)" },
              { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.3 },
            ],
            [
              "li",
              { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
              { delay: stagger(0.05), at: "-0.2" },
            ],
          ]
        : [
            [
              "li",
              { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
              { delay: stagger(0.05, { from: "last" }), at: "<" },
            ],
            ["div", { transform: "translateX(100%)" }, { at: "-0.6" }],
          ];

      animate([
        [
          "path.top",
          { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
          { at: "<" },
        ],
        ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
        [
          "path.bottom",
          { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
          { at: "<" },
        ],
        ...menuAnimations,
      ]);
    }
  }, [isOpen,animate, scope]);

  return scope;
}

function useUserAnimation(userIsOpen) {
  const [userScope, animate] = useAnimate();

  useEffect(() => {
    if (userScope.current) {
      const animation = async () => {
        await animate(
          "ul",
          {
            clipPath: userIsOpen
              ? "inset(0% 0% 0% 0% round 10px)"
              : "inset(10% 50% 90% 50% round 10px)",
          },
          {
            type: "spring",
            bounce: 0.1,
            duration: 0.2,
          }
        );

        await animate(
          "li",
          userIsOpen
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
          {
            duration: 0,
            delay: userIsOpen ? staggerWebItems : 0,
          }
        );
      };
      animation();
    }
  }, [userIsOpen, animate, userScope]);

  return userScope;
}

export default function NavBar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userIsOpen, setUserIsOpen] = useState(false);
  const userScope = useUserAnimation(userIsOpen);
  const scope = useMenuAnimation(isOpen);
  const cartItems = useSelector(selectCartItems);
  const userInfo = useSelector(selectUserInfo);

  const notify = () => {
    cartItems.length === 0
      ? toast.warning("Cart is empty", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        })
      : "null";
  };

  return (
    <>
      {userInfo && (
        <div className=" flex flex-col border-2 max-w-full min-h-full">
          <nav className="flex max-w-full z-20 md:z-10 h-12 sm:h-16 p-1 box-content justify-between items-center bg-gray-800 fixed top-0 left-0 right-0">
            <div className="h-12 w-12 sm:h-14 sm:w-14 ml-10 rounded-full bg-white">
              <Link to="/">
                <img
                  className="h-full w-full object-cover object-center"
                  src="/images/cart-logo.png"
                  alt="logo"
                />
              </Link>
            </div>

            {/* web layout */}
            <div className="hidden sm:block min-w-96 h-14 text-base text-gray-300">
              <ul className="flex items-center min-w-96 h-14 text-base text-gray-300">
                {navLists.map((navList) =>
                  navList[userInfo.role] ? (
                    <li
                      className=" flex items-center px-4 h-8 rounded-lg hover:bg-gray-600 "
                      key={navList.name}
                    >
                      <Link to={navList.href}>{navList.name}</Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <div
              className=" flex justify-between items-center relative w-20 h-14 ml-auto sm:ml-0 mr-5 sm:mr-10"
              ref={userScope}
            >
              <Link onClick={notify} to="/cart">
                <span>
                  <svg
                    className="invert"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                  </svg>
                  {cartItems && (
                    <span className="text-center absolute box-content rounded-full top-1.5 right-10 w-5 h-5 z-10 bg-red-500 text-sm font-medium text-gray-100 ">
                      {cartItems.length}
                    </span>
                  )}
                </span>
              </Link>
              <motion.button
                initial={false}
                whileTap={{ scale: 0.97 }}
                onClick={() => setUserIsOpen(!userIsOpen)}
                className="text-gray-300 ml-8 text-base font-medium"
              >
                User
              </motion.button>
              <ul
                style={{
                  pointerEvents: userIsOpen ? "auto" : "none",
                  clipPath: "inset(10% 50% 90% 50% round 10px)",
                }}
                className=" bg-gray-800 text-gray-300 top-14 md:top-16 left-3 w-28 h-fit p-2 absolute"
                onClick={() => setUserIsOpen(!userIsOpen)}
              >
                {userMenu.map((menu, menuIdx) => {
                  return (
                    <li
                      key={menuIdx}
                      className="flex flex-col items-center rounded-md w-full hover:bg-gray-500"
                    >
                      <Link to={menu.href}>{menu.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* mobile layout */}
            <div className="sm:hidden relative mr-10" ref={scope}>
              <button className="flex" onClick={() => setIsOpen(!isOpen)}>
                <svg width="23" height="18" viewBox="0 0 23 18">
                  <Path
                    d="M 2 2.5 L 20 2.5"
                    className="top"
                    variants={{
                      closed: { d: "M 2 2.5 L 20 2.5" },
                      open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                  />
                  <Path
                    d="M 2 9.423 L 20 9.423"
                    opacity="1"
                    className="middle"
                  />
                  <Path
                    d="M 2 16.346 L 20 16.346"
                    className="bottom"
                    variants={{
                      closed: { d: "M 2 16.346 L 20 16.346" },
                      open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                  />
                </svg>
              </button>
              <div className="flex justify-start absolute px-4 top-9 -right-11 bg-gray-800 shadow-lg text-white text-lg leading-10 font-medium w-48 min-h-full">
                <ul>
                  {navLists.map((navList) =>
                    navList[userInfo.role] ? (
                      <li className=" hover:text-gray-400 " key={navList.name}>
                        <Link to={navList.href}>{navList.name}</Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          </nav>
          <header className="  px-2 shadow-xl mt-14 border-b-2 border-gray-400 sm:mt-20 h-9 sm:h-11 flex">
            <h1 className=" flex items-start text-2xl font-bold">E-commerce</h1>
          </header>
          <main className=" bg-gray-300 min-h-full left-0 p-1 md:p-5">
            <div className=" bg-white sm:p-5 min-h-full rounded-lg">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
