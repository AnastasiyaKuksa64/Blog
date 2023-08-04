import BigCard from "../../components/BigCard";
import emogy from "../../img/empty-favorites.png";
import styles from "./FullPage.module.scss";
import { useParams, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchPostById } from "../../appSlices/postsSlice";
import SkeletonPage from "../../components/Posts/SkeletonPage";
import { selectPosts } from "../../appSlices/postsSlice";

const FullPage: React.FC = () => {
  const { id } = useParams();
  //используем чтобы оповестить компонент о том что нужно сделать перерисовку и вернуть в переменную те динамические параметры(/:id - это динамические, sort=...-это не динамические параметры) которые будем передавать если они будут содержаться
  const post = useAppSelector((state) => state.posts.post);
  const { status } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchPostById(id));
  }, [id]);

  return (
    <section className={styles.full_page}>
      <div className="page_container">
        <div className={styles.wrap}>
          {status === "error" ? (
            <div className={styles.errorInfo}>
              <h2 className="errorInfo_title">OOPS!</h2>
              <p className="errorInfo_text">
                Sorry. There was an error. We can't find this post{" "}
              </p>
              <img src={emogy} alt="Error cart" />
              <button className={styles.link_button}>
                <Link to="/">Go to home page</Link>
              </button>
            </div>
          ) : (
            <>{post ? <BigCard {...post} /> : <SkeletonPage />}</>
          )}
        </div>
      </div>
    </section>
  );
};
export default FullPage;
