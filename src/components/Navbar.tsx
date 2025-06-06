import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { BsFillCartCheckFill } from "react-icons/bs";

import React from "react";
import { useCartList } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const { cartList } = useCartList((ele) => ele);
  // const catLists = JSON.parse(localStorage.getItem('cartStore') || '{}')
  // console.log(cartList);

  const { logoutUser, loggedInUser } = useUserStore((ele) => ele);

  let cartPro = cartList.length;
  // console.log(cartPro)
  const handleLogout = () => {
    cartPro = 0;
    logoutUser(); // Call store action
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm px-2">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold text-food-red">
                Tasty<span className="text-food-teal">Bites</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-red-500"
                  : "text-foreground hover:text-food-red"
              } font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/foods"
              className={`${
                isActive("/foods")
                  ? "text-red-500"
                  : "text-foreground hover:text-food-red"
              } font-medium transition-colors`}
            >
              Foods
            </Link>
            <Link
              to="/categories"
              className={`${
                isActive("/categories")
                  ? "text-red-500"
                  : "text-foreground hover:text-food-red"
              } font-medium transition-colors`}
            >
              Categories
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="  relative">
              <p className="absolute  bg-red-600 rounded-full text-center w-5 h-5 text-sm text-black  right-0">
                {cartPro}
              </p>
              <Link
                to="/cart"
                className={`${
                  isActive("/cart")
                    ? "text-red-500"
                    : "text-foreground hover:text-food-red"
                } font-medium transition-colors`}
              >
                <Button variant="ghost" className="cursor-pointer">
                  <BsFillCartCheckFill size={20} />
                </Button>
              </Link>
            </div>
            <div>
              {loggedInUser ? (
                <Button onClick={handleLogout}>LogOut</Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-red-400 hover:bg-gray-200 cursor-pointer text-black">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "text-red-500"
                    : "text-foreground hover:text-food-red"
                } font-medium transition-colors py-2`}
              >
                Home
              </Link>
              <Link
                to="/foods"
                className={`${
                  isActive("/foods")
                    ? "text-red-500"
                    : "text-foreground hover:text-food-red"
                } font-medium transition-colors py-2`}
              >
                Foods
              </Link>
              <Link
                to="/categories"
                className={`${
                  isActive("/categories")
                    ? "text-red-500"
                    : "text-foreground hover:text-food-red"
                } font-medium transition-colors py-2`}
              >
                Categories
              </Link>
            </div>
            <div className="  relative w-10">
              <p className="absolute  bg-red-600 rounded-full text-center w-5 h-5 text-sm text-black  right-0">
                {cartPro}
              </p>
              <Link
                to="/cart"
                className={`${
                  isActive("/cart")
                    ? "text-red-500"
                    : "text-foreground hover:text-food-red"
                } font-medium transition-colors`}
              >
                <Button variant="ghost" className="cursor-pointer">
                  <BsFillCartCheckFill size={20} />
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div>
                {loggedInUser ? (
                  <Button onClick={handleLogout}>LogOut</Button>
                ) : (
                  <Link to="/login">
                    <Button className="bg-red-400 hover:bg-gray-200 cursor-pointer text-black">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
