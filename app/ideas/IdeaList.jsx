"use client";
import { useState, useEffect } from "react";

// icon
import { GrPrevious, GrNext } from "react-icons/gr";

function convertDate(d) {
  const date = new Date(d);

  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

const IdeaList = () => {
  // fetch data
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async (
    pageNumber = 1,
    pageSize = 10,
    sortBy = "-published_at"
  ) => {
    const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortBy}`;
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const ideas = data.data;
  const meta = data.meta;

  return (
    <div className="container my-14 mx-auto">
      <div className="text-sm w-full flex flex-wrap gap-4 flex-col justify-center md:flex-row md:justify-between">
        <span>
          Showing {meta.from} - {meta.to} of {meta.total}
        </span>
        <div className="filter flex flex-wrap gap-4 justify-center">
          <div className="dropdown-menu">
            <label htmlFor="pageSize">Show per page: </label>
            <select name="pageSize" id="pageSize">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="dropdown-menu">
            <label htmlFor="sortBy">Sort by: </label>
            <select name="sortBy" id="sortBy">
              <option value="-published_at">Newest</option>
              <option value="published_at">Latest</option>
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
                src={idea.medium_image[0].url}
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

      <div className="paggination flex justify-center my-20">
        <div className="flex flex-wrap justify-center gap-2">
          {meta.links.map((link, index) => {
            return (
              <div
                key={index}
                className={`py-1 px-2 text-xs ${
                  link.active
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                } ${!link.url && "relative bg-fill-shadow-sm"}`}
              >
                {index == 0 ? (
                  <GrPrevious />
                ) : index == meta.links.length - 1 ? (
                  <GrNext />
                ) : (
                  link.label
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IdeaList;
