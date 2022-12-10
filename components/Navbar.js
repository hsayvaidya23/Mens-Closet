import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  subTotal,
  clearCart,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const router = useRouter();
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ["/checkout", "/order", "/orders", "/myaccount","/login","/signup"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const ref = useRef();
  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };

  return (
    <>
      {!sidebar && (
        <span onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }} className="fixed top-4 right-10 cursor-pointer z-30 ">
          {dropdown && (
            <div
              
              className="absolute right-5 bg-white shadow-lg border top-5 py-4 rounded-md px-5 w-32 z-30"
            >
              <ul>
                <Link href={"/myaccount"}>
                  <a>
                    <li className="py-1 hover:text-violet-700 text-sm font-bold">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href={"/orders"}>
                  <a>
                    <li className="py-1 hover:text-violet-700 text-sm font-bold">
                      My Orders
                    </li>
                  </a>
                </Link>
                <li
                  onClick={logout}
                  className="py-1 hover:text-violet-700 text-sm font-bold"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl mx-2" />
          )}
        </span>
      )}
      <div
        className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md mb-1 sticky top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mr-auto md:mx-5">
          <Link href={"/"}>
            <a>
              <Image
                src={"/logo.jpg"}
                alt=""
                width={200}
                height={40}
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}>
              <a>
                <li className="hover:text-violet-600">Tshirts</li>
              </a>
            </Link>
            <Link href={"/hoodies"}>
              <a>
                <li className="hover:text-violet-600">Hoodies</li>
              </a>
            </Link>
            <Link href={"/suits"}>
              <a>
                <li className="hover:text-violet-600">Suits</li>
              </a>
            </Link>
            <Link href={"/shirts"}>
              <a>
                <li className="hover:text-violet-600">Shirts</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className=" cursor-pointer items-center cart absolute right-0 mx-5 top-4 flex">
          {!user.value && (
            <Link href={"/login"}>
              <a>
                <button className="bg-violet-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                  Login
                </button>
              </a>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl"
          />
        </div>

        <div
          ref={ref}
          className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 bg-violet-100 px-8 py-10  transition-all z-10 ${
            sidebar ? `right-0` : `-right-96`
          }`}
        >
          <h2 className="font-bold text-xl text-center">Shopping cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-2xl text-violet-500"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className=" my-4 font-semibold">Your cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name}({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="w-1/3 flex items-center justify-center text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-violet-500"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-violet-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2">Subtotal: ₹{subTotal} </div>
          <div className="flex">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length === 0}
                className=" disabled:bg-purple-300 flex mr-2 text-white bg-violet-500 border-0 py-2 px-2 focus:outline-none hover:bg-violet-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="m-1" />
                Checkout
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className="disabled:bg-purple-300 flex mr-2 text-white bg-violet-500 border-0 py-2 px-2 focus:outline-none hover:bg-violet-600 rounded text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
