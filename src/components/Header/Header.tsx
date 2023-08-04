import style from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/hooks";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import LogOut from "../LogOut/logoutLink";
import User from "../User/user";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Search from "../Search/index";

interface SearchProps {}

const Header: React.FC<SearchProps> = () => {
  const faUserIcon = faUser as IconProp;
  const faHeartIcon = faHeart as IconProp;
  const isLogin = useAppSelector((state) => state.User.isLoggedIn);
  const location = useLocation();
  //используем если хотим по условному рендеру в зависимости от того что у нас в адресной строчке рендерить что-то. Дает понять что не только адресная строчка поменялась но компоненту нужно сделать перерисовку

  return (
    <>
      <section className="header">
        <div className={style.container}>
          <div className={style.wrap}>
            <div className={style.logo}>
              <NavLink className={style.logo__title} to="/">
                <div>Blog</div>
              </NavLink>
            </div>
            <Search />
            {isLogin ? (
              <div className={style.menu_wrap}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${style.btn_link} ${style.active}`
                      : `${style.btn_link}`
                  }
                  to="/favourites"
                >
                  <FontAwesomeIcon icon={faHeartIcon} />
                </NavLink>
                <div className={style.icon_wrap}>
                  <User />
                  <LogOut />
                </div>
              </div>
            ) : (
              <nav className={style.link_wrap}>
                {location.pathname !== "/favourites" ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `${style.btn_link} ${style.active}`
                        : `${style.btn_link}`
                    }
                    to="/favourites"
                  >
                    <FontAwesomeIcon icon={faHeartIcon} />
                  </NavLink>
                ) : (
                  <NavLink className={style.btn_active} to="/favourites">
                    <FontAwesomeIcon icon={faHeartIcon} />
                  </NavLink>
                )}

                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${style.btn_link} ${style.active}`
                      : `${style.btn_link}`
                  }
                  to="/signIn"
                >
                  <FontAwesomeIcon icon={faUserIcon} />
                </NavLink>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
