import styles from "./cardList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addFavourite,
  delitemarksFavourite,
  selectPosts,
} from "../../appSlices/postsSlice";
import { useNavigate, Link } from "react-router-dom";

interface IBigCardProps {
  date: string;
  title: string;
  discription: string;
  src: string;
  id: string;
}

const BigCard: React.FC<IBigCardProps> = (props) => {
  const faTwitterIcon = faTwitter as IconProp;
  const faFacebooIcon = faFacebookF as IconProp;
  const { title, discription, src, id } = props;

  const { favourites: bookMarks } = useAppSelector(selectPosts);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleForward = () => {
    navigate(-1);
  };
  const onClickRemove = () => {
    if (window.confirm("Are you sure ?")) {
      dispatch(delitemarksFavourite(id));
    }
  };
  return (
    <>
      <div className={styles.post}>
        <span className="link_home" onClick={handleForward}>
          Back to Home /
        </span>
        <div className={styles.card}>
          <h3 className="card_title">{title}</h3>
          <div className={styles.card_img}>
            <img src={src} alt={"src"} />
          </div>
          <div className={styles.card_description}>
            <div className="card_text">
              <p>{discription}</p>
              <p>{discription}</p>
              <p>{discription}</p>
            </div>

            <div className={styles.card_footer}>
              <ul className="marks">
                <li className="icon">
                  <Link to="https://twitter.com/">
                    <FontAwesomeIcon icon={faTwitterIcon} />
                  </Link>
                </li>
                <li className="icon">
                  <Link to="https://ru-ru.facebook.com/">
                    <FontAwesomeIcon icon={faFacebooIcon} />
                  </Link>
                </li>
              </ul>
              {bookMarks.find((item: { id: string }) => item.id === id) ? (
                <div className="icon" onClick={onClickRemove}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              ) : (
                <div
                  className="icon"
                  onClick={() => dispatch(addFavourite(props))}
                >
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigCard;
