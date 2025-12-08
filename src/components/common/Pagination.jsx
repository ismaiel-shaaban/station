"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log('llllll' ,totalPages ,currentPage);
  

  return (
    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
      <li className={`page-item ${currentPage == 1 && "disabled"}`}>
        <button
          className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage == 1}
        >
          <Icon icon="ep:d-arrow-left" />
        </button>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${page === currentPage && "active"}`}
        >
          <button
            className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px ${
              page === currentPage
                ? "bg-primary-600 text-white"
                : "bg-neutral-200 text-secondary-light"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
        <button
          className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon icon="ep:d-arrow-right" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
