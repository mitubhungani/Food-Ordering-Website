import React from "react";
import { useCartList } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import emptycart from "../assets/emptycart.png";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cartList, initializeCart, removeFromCart, updateCart, checkoutCart } =
    useCartList((ele) => ele);
  const { loggedInUser } = useUserStore((ele) => ele);

  React.useEffect(() => {
    if (loggedInUser?.id) {
      initializeCart(loggedInUser.id.toString());
    }
  }, []);

  const handleMinus = (ele: any) => {
    if (ele.qty <= 1) {
      removeFromCart(ele.id ? ele.id.toString() : "");
      return;
    }
    updateCart(ele.id, { ...ele, qty: ele.qty - 1 });
  };

  const handlePlus = (ele: any) => {
    updateCart(ele.id, { ...ele, qty: ele.qty + 1 });
  };

  const totalBill = cartList.reduce(
    (total, item) =>
      total + (Number(item.food?.price) || 0) * (Number(item.qty) || 0),
    0
  );

  const handleCheckout = async () => {
    if (!loggedInUser) {
      alert("Please log in to proceed with checkout.");
      return;
    }
    if (cartList.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    await checkoutCart(loggedInUser.id?.toString() || "");
  };

  return (
    <div className="p-4 lg:flex lg:gap-8">
      {/* Cart Items Section */}
      <div className="lg:w-3/4">
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
          Your Cart
        </h2>
        {cartList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartList.map((ele, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold truncate">{ele.food.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-3">
                  <img
                    src={ele.food.image}
                    alt={ele.food.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <CardDescription className="text-sm text-gray-600">
                    ₹{ele.food.price}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                    <Button variant="ghost" size="icon" onClick={() => handleMinus(ele)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span>{ele.qty}</span>
                    <Button variant="ghost" size="icon" onClick={() => handlePlus(ele)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="text-red-500">
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you want to remove <b>{ele.food.name}</b> from the cart?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            removeFromCart(ele.id ? ele.id.toString() : "")
                          }
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <img src={emptycart} alt="Empty Cart" className="mx-auto w-64" />
            <p className="text-gray-500 my-4 text-lg">Your cart is empty.</p>
            <Link
              to="/foods"
              className="bg-pink-600 text-white px-4 py-2 rounded-full shadow hover:bg-pink-700 transition"
            >
              Browse Foods
            </Link>
          </div>
        )}
      </div>

      {/* Checkout Sidebar */}
      {cartList.length > 0 && (
        <div className="lg:w-1/4 mt-6 lg:mt-0 sticky top-6 h-fit bg-white shadow-lg rounded-xl p-5">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Order Summary
          </h3>
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Items Total</span>
            <span>₹{totalBill}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{totalBill}</span>
          </div>
          <div className="mt-5">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full transition cursor-pointer">
                  Proceed to Checkout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Checkout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to checkout with current items?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCheckout}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
