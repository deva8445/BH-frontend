import { CustomModalStyle } from "../modal/style";

export const authNav = [
  {
    name: "Books",
    path: "/books",
  },
  { name: "Cart", path: "/cart" },
  { name: "Payment", path: "/payment" },
];

export const guestNav = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const style = new CustomModalStyle({
  minHeight: "80%",
  display: "grid",
  width: "80%",
  outline: "none",
  border: "none",
});
