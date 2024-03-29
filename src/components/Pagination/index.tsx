import React from "react";
import style from "./pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pgination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => {
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={6}
        pageCount={5}
        forcePage={currentPage - 1}
      />
    </>
  );
};
export default Pgination;
