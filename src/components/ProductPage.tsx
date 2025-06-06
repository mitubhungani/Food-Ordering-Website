import React, { useEffect, useState } from "react";
import { useFoodStore } from "@/store/foodStore";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartList } from "@/store/cartStore";
import { Food, Review } from "@/Types";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { useUserStore } from "@/store/userStore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import RatingReview from "./RatingReview";
import { getFoodByIdAPI } from "@/api/foodApi";
import { useRatingReview } from "@/Hooks/useRatingReview";
import { useReviewList } from "@/store/reviewStore";
import { addReview } from "@/api/ReviewApi";
import FeaturFood from "./HomePageComponents/FeaturFood";
import { getUserById } from "@/api/userApi";

type CartItem = {
  food: Food;
  qty: number;
  userId: string;
};

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addToCart, cartList } = useCartList((state) => state);
  const { foods } = useFoodStore((state) => state);
  const { loggedInUser } = useUserStore((state) => state);
  const { reviews, addReviews } = useReviewList();

  const food = foods.find((val) => val.id.toString() === id);
  const existingCartItem = cartList.find(
    (item) => item.food.id.toString() === id
  );
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleCartAction = (value: Food) => {
    if (existingCartItem) {
      // updateCart(existingCartItem.food.id.toString(), {
      //   ...existingCartItem,
      //   qty: quantity,
      // });
    } else if (loggedInUser) {
      const newItem: CartItem = {
        food: value,
        qty: quantity,
        userId: loggedInUser?.id ? loggedInUser.id.toString() : "",
      };
      addToCart(newItem, (loggedInUser.id ?? "").toString());
    } else {
      console.error("User is not logged in.");
    }
  };

  const [Food, setFood] = useState<Food | null>(null);
  const { handleStarClick, rating, review, setReview } = useRatingReview();

  useEffect(() => {
    setFood(null); // Reset previous data
    const getFood = async () => {
      if (id) {
        const data = await getFoodByIdAPI(id);
        setFood(data);
      }
    };
    getFood();
  }, [id]); // Re-fetch food when `id` changes

  //  State to store formatted reviews
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [not, setNot] = useState<any[]>([]);

  //  Fetch reviews when `id` or `reviews` changes
  useEffect(() => {
    const fetchReviews = async () => {
      const filteredReviews = reviews.filter((ele) => ele.foodId === id);
      const formattedReviews = await Promise.all(
        filteredReviews.map(async (ele) => {
          const userData = await getUserById(ele.userId ?? 0);
          return { ...ele, user: userData?.name ?? "Unknown" };
        })
      );
      setNot(formattedReviews);

      //  Store in localStorage for persistence
      localStorage.setItem("reviews", JSON.stringify(formattedReviews));
    };

    fetchReviews();
  }, [reviews, id]);

  //  Load stored reviews on page refresh
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setNot(JSON.parse(storedReviews));
    }
  }, []);

  const handleComplete = async () => {
    if (rating && review.trim() && Food && loggedInUser) {
      const newReview: Review = {
        userId: loggedInUser.id ?? "",
        foodId: Food.id,
        message: review,
        rating: rating,
        date: Date.now(),
      };

      try {
        await addReview(newReview);
        addReviews(newReview);

        const updatedReviews = [
          ...not,
          { ...newReview, user: loggedInUser.name ?? "Unknown" },
        ];
        setNot(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));

        alert("Review submitted successfully!");
      } catch (error) {
        console.error("Failed to add review:", error);
      }
    } else {
      alert("Please provide a rating and review.");
    }
  };

  return (
    <div className="w-5/6 m-auto">
      <Button
        className="border m-2 cursor-pointer"
        onClick={() => navigate(-1)}
        variant="ghost"
      >
        <FaArrowLeft /> Back
      </Button>
      {food ? (
        <div>
          <div className="py-8">
            <div className="relative mb-8 bg-white rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-red-300 text-xs font-medium mb-4">
                  {food.mealType}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {food.name}
                </h1>

                <ul className="grid grid-cols-2 gap-4 mb-4">
                  {food.ingredients.map((ele, index) => (
                    <li className="list-disc list-inside" key={index}>
                      {ele}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 border rounded-lg p-2">
                  {existingCartItem ? (
                    <Button disabled>Already In cart</Button>
                  ) : (
                    <div className="flex items-center gap-2 border rounded-lg p-2">
                      <div className="flex items-center">
                        <Button
                          className="px-4 cursor-pointer"
                          onClick={decreaseQuantity}
                        >
                          -
                        </Button>
                        <p className="text-lg font-semibold mx-2">{quantity}</p>
                        <Button
                          className="px-4 cursor-pointer"
                          onClick={increaseQuantity}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        className="bg-gray-300 cursor-pointer"
                        onClick={() => handleCartAction(food)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Review</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>
                          Provide a rating and review.
                        </DialogDescription>
                        <RatingReview
                          rating={rating}
                          review={review}
                          handleStarClick={handleStarClick}
                          setReview={setReview}
                        />
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={handleComplete}>
                          Submit Review
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="relative">
                <img
                  src={food.image}
                  alt={food.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Not found</p>
      )}

      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
        <div className="  gap-4">
          {not.length > 0 ? (
            not.map((ele, index) => (
              <div className="hover:bg-gray-100 m-2 p-3 rounded-md" key={index}>
                <div className="flex justify-between">
                  <span className="block font-medium text-sm">
                    User: {ele.user}
                  </span>
                  
                </div>
                <span className=" flex items-center gap-1">
                  {Array.from({ length: ele.rating }, (_, i) => (
                    <FaStar className="text-yellow-500 text-sm" key={i} />
                  ))}
                <p className="text-sm">{new Date(ele.date).toLocaleDateString()}</p>
                </span>
                <p className="text-md">Review: {ele.message}</p>
                
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}
        </div>
      </div>

      <FeaturFood />
    </div>
  );
};

export default ProductPage;