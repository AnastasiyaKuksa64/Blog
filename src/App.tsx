import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./index.scss";
import { useAppDispatch } from "./app/hooks";
import Home from "./pages/Home";
import FullPage from "./pages/FullPage";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import { useAppSelector } from "./app/hooks";
import { fetchRefresh, isLogin } from "./appSlices/SignInSlice";
import Favorites from "./components/Favourites";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";

function App() {
  // const DarkTheme = useAppSelector((state) => state.Theme);
  const isLoggedIn = useAppSelector((state) => state.User.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).refresh) {
      dispatch(fetchRefresh({ refresh: JSON.parse(user).refresh }));
    }
    const verifyInterval = setInterval(() => {
      if (user && JSON.parse(user).refresh) {
        dispatch(fetchRefresh({ refresh: JSON.parse(user).refresh }));
      }
    }, 300000);

    return () => clearInterval(verifyInterval);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).access && isLoggedIn) {
      dispatch(isLogin(JSON.parse(user).access));
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index path="" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/favourites" element={<Favorites />} />
        <Route path="/posts/:id" element={<FullPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
