import styles from "./smallCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addFavourite,
  delitemarksFavourite,
  selectPosts,
} from "../../appSlices/postsSlice";
import { Link } from "react-router-dom";

interface ISmallCardProps {
  date: string;
  title: string;
  discription: string;
  src: string;
  rating: number | any;
  id: string;
}

const SmallCard: React.FC<ISmallCardProps> = (props) => {
  const { title, src, id, date } = props;

  const { favourites: bookMarks } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const onClickRemove = () => {
    if (window.confirm("Are you sure ? ?")) {
      dispatch(delitemarksFavourite(id));
    }
  };
  return (
    <article className="post">
      <div className="top_wrap">
        <div className="hover">
          <div className={styles.card_img}>
            <img src={src} alt={"src"}></img>
          </div>
        </div>
        <div className="loop-action">
          <Link to={`/posts/${props.id}`} className="add-to-cart">
            watch
          </Link>
          <div className={styles.icon}>
            {bookMarks.find((item: { id: string }) => item.id === id) ? (
              <div className="add-to-cart" onClick={onClickRemove}>
                delete from <FontAwesomeIcon icon={faBookmark} />
              </div>
            ) : (
              <div
                className="add-to-cart"
                onClick={() => dispatch(addFavourite(props))}
              >
                add to <FontAwesomeIcon icon={faBookmark} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="card_content">
        <span className="date">{date}</span>
        <h3 className="title">{title}</h3>
      </div>
    </article>
  );
};

export default SmallCard;
