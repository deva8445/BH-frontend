import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Auth from "../auth";
import { useMemo, useState } from "react";
import CustomModal from "../modal";
import { AuthUser } from "../../services/auth-user";
import React from "react";
import { authNav, guestNav, style } from "./constants";

const Navbar = () => {
  const { getToken, getUser, logout } = AuthUser();
  const [open, setOpen] = useState<boolean>(false);

  const navPath = useMemo(() => {
    return !!getToken() ? authNav : guestNav;
  }, [getToken()]);

  return (
    <>
      <AppBar
        position="static"
        color="default"
        className="bg-white border-b border-gray-200 top-0 z-[50]"
      >
        <Toolbar className="container mx-auto px-4 flex justify-between items-center h-16">
          <Typography
            variant="h6"
            color="inherit"
            className="flex-shrink-0 flex gap-5"
          >
            {getToken() && (
              <div className="text-orange-600">
                <span>Hi </span>
                {getUser()?.firstName} !
              </div>
            )}
            <img src="logo.png" alt="your logo" className="h-[3rem]" />
          </Typography>
          <Box className="hidden md:flex space-x-4">
            {navPath?.map((item: any) => {
              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  className="text-gray-800 hover:text-orange-600"
                >
                  {item.name}
                </Button>
              );
            })}
          </Box>
          <Box className="flex space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={!!getToken() ? () => logout() : () => setOpen(true)}
            >
              {!!getToken() ? "Logout" : "LogIn / SignUp"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <CustomModal
        style={style}
        title={"Auth"}
        open={open}
        handleClose={() => setOpen(false)}
      >
        <Auth setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default React.memo(Navbar);
