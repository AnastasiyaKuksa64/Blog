import { useAppSelector, useAppDispatch } from "../../app/hooks";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styles from "./sort.module.scss";
import { selectFilter, setSort } from "../../appSlices/filterSlice";

export const sortList = [
  { name: "popular(desc)", sortProperty: "rating" },
  { name: "popular(asc)", sortProperty: "-rating" },
  { name: "alphabet(desc)", sortProperty: "title" },
  { name: "alphabet(asc)", sortProperty: "-title" },
];

const Sort: React.FC = () => {
  const { sort } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  //desc - descending

  const [active, setActive] = useState(false);
  const sortRef = useRef() as any;

  const onClickListItem = (obj: object) => {
    dispatch(setSort(obj));
    setActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setActive(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className={styles.sort}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b className="label">Sorting by:</b>
        <span className="sort_name" onClick={() => setActive(!active)}>
          {sort.name}
        </span>
      </div>
      {active && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty
                    ? `${styles.active}`
                    : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
