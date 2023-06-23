import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./LogoutWidget.css";

const LogoutWidget = () => {
  const logoutHandler = () => {
    axios
      .post("http://localhost:8080/api/auth/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="logoutWidget">
      <LogoutIcon
        sx={{ color: "white", fontSize: 35 }}
        onClick={logoutHandler}
      />
    </div>
  );
};

export default LogoutWidget;
