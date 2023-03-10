import SmallCard from "../SmallCard";
import style from "./favorites.module.scss";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";

function Favorites() {
  const favourite = useAppSelector((state) => state.posts.favourites);

  return (
    <>
      <div className={style.wrap}>
        {favourite.map((post) => (
          <Link key={post.id} className="post" to={`/posts/${post.id}`}>
            <SmallCard {...post} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Favorites;
