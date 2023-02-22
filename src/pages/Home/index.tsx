import { useAppSelector, useAppDispatch } from "../../app/hooks";
import style from "./home.module.scss";
import Posts from "../../components/Posts";
import SearchComponents from "../../components/SearchComponents";
import Pagination from "../../components/Pagination";
import Tabs from "../../components/Tabs";
import { Route, Routes } from "react-router-dom";
import Favorites from "../../components/Favourites";
import {
  setCurrentPage,
  fetchPaginatePosts,
  setFilter,
} from "../../appSlices/filterSlice";
import { useEffect, useRef, useCallback } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

interface SearchProps {
  isShows: boolean;
  searchTerm: string;
}

const Home: React.FC<SearchProps> = (props) => {
  const { currentPage } = useAppSelector((state) => state.filterPosts);
  const dispatch = useAppDispatch();
  // const isSearch = useRef(false);
  // const isMounted = useRef(false);
  // const navigate = useNavigate();
  const { isShows, searchTerm } = props;

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // const onChangePage = useCallback((currentPage: number) => {
  //   dispatch(setCurrentPage(currentPage));
  // }, []);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     dispatch(setFilter({ ...params }));
  //     isSearch.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchPaginatePosts(currentPage)); //currentPage
  // }, []);
  // console.log(currentPage);

  // useEffect(() => {
  //   window.scroll(0, 0);
  //   if (!isSearch.current) {
  //     dispatch(fetchPaginatePosts(currentPage));
  //   }
  //   isSearch.current = false;
  // }, [currentPage]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  //   // пропадает active кнопки при обновлении страницы, но выбранные категории работают
  // }, [currentPage]);

  return (
    <>
      <section className={style.sectionPosts}>
        <div className="container">
          {isShows ? (
            <>
              <SearchComponents searchTerm={searchTerm} />
            </>
          ) : (
            <>
              <h1 className="MainTitle">Blog</h1>
              <Tabs />
              <Routes>
                <Route index path="/*" element={<Posts />} />
                <Route path="/favourites" element={<Favorites />} />
              </Routes>
              <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default Home;
