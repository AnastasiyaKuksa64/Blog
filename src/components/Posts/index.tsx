import SmallCard from "../../components/SmallCard";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";
import style from "./posts.module.scss";
import {
  fetchFilteredPosts,
  setCategoryId,
  setFilter,
} from "../../appSlices/filterSlice";
import { useNavigate } from "react-router-dom";
import FilterButton from "../../components/filterButten";
import { useEffect, useRef } from "react";
import qs from "qs";

const Posts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { filterPosts, categoryId } = useAppSelector(
    (state) => state.filterPosts
  );

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  // проверка URL-параметров при первом рендере и сохраняю в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilter({ ...params }));
      isSearch.current = true;
    }
  }, []);

  // url-параметры при первом рендере сразу появляются, почему?
  // если был первый рендер, запрашивает посты
  useEffect(() => {
    // window.scroll(0, 0);
    if (!isSearch.current) {
      dispatch(fetchFilteredPosts(categoryId));
    }
    isSearch.current = false;
  }, [categoryId]);

  // если изменились параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // пропадает active кнопки при обновлении страницы, но выбранные категории работают
  }, [categoryId]);

  return (
    <>
      <div className={style.wrap_filter}>
        <FilterButton value={categoryId} onClickCategory={onClickCategory} />
      </div>
      <div className={style.wrap}>
        {filterPosts.map((post) => (
          <Link className="post" key={post.id} to={`/posts/${post.id}`}>
            <SmallCard {...post} />
          </Link>
        ))}
      </div>
    </>
  );
};
export default Posts;
