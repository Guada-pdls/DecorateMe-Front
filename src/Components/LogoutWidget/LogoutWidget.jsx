import LogoutIcon from "@mui/icons-material/Logout";
import "./LogoutWidget.css";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const LogoutWidget = () => {

  const context = useContext(UserContext)

  const logoutHandler = () => {
    context.logout()
    // mensaje de session closed successfully
  };

  return (
      <LogoutIcon
        fontSize="large"
        sx={{ color: "white" }}
        onClick={logoutHandler}
      />
  );
};

export default LogoutWidget;
