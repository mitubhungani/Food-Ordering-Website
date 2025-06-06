import { useFoodStore } from "@/store/foodStore";
import { Link } from "react-router-dom";

const Footer = () => {
  const { foods } = useFoodStore((ele) => ele);

  // Flattening food categories and uniqueness
  const data = new Set(
    foods.flatMap((food) => food.mealType.map((ele) => ele))
  );

  return (
    <footer className="bg-food-cream pt-16 pb-4 px-3">
      <div className="container-custom">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand and description */}
          <div>
            <a href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-food-red">
                Tasty<span className="text-food-teal">Bites</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6">
              Discover delicious recipes and culinary inspiration for every
              occasion, skill level, and dietary preference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-food-red transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/food"
                  className="text-muted-foreground hover:text-food-red transition-colors"
                >
                  Food
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-muted-foreground hover:text-food-red transition-colors"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-3">
              {Array.from(data).map((ele, index) => (
                <li key={index}>
                  <Link
                    to={`/categories/${ele}`}
                    className="text-muted-foreground hover:text-food-red transition-colors"
                  >
                    {ele}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
