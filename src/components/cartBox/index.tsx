import React, { FC, useState } from "react";
import { TruncateString } from "../../utils/helper";
import Auth from "../auth";
import CustomModal from "../modal";
import { CustomModalStyle } from "../modal/style";
interface ICartBook {
  data: any;
  handleAddToCart?: any;
}

const CartBox: FC<ICartBook> = ({ data, handleAddToCart }) => {
  return (
    <div className="border shadow-xl w-[250px] rounded-lg overflow-hidden cursor-pointer">
      <div className="flex justify-center">
        <img
          src={
            data.url ??
            "https://images.meesho.com/images/products/224396373/voihu_512.webp"
          }
          className="w-full h-full"
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
            ₹ 250
          </span>
        </div>
        <div className="text-gray-600">
          <span className="text-gray-400">Details : </span>
          <TruncateString text={"data.description"} maxLength={30} />
        </div>
        <div className=" py-4">
          <div
            className="border p-2 w-full text-center bg-blue-500 rounded-md text-white cursor-pointer hover:text-orange-600 hover:bg-blue-300"
            onClick={handleAddToCart}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBox;
