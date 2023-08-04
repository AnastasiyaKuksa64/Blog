import styles from "./notFound.module.scss";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <h1 className={styles.notFound}>Not Found</h1>
      <Link className="link_home" to="/">
        Back to home
      </Link>
    </div>
  );
}
export default NotFound;
