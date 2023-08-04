import SmallCard from "../SmallCard";
import style from "./favorites.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import FavouriteEmpty from "../FavouriteEmpty";
import { deliteAllFavourite, selectPosts } from "../../appSlices/postsSlice";

function Favorites() {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector(selectPosts);

  const DeleteAll = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deliteAllFavourite(favourites));
    }
  };

  return (
    <section className="favourite">
      <div className="container">
        <h1 className="main_title">Favourite</h1>
        <div className={style.wrap}>
          {favourites.length < 1 ? (
            <FavouriteEmpty />
          ) : (
            <>
              <div className={style.button_wrap}>
                <Link className="link_home" to="/">
                  Back to Home /
                </Link>
                <button onClick={DeleteAll} className="deleteAll">
                  Delete All
                </button>
              </div>
              <div className={style.posts_wrap}>
                {favourites.map((post: any) => (
                  <SmallCard key={post.id} {...post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Favorites;
