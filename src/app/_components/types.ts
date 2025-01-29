export type CategoryType = {
  categoryName: String;
  _id: string;
};
export type foodType = {
  foodName: String;
  price: any;
  category: {
    categoryName: String;
    _id: string;
  };
  image: any;
  ingerdients: String;
  _id: string;
};
