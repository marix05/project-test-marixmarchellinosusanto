"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// icon
import { GrPrevious, GrNext } from "react-icons/gr";

function convertDate(d) {
  const date = new Date(d);

  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

const IdeaList = () => {
  // fetch data
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedPerPage = parseInt(
        window.localStorage.getItem("perPage"),
        10
      );
      return !isNaN(storedPerPage) ? storedPerPage : 10;
    }
    return 10;
  });
  const [sortBy, setSortBy] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSortBy = window.localStorage.getItem("sortBy");
      return storedSortBy || "newest";
    }
    return "newest";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCurrentPage = parseInt(
        window.localStorage.getItem("currentPage"),
        10
      );
      return !isNaN(storedCurrentPage) ? storedCurrentPage : 1;
    }
    return 1;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://suitmedia-backend.suitdev.com/api/ideas",
          {
            params: {
              "page[number]": currentPage,
              "page[size]": perPage,
              append: ["small_image", "medium_image"],
              sort: sortBy === "newest" ? "-published_at" : "published_at",
            },
          }
        );

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    window.localStorage.setItem("perPage", perPage);
    window.localStorage.setItem("sortBy", sortBy);
    window.localStorage.setItem("currentPage", currentPage);
  }, [perPage, sortBy, currentPage]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full my-40">
        <p className="text-6xl">Loading...</p>
      </div>
    );
  if (!data || !data.data || !data.data.length)
    return (
      <div className="flex justify-center items-center w-full my-40">
        <p className="text-6xl">No Data</p>
      </div>
    );

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const ideas = data.data;
  const meta = data.meta;

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(meta.total / perPage);
    const pages = [];
    const maxVisiblePages = 5;

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    const startIndex = Math.max(
      0,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endIndex = Math.min(totalPages - 1, startIndex + maxVisiblePages - 1);

    const slicedPages = pages.slice(startIndex, endIndex + 1);

    return slicedPages.map((pageNumber) => (
      <button
        key={pageNumber}
        className={`py-1 px-2 rounded-sm text-sm ${
          currentPage === pageNumber
            ? "bg-orange-500 text-white"
            : "hover:bg-orange-500 hover:text-white"
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="container my-14 mx-auto">
      <div className="text-sm w-full flex flex-wrap gap-4 flex-col justify-center md:flex-row md:justify-between">
        <span>
          Showing {meta.from} - {meta.to} of {meta.total}
        </span>
        <div className="filter flex flex-wrap gap-4 justify-center">
          <div className="dropdown-menu">
            <label htmlFor="pageSize">Show per page: </label>
            <select
              name="pageSize"
              id="pageSize"
              onChange={handlePerPageChange}
              value={perPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="dropdown-menu">
            <label htmlFor="sortBy">Sort by: </label>
            <select
              name="sortBy"
              id="sortBy"
              onChange={handleSortByChange}
              value={sortBy}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
        {ideas.map((idea, index) => {
          return (
            <div
              className="card shadow-xl rounded-[10px]  bg-primary-foreground"
              key={index}
            >
              <img
                src={idea.medium_image[0]?.url}
                className="object-cover h-[200px] w-full rounded-t-[10px]"
                loading="lazy"
                alt=""
              />
              <div className="p-4 text-[#000]">
                <p className="text-sm mb-1">{convertDate(idea.published_at)}</p>
                <h1
                  className="font-semibold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {idea.title}
                </h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-20">
        <nav className="flex items-center flex-wrap gap-4">
          <button
            className="py-1 px-2 rounded-sm bg-orange-500 text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </button>
          {renderPageNumbers()}
          <button
            className="py-1 px-2 rounded-sm bg-orange-500 text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(data?.meta?.total / perPage)}
          >
            <GrNext />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default IdeaList;

// s
