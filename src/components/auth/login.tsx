import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { AUTH_SCREEN } from "../../constants/enum";
import { useForm } from "../../hooks/formHook";
import { useService } from "../../hooks/serviceHook";
import { AUTH } from "../../services/api.services";
import { AuthUser } from "../../services/auth-user";

export interface ILogin {
  screenType: Dispatch<SetStateAction<AUTH_SCREEN>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const Login: FC<ILogin> = ({ screenType, setOpen }) => {
  const { setToken } = AuthUser();
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, handleSubmit } = useForm({
    contact: null,
    password: "",
  });

  const { fetchData: loginService }: any = useService(
    async () =>
      await AUTH.login(values).then((data) =>
        setToken(data.data.user, data.data.token)
      )
  );

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await loginService();
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex-col items-center text-center px-[5rem]">
      <form className="space-y-6 mt-[9rem]" onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Enter Contact"
            name="contact"
            type="number"
            variant="outlined"
            fullWidth
            className="bg-gray-100 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            onChange={handleChange}
            className="bg-gray-100 rounded-md"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex justify-end">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-800">
            Forgot Password?
          </a>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <div className="flex justify-center space-x-2">
          <div className="text-center text-sm text-gray-500">
            Not a member?{" "}
          </div>
          <div
            onClick={() => screenType(AUTH_SCREEN.SIGNUP)}
            className="text-pink-500 hover:text-pink-600 cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </form>
    </div>
  );
};
