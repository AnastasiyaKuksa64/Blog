import styles from "./user.module.scss";
import { useAppSelector } from "../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const User: React.FC = () => {
  const userStatus = useAppSelector((state) => state?.User?.userData);

  return (
    <div className={styles.wrap}>
      <div className={styles.user}>
        <span className={styles.user_icon}>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <span className="user_name">{JSON.stringify(userStatus.username)}</span>
      </div>
    </div>
  );
};

export default User;
