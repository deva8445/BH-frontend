import React, { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { Login } from "./login";
import { AUTH_SCREEN } from "../../constants/enum";
import { SignUp } from "./signup";
const headerImage = `${process.env.PUBLIC_URL}/authImage.jpg`;
export interface IAuth {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Auth: FC<IAuth> = ({ setOpen }) => {
  const [screenType, setScreenType] = useState<AUTH_SCREEN>(AUTH_SCREEN.LOGIN);
  return (
    <Fragment>
      <div className="flex border justify-between h-[90%]">
        <div className="border w-[60%] overflow-hidden relative">
          {/* <img
            src={headerImage}
            alt="Header Background"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="border w-[40%] ">
          {
            {
              [AUTH_SCREEN.LOGIN]: <Login screenType={setScreenType} />,
              [AUTH_SCREEN.SIGNUP]: <SignUp screenType={setScreenType} />,
            }[screenType]
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
