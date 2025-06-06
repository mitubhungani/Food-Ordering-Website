export interface User{
    id?:string;
    name:string
    email:string
    password:string   
}

export interface Food {
    id: string;
    name: string;
    price: number;
    image: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    rating: number;
    reviewCount: number;
    mealType: string[];
    userReview?:Review[];
  }

  export interface Review{
    id?: string;
    userId: string;
    foodId: string;
    message: string;
    rating: number;
    date:number
  }
  

export interface Cart{
    id?:string;
    food:Food;
    qty:number;
    userId:string
}