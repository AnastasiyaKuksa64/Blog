import styles from "./user.module.scss";
import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../appSlices/SignInSlice";

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state?.User?.userData);

  return (
    <div className={styles.wrap}>
      <div className={styles.aurhor}>
        <div className={styles.authorIcon}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span className="AuthorName">
          {JSON.stringify(userStatus.username)}
        </span>
      </div>
    </div>
  );
};

export default User;
