import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./LogoutWidget.css";

const LogoutWidget = () => {
  const logoutHandler = () => {
    console.log(document.cookie);
    axios
      .post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => (window.location.href = "/"))
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
