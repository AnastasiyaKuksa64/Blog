import styles from "./registretion.module.scss";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  changeErrorMessage,
  changeIsSuccess,
  fetchRegister,
  fetchActivate,
} from "../../appSlices/SignUpSlice";
import { changeSuccessMessage } from "../../appSlices/SignInSlice";

const Registeration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isToken = useAppSelector((state) => state.Registration.isToken);
  const isSuccess = useAppSelector((state) => state.Registration.isSuccess);
  const errorMessage = useAppSelector(
    (state) => state.Registration.errorMessage
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(changeIsSuccess(false));
      dispatch(changeSuccessMessage("You has been registered"));
    }
  }, [isSuccess]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [cofirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (cofirmPassword === password) {
      dispatch(fetchRegister({ username, email, password }));
    } else {
      dispatch(changeErrorMessage("password don't match"));
    }
  };
  const handleActivate = (e: any) => {
    e.preventDefault();
    const authToken = token.split("/");
    dispatch(fetchActivate({ uid: authToken[0], token: authToken[1] }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(changeIsSuccess(true));
      console.log("you are sign up");
    }
  }, [isSuccess]);

  return (
    <section className={styles.regisretion}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <span className="link_home" onClick={() => navigate("/")}>
            Back to Home /
          </span>
          {isToken ? (
            <>
              <h2 className="main_title">Registration confirmation</h2>
              <form className="form" onSubmit={handleActivate}>
                {errorMessage && (
                  // unexpected end of JSON input. но в network status 204.
                  <span className={styles.error_message}>{errorMessage}</span>
                )}
                <div className={styles.wrap_paragraph}>
                  <p className={styles.paragraph}>
                    Please activate your account with the activation link in
                    example@gmail.com. Please, check your email
                  </p>
                </div>
                <div className={styles.input_wrap}>
                  <label htmlFor="token">Your token</label>
                  <input
                    className="form_input"
                    type="text"
                    required
                    placeholder="Your token"
                    onChange={(e) => setToken(e.target.value)}
                    value={token}
                  />
                </div>

                <div className={styles.wrap_SignUpButton}>
                  <input
                    className={styles.signup}
                    type="submit"
                    value="Submit"
                    placeholder="Sign up"
                  />
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="main_title">Registration</h2>
              <form className="form" onSubmit={handleSubmit}>
                {errorMessage && (
                  <span className={styles.error_message}>{errorMessage}</span>
                )}
                <div className={styles.input_wrap}>
                  <label htmlFor="name">Name</label>
                  <input
                    className="form_input"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className={styles.input_wrap}>
                  <label htmlFor="email">email</label>
                  <input
                    className="form_input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    name="email"
                  />
                </div>
                <div className={styles.input_wrap}>
                  <label htmlFor="password">password</label>
                  <input
                    className="form_input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    name="password"
                  />
                </div>
                <div className={styles.input_wrap}>
                  <label htmlFor="confirm">Confirm password</label>
                  <input
                    className="form_input"
                    type="password"
                    placeholder="Confirm password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={cofirmPassword}
                  />
                </div>
                <input
                  className={styles.signup}
                  type="submit"
                  value="Sign Up"
                  placeholder="Sign up"
                />
                <button
                  className="switchon"
                  onClick={() => navigate("/signin")}
                >
                  Already have an account? SIgn In here.
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Registeration;
