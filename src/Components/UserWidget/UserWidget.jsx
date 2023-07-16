// import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./UserWidget.css";

const UserWidget = () => {

  return (
    <Link to='/login' className="userWidget">
      <AccountCircleIcon sx={{ color: "white", fontSize: 35 }} />
    </Link>
  );
};

export default UserWidget;
