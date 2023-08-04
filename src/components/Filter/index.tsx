import React from "react";
import style from "./filter.module.scss";
import { useState, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

interface categoryProps {
  value: number;
  onClickCategory: Dispatch<SetStateAction<any>>;
}

const Filter: React.FC<categoryProps> = ({ value, onClickCategory }) => {
  const categories = ["without filter", "space", "forest", "animals"];
  const [isShows, setisShows] = useState(false);

  return (
    <div className={style.wrap}>
      <ul className={style.filter}>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={
              value === i
                ? `${"filter_button"} ${style.active}`
                : "filter_button"
            }
          >
            {category}
          </li>
        ))}
      </ul>
      <div className={style.dropdown_filter}>
        <button
          className={style.filter_tab}
          onClick={() => setisShows(!isShows)}
        >
          Filter
          <FontAwesomeIcon icon={faSortDown} />
        </button>
        {isShows && (
          <ul className={style.filter_block}>
            {categories.map((category, i) => (
              <li
                key={i}
                onClick={() => onClickCategory(i)}
                className={
                  value === i
                    ? `${style.filter_item} ${style.active}`
                    : `${style.filter_item}`
                }
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
