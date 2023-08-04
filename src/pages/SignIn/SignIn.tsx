import style from "./SignIn.module.scss";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchLogin, isLogin } from "../../appSlices/SignInSlice";
import { useNavigate, Link } from "react-router-dom";
import { changeSuccessMessage } from "../../appSlices/SignInSlice";
import { Navigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const tokenStatus = useAppSelector((state) => state?.User?.accessToken);
  const successMessage = useAppSelector((state) => state?.User.successMessage);
  const isSignIn = useAppSelector((state) => state?.User.isLoggedIn);

  useEffect(() => {
    return function () {
      successMessage && dispatch(changeSuccessMessage(""));
    };
  }, []);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
    successMessage && dispatch(changeSuccessMessage("login"));
  };

  const handleIsLogin = (e: any) => {
    dispatch(isLogin(tokenStatus));
  };

  useEffect(() => {
    if (tokenStatus) {
      handleIsLogin(tokenStatus);
    }
    return () => {};
  }, [tokenStatus]);

  return (
    <>
      {isSignIn ? (
        <Navigate to="/" />
      ) : (
        <section className={style.signIn}>
          <div className={style.container}>
            <div className={style.wrap}>
              <Link className="link_home" to="/">
                Back to Home /
              </Link>
              <h1 className="main_title">Sign in</h1>
              {successMessage && (
                <span className={style.success}>{successMessage}</span>
              )}
              <form className="form" onSubmit={handleSubmit}>
                <div className={style.input_wrap}>
                  <label htmlFor="email">Email</label>
                  <input
                    className="form_input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Your email@gmail.com"
                    id="email"
                    name="email"
                  />
                </div>
                <div className={style.input_wrap}>
                  <label htmlFor="password">Password</label>
                  <input
                    className="form_input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                  />
                </div>
                <span className="restore_password">Forgot password?</span>
                <input
                  type="submit"
                  value={"Sigh in"}
                  className={style.login}
                ></input>
                <button
                  className="switchon"
                  onClick={() => navigate("/registration")}
                >
                  Don't have an account? Sign Up here.
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignIn;
