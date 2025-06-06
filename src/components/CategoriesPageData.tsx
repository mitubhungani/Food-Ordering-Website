import { useFoodStore } from "@/store/foodStore";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skaleton } from "./HomePageComponents/Skeleton";
import { Badge } from "./ui/badge";
import { LuClock4 } from "react-icons/lu";

const CategoriesPageData = () => {
  const { foods } = useFoodStore((ele) => ele);
  const { id } = useParams<{ id: string }>();

  const [isLoad, setIsLoad] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, []);

  const filteredFoods = foods.filter(
    (food) => id && food.mealType.includes(id)
  );
  console.log(filteredFoods);

  return (
    <div className="p-4 box-border">
      {/* Title */}
      <div className="flex flex-col justify-around text-center my-4">
        <h1 className="text-3xl font-bold text-center my-2 text-gray-800">
          Explore {id} Recipes
        </h1>
        <p className="my-2 text-gray-600">
          Discover {id} recipes to satisfy your cravings.
        </p>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-5/6 mx-auto">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Link to={`/food/${food.id}`} key={food.id}>
              <Card className="cursor-pointer p-0">
                <CardHeader className="text-center rounded-t-lg p-0 overflow-hidden relative">
                  {isLoad ? (
                    <Skaleton />
                  ) : (
                    <img
                      src={food.image}
                      alt={`Delicious ${food.name}`}
                      className="w-full h-40 object-cover transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    />
                  )}
                  <div className="absolute w-full flex justify-between">
                    <Badge variant="destructive" className="px-3 m-3">
                      {food.cuisine}
                    </Badge>
                    <Badge variant="secondary" className="px-3 m-3">
                      {food.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-3 pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {food.name}
                  </CardTitle>
                  <div className="flex justify-between">
                    <CardDescription className="text-gray-800 flex items-center gap-1 text-sm">
                      <LuClock4 /> {food.prepTimeMinutes + food.cookTimeMinutes}{" "}
                      min
                    </CardDescription>
                  </div>
                  <CardDescription className="text-sm text-gray-800">
                    Price: ₹{food.price}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No foods found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPageData;
