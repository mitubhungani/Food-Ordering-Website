import HeroSection from "./HomePageComponents/HeroSection";
import FeaturedRecipes from "./HomePageComponents/FeaturedRecipes";
import Categories from "./HomePageComponents/Categories";
import { useCartList } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import React from "react";

const Home = () => {
  const { loggedInUser } = useUserStore((ele) => ele);
  const { initializeCart } = useCartList();

  React.useEffect(() => {
    if (loggedInUser?.id) {
      initializeCart(loggedInUser.id.toString());
    }
  }, []);

  return (
    <div className="m-2 box-border">
      <div>
        <HeroSection />
      </div>
      <div>
        <FeaturedRecipes />
      </div>
      <div>
        <Categories />
      </div>
    </div>
  );
};

export default Home;
