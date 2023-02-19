import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./index.scss";
import { useAppDispatch } from "./app/hooks";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import { useAppSelector } from "./app/hooks";
import { fetchRefresh } from "./appSlices/SignInSlice";

function App() {
  const DarkTheme = useAppSelector((state) => state.Theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const user = localStorage.getItem("user");
      if (user && JSON.parse(user).refresh) {
        dispatch(fetchRefresh({ refresh: JSON.parse(user).refresh }));
      }
    }, 400000);
    return () => clearInterval(refreshInterval);
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isShows, setisShows] = useState(false);

  return (
    <div className={DarkTheme ? "dark" : "light"}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isShows={isShows}
        setisShows={setisShows}
      />
      <Routes>
        <Route
          index
          path="/*"
          element={<Home isShows={isShows} searchTerm={searchTerm} />}
        />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/posts/:id" element={<SinglePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
