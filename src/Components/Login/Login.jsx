import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });

  let [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/login", formData)
      .then((res) => {
        console.log(res);
        setFormData({
          email: "",
          password: "",
        });
        setValidation({
          email: true,
          password: true,
        });
        window.location.href = "http://localhost:5173/";
      })
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 411) {
          setValidation({
            email: false,
            password: false,
          });
          setMessage("Invalid user or password");
        }
      });
  };

  return (
    <div className="loginContainer">
      <div className="login">
        <div className="loginTitle">
          <h1>Welcome to DecorateMe</h1>
          <p>Sign In to Continue</p>
        </div>

        <button className="googleBtn">
          <GoogleIcon color="primary" />
          Log In with Google
        </button>
        <div className="divider"></div>
        <form className="loginForm" onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="email@example.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className={validation.email ? "" : "invalid"}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className={validation.password ? "" : "invalid"}
          />
          <p>{message}</p>
          <Link>Forgot Password?</Link>
          <button className="loginBtn">Log In</button>
        </form>
        <p>
          Dont have an account?
          <Link to="/register"> Create a account for free</Link>
        </p>
      </div>
      <div className="imgContainer">
        <h2>Discovering the Best Furniture for Four Home</h2>
        <img
          className="loginImg"
          src="/img/marco-fotos-arte-abstracto-junto-sillon-terciopelo-rosa.jpg"
          alt="login image"
        />
      </div>
    </div>
  );
};

export default Login;
