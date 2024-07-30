import React, { FC, useState } from "react";
import { TruncateString } from "../../utils/helper";
import { AuthUser } from "../../services/auth-user";
import { ROLE } from "../../constants/enum";
import axios from "axios";
interface ICartBook {
  data: any;
  handleAddToCart?: any;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CartBox: FC<ICartBook> = ({ data, handleAddToCart }) => {
  const { getUser } = AuthUser();
  const user = getUser();
  const userType = user?.userType;

  const handlePayment = async () => {
    try {
      const response = await axios.post("/payment/order", {
        amount: data.price,
        currency: "INR",
        receipt: `receipt_${data.id}`,
      });
      const { id, amount, currency } = response.data.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount?.toString(),
        currency: currency,
        name: "Deva Treaders & Co.",
        description: "Shop Transection",
        order_id: id,
        // handler: async (response: any) => {
        //   const paymentData = {
        //     orderId: response?.razorpay_order_id,
        //     paymentId: response.razorpay_payment_id,
        //     signature: response?.razorpay_signature,
        //   };

        //   await axios.post("/payment/verify", paymentData);
        // },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "7008551963",
        },
        notes: {
          address: "Deva Treaders & Co.",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      console.log("Payment failed. Please try again.");
    }
  };
  return (
    <div className="border shadow-xl w-[220px] rounded-lg overflow-hidden cursor-pointer">
      <div className="flex justify-center">
        <img
          src={
            data.url ??
            "https://images.meesho.com/images/products/224396373/voihu_512.webp"
          }
          className="w-full h-[200px]"
        />
      </div>
      <div className="px-4 mt-4">
        <div className="text-lg font-bold flex justify-between items-center">
          <span>{data.title}</span>
          <span className="text-sm text-gray-400">{data.publishYear}</span>
        </div>
        <div className="text-md">
          <span>Auther : </span>
          {data.author}
        </div>
        <div className="text-xl font-semibold">
          ₹ {data.price}
          <span className="text-lg font-medium ml-2 line-through text-gray-400">
            ₹ {Number(data.price) + 150}
          </span>
        </div>
        <div className="text-gray-600">
          <span className="text-gray-400">Details : </span>
          <TruncateString text={data.description} maxLength={30} />
        </div>
        {userType !== ROLE.SELLER && (
          <div className=" py-4">
            <div
              className="border p-2 w-full text-center bg-blue-500 rounded-md text-white cursor-pointer hover:text-orange-600 hover:bg-blue-300"
              onClick={handlePayment}
            >
              Add to cart
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartBox;
