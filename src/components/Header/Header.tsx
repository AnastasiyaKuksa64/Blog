import style from "./header.module.scss";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/hooks";
import { faUser, faBars, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import SearchBox from "../SearchBox/index";
import SearchBoxMobile from "../SearchBoxMobile";
import LogOut from "../LogOut/logoutLink";
import User from "../User/user";

interface SearchBoxProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isShows: boolean;
  setisShows: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
}

const Header: React.FC<SearchBoxProps> = (props) => {
  const { isShows, setisShows, searchTerm, setSearchTerm } = props;
  const Search = useAppSelector((state) => state.searchTerm.search);
  const isLogin = useAppSelector((state) => state.User.isLoggedIn);
  const [isActive, setIsActive] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    setisShows(!!Search.length);
  }, [searchTerm]);

  return (
    <>
      <section className="Header">
        <div className={style.container}>
          <div className={style.wrap}>
            <div className={style.wrapButton}>
              <Link className={style.menuButton} to="/">
                Blogologo
              </Link>
            </div>
            <SearchBox
              setSearchTerm={setSearchTerm}
              isShows={isShows}
              setisShows={setisShows}
              SearchTerm={searchTerm}
            />
            <div className={style.wrapLink}>
              <Link className={style.link} to="/signIn">
                {isLogin ? (
                  <div className={style.user_wrap}>
                    <User />
                    <div className={style.parent}>
                      <button
                        className={style.button_user}
                        onClick={() => setIsClick(!isClick)}
                      >
                        <FontAwesomeIcon
                          className={style.icon_down}
                          icon={faSortDown}
                        />
                      </button>
                      {isClick && (
                        <div className={style.wrap_user}>
                          <LogOut />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={style.authorIcon}>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span className="AuthorName">Sign in</span>
                  </>
                )}
              </Link>
            </div>
            <div className={style.burger}>
              <div className={style.wrap_burger}>
                <button
                  className={style.burger_button}
                  onClick={() => setIsActive(!isActive)}
                >
                  <FontAwesomeIcon
                    className={style.burger_icon}
                    icon={faBars}
                  />
                </button>
              </div>

              {isActive && (
                <div className={style.menu__show}>
                  {isLogin ? (
                    <div className={style.wr}>
                      <SearchBoxMobile
                        setSearchTerm={setSearchTerm}
                        isShows={isShows}
                        setisShows={setisShows}
                        SearchTerm={searchTerm}
                      />
                      <User />
                      <LogOut />
                    </div>
                  ) : (
                    <div className={style.wr}>
                      <SearchBoxMobile
                        setSearchTerm={setSearchTerm}
                        isShows={isShows}
                        setisShows={setisShows}
                        SearchTerm={searchTerm}
                      />
                      <div className={style.wrap_link}>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? `${style.burger_link} ${style.active}`
                              : `${style.burger_link}`
                          }
                          to="/signIn"
                        >
                          Sign in
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
