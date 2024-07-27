import React, { FC, Fragment } from "react";
import { HiOutlineNewspaper } from "react-icons/hi2";

interface INoRecordFound {
  iconWidth: string;
  iconHight: string;
}

export const NoRecordFound: FC<Partial<INoRecordFound>> = ({
  iconHight = "6rem",
  iconWidth = "6rem",
}) => {
  return (
    <Fragment>
      <div className="w-full py-8 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <HiOutlineNewspaper
            className={`w-[${iconWidth}] h-[${iconHight}] text-gray-400`}
          />
          <p className="text-center text-lg font-semibold text-gray-400">
            No Record Found
          </p>
        </div>
      </div>
    </Fragment>
  );
};
