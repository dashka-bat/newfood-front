export type CategoryType = {
    categoryName: String;
    _id: string;
  };
  export type foodType = {
    foodName: String;
    price: Number;
    category: {
      categoryName: String;
      id: string;
    };
    image: any;
    ingerdients: String;
    _id: string;
  };