import { Box, Modal } from "@mui/material";
import React from "react";
import { CustomModalStyle } from "./style";

interface ICustomModal {
  children: React.ReactNode;
  style: CustomModalStyle;
  open: boolean;
  title: string;
  handleClose: () => void;
}

const CustomModal = ({
  children,
  style,
  title,
  open,
  handleClose,
}: ICustomModal) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="sticky top-0 h-full bg-white z-[50]">
            <div className=" ml-6 text-2xl grid grid-cols-12 text-blue-400 font-semibold items-center">
              <span className="col-start-3 col-end-11 text-center">
                {title}
              </span>
              <div className=" col-start-12 col-end-12 py-5 flex justify-end">
                <div className="cursor-pointer" onClick={handleClose}>
                  X
                </div>
                {/* <Btn text="X" size={BUTTON_SIZES.SMALL} onClick={handleClose} /> */}
              </div>
            </div>
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
