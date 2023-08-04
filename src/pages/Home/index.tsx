import { useAppSelector, useAppDispatch } from "../../app/hooks";
import style from "./home.module.scss";
import Filter from "../../components/Filter/index";
import SmallCard from "../../components/SmallCard";
import Skeleton from "../../components/Posts/Skeleton";
import Sort from "../../components/Sort";
import Pagination from "../../components/Pagination";
import emogy from "../../img/empty-favorites.png";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../appSlices/filterSlice";
import { useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { sortList } from "../../components/Sort";
import { fetchPost, selectPosts } from "../../appSlices/postsSlice";
import MobileSearch from "../../components/MobileSearch";

const Home = () => {
  const { posts, status } = useAppSelector(selectPosts);
  const { categoryId, sort, currentPage, searchValue } =
    useAppSelector(selectFilter);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPosts = async () => {
    const search = searchValue ? `&title_like=${searchValue}` : "";
    dispatch(
      fetchPost({
        categoryId,
        search,
        sort,
        currentPage,
      })
    );
  };

  //если был первый рендер, то проверяем url параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      //когда передаем в парс нельзя передавать '?' для этого использ substring
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  //если был первый рендер, то запрашиваем посты
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPosts();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //если изменили параметры и был первый ренедер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const Posts = posts.map((post: any) => <SmallCard key={post.id} {...post} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <section className={style.sectionPosts}>
        <div className="container">
          <h1 className="main_title">Blog</h1>
          <div className={style.wrap_top}>
            <MobileSearch />
            <Filter value={categoryId} onClickCategory={onClickCategory} />
            <Sort />
          </div>
          <div className={style.wrap}>
            {status === "error" ? (
              <div className={style.errorInfo}>
                <h2 className="errorInfo_title">OOPS!</h2>

                <p className="errorInfo_text">Sorry. There was an error.</p>
                <img src={emogy} alt="Error cart" />
              </div>
            ) : (
              <>{status === "loading" ? skeletons : Posts}</>
            )}
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
      </section>
    </>
  );
};
export default Home;
