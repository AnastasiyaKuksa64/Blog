import styles from "./logOut.module.scss";
import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../appSlices/SignInSlice";
import { useState } from "react";
const LogoutLink: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state?.User?.userData);
  const [isShows, setisShows] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.link} onClick={() => dispatch(logout())}>
        <span className="logOut">Logout</span>
      </div>
    </div>
  );
};

export default LogoutLink;
