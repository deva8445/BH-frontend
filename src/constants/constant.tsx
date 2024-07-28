export const options = [
  { name: "As a Buyer", value: "buyer" },
  { name: "As a Seller", value: "seller" },
];

export const modalElement = {
  auth: {
    name: "LogIn / SignUp",
    style: {
      minHeight: "80%",
      display: "grid",
      width: "80%",
      outline: "none",
      border: "none",
    },
    type: "auth",
  },
  addBook: {
    name: "Add Book",
    style: {
      minHeight: "50%",
      display: "grid",
      width: "60%",
      outline: "none",
      border: "none",
    },
    type: "addBook",
  },
};
