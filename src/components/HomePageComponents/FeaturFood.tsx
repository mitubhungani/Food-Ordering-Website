import { useFoodStore } from "@/store/foodStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { LuClock4 } from "react-icons/lu";

const FeaturedFood = () => {
  // const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const { foods } = useFoodStore();
  //   console.log(foods);

  // Find the current food item based on id
  const currentFood = foods.find((food) => food.id.toString() === id);
  //   console.log(currentFood);

  const filterFood = foods.filter(
    (ele) =>
      currentFood?.mealType &&
      currentFood.mealType.some(
        (type) => ele.mealType.includes(type) && ele.id !== currentFood.id
      )
  );

  //   const handleClick=(id:string)=>{
  //     navigate(`/food/${id}`)
  //   }

  //   const not = foods.filter((ele)=>ele.id === currentFood?.id ? ele:null )

  //   console.log(not);

  //   console.log(filterFood);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Featured Foods</h1>
      <div className="flex flex-row overflow-x-auto gap-6  rounded-lg">
        {filterFood.length > 0 ? (
          filterFood.map((food) => (
            <Link to={`/food/${food.id}`} key={food.id}>
              <Card className="w-[300px] max-w-[350px] cursor-pointer p-0 m-3 ">
                <CardHeader className="text-center rounded-t-lg p-0 overflow-hidden relative">
                  <img
                    src={food.image}
                    alt={`Delicious ${food.name}`}
                    className=" w-full object-contain   transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                  />
                  <div className="absolute  w-full flex justify-between">
                    <Badge variant="destructive" className="px-3 m-3">
                      {food.cuisine}
                    </Badge>
                    <Badge variant="secondary" className="px-3 m-3">
                      {food.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col  gap-3 px-3 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {food.name}
                    </CardTitle>
                    <div className="hover:bg-green-200 p-1 rounded-sm border"></div>
                  </div>
                  <div className="flex justify-between">
                    <CardDescription className=" text-gray-800 flex items-center gap-1 text-sm">
                      <LuClock4 /> {food.prepTimeMinutes + food.cookTimeMinutes}{" "}
                      min
                    </CardDescription>
                    <CardDescription className="text-sm text-gray-800">
                      Price: ₹{food.price}
                    </CardDescription>
                  </div>
                  {/* <CardFooter className="flex justify-center">
                        <Button variant='ghost' onClick={() => addToCartData(food.id.toString(), food)} className="w-full px-4 py-2 text-black bg-gray-300  hover:bg-gray-200 cursor-pointer hover:text-black">Add to Cart</Button>
                    </CardFooter> */}
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No related foods found.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedFood;
