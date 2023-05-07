import { useEffect, useState } from "react";
import "./Pagination.css";

export default function Pagination({ currentPage, setCurrentPage, totalPage }) {
  const [paginationFrom, setPaginationFrom] = useState(1);
  const [paginationTo, setPaginationTo] = useState(1);

  useEffect(() => {
    if (totalPage>5) {
      setPaginationFrom(currentPage > totalPage - 5 ? totalPage - 4 : currentPage);
    }else{
      setPaginationFrom(1)
    }
    setPaginationTo(currentPage > totalPage - 5 ? totalPage : currentPage + 4)
  }, [])

  const numArr = Array.from(
    { length: paginationTo - paginationFrom + 1 },
    (_, i) => paginationFrom + i
  );

  const increment = () => {
    if (totalPage > currentPage) setCurrentPage((prev) => prev + 1);
  };
  const decrement = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  return (
    <>
      {totalPage > 1 && (
        <div className="pagination">
          <div className="pagination-container">
            <span
              className={`pagination-item ${
                currentPage === 1 ? "pagination-item--disable" : ""
              }`}
              onClick={decrement}
            >
              Prev
            </span>
            {numArr.map((num) => (
              <span key={num}
                className={`pagination-item ${
                  currentPage === num ? "pagination-item--active" : ""
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </span>
            ))}
            <span
              className={`pagination-item ${
                currentPage === totalPage ? "pagination-item--disable" : ""
              }`}
              onClick={increment}
            >
              Next
            </span>
          </div>
        </div>
      )}
    </>
  );
}
