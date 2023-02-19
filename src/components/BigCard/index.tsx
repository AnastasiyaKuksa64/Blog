import styles from "./cardList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faBookmark,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFavourite, delitemarksFavourite } from "../../appSlices/postsSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
  const { date, title, discription, src, id } = props;

  const bookMarks = useAppSelector((state) => state.posts.favourites);
  // const isLogin = useAppSelector((state) => state.User.isLoggedIn);
  // useEffect(() => {
  //   bookMarks.find((item) => item.id === id);
  //   setItem("favourites", bookMarks);
  // }, [bookMarks]);
  //после обновления исчезеает, в PostsSlice работает

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleForward = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.post}>
        <span className="linkToHome" onClick={handleForward}>
          Home
        </span>
        <div className={styles.card_content_wrap}>
          <h3 className="CardTitle">{title}</h3>
          <div className={styles.card_img}>
            <img src={src} alt={"src"} />
          </div>
          <div className={styles.wrap_content}>
            <div className="card_text">
              <p>{discription}</p>
              <p>{discription}</p>
              <p>{discription}</p>
            </div>

            <div className={styles.card_footer}>
              <ul className="marks">
                <li className="icon">
                  <FontAwesomeIcon icon={faTwitterIcon} />
                </li>
                <li className="icon">
                  <FontAwesomeIcon icon={faFacebooIcon} />
                </li>
                <li className="icon">
                  <FontAwesomeIcon icon={faEllipsis} />
                </li>
              </ul>
              <div className="icon">
                <>
                  {bookMarks.find((item) => item.id === id) ? (
                    <>
                      <div onClick={() => dispatch(delitemarksFavourite(id))}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div onClick={() => dispatch(addFavourite(props))}>
                        <FontAwesomeIcon icon={faBookmark} />
                      </div>
                      <></>
                    </>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BigCard;
