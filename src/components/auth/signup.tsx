import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { AUTH_SCREEN } from "../../constants/enum";
import { useForm } from "../../hooks/formHook";
import RadioButtonComponent from "../radio";
import { options } from "../../constants/constant";
import { useService } from "../../hooks/serviceHook";
import { AUTH } from "../../services/api.services";

export interface ISignUp {
  screenType: Dispatch<SetStateAction<AUTH_SCREEN>>;
}

export const SignUp: FC<ISignUp> = ({ screenType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [resposeData, setresponseData] = useState();
  const { values, handleChange, handleSubmit, setValues } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    contact: null,
    password: "",
    userType: "buyer",
    storeName: "",
  });

  const { fetchData: signupService }: any = useService(
    async () =>
      await AUTH.signup(values).then((data) => setresponseData(data.data))
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    await signupService();
    screenType(AUTH_SCREEN.LOGIN);
  };

  const handleSelectionChange = (selectedOption: {
    name: string;
    value: string;
  }) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      userType: selectedOption.value,
    }));
  };

  return (
    <div className="flex-col items-center text-center px-[5rem]">
      <form className="space-y-6 mt-[3rem]" onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div>
            <TextField
              label="Enter first name"
              variant="outlined"
              fullWidth
              className="bg-gray-100 rounded-md"
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Enter last name"
              variant="outlined"
              fullWidth
              className="bg-gray-100 rounded-md"
              name="lastName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <TextField
            label="Enter email"
            variant="outlined"
            fullWidth
            className="bg-gray-100 rounded-md"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="Enter contact details"
            variant="outlined"
            type="number"
            fullWidth
            className="bg-gray-100 rounded-md"
            name="contact"
            onChange={handleChange}
          />
        </div>
        <RadioButtonComponent
          options={options}
          onSelectionChange={handleSelectionChange}
        />
        {values.userType === "seller" && (
          <div>
            <TextField
              label="Store Name"
              variant="outlined"
              fullWidth
              className="bg-gray-100 rounded-md"
              name="storeName"
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            className="bg-gray-100 rounded-md"
            name="password"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
          onClick={handleSignup}
        >
          Create Account
        </Button>
        <div className="flex justify-center space-x-2">
          <div className="text-center text-sm text-gray-500">
            Already a member?{" "}
          </div>
          <div
            onClick={() => screenType(AUTH_SCREEN.LOGIN)}
            className="text-pink-500 hover:text-pink-600 cursor-pointer"
          >
            Log In
          </div>
        </div>
      </form>
    </div>
  );
};
