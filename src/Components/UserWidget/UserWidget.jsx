// import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./UserWidget.css";

const UserWidget = () => {
  //   const [user, SetUser] = useState("");
  //   if (user) {
  //     SetUser("user");
  //   }
  return (
    <div className="userWidget">
      <Link to="/login">
        <AccountCircleIcon sx={{ color: "white", fontSize: 35 }} />
      </Link>
    </div>
  );
};

export default UserWidget;
