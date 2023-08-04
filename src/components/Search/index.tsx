import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from "./search.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { useRef, useCallback } from "react";
import { setSearchValue } from "../../appSlices/filterSlice";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const inputSearch = useRef<any>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputSearch.current.focus();
  };

  const searchWithDebounce = useCallback(
    useDebounce((e: any) => {
      console.log(e);
      dispatch(setSearchValue(e));
    }, 1000),
    []
  );

  const onChangeInput = (e: any) => {
    setValue(e.target.value);
    searchWithDebounce(e.target.value);
  };

  return (
    <div className={style.search}>
      <input
        className={style.search__input}
        ref={inputSearch}
        value={value}
        placeholder="Search..."
        onChange={onChangeInput}
      />
      {value && (
        <div className={style.search__clear} onClick={onClickClear}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      )}
    </div>
  );
};
const useDebounce = (func: any, milliseconds: number) => {
  const time = milliseconds || 400;
  let timer: any;

  return (value: any) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, value);
  };
};

export default Search;
