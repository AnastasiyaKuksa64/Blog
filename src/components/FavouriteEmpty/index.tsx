import { useNavigate } from "react-router-dom";
import cartEmptyImg from "../../img/empty-favorites.png";
import style from "./FavouriteEmpty.module.scss";

const FavouriteEmpty = () => {
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className={style.post_empty}>
      <h2 className="empty_title">Empty</h2>
      <div className="empty_text">
        <p>Your favorites are empty for now. </p>
        <p>
          To add items to your favorites,mouse over the photo, click on the "Add
          to " in the middle of the photo.
        </p>
      </div>
      <img src={cartEmptyImg} alt="Empty cart" />
      <button onClick={goHome}>Go to home page</button>
    </div>
  );
};

export default FavouriteEmpty;
