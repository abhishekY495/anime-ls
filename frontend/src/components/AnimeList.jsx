import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchAnime } from "../services/searchAnimes";

export const AnimeList = ({
  animesData,
  pagination,
  dispatch,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const infiniteScrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (windowHeight + scrollTop + 1 > scrollHeight) {
      if (pagination?.last_visible_page !== currentPage) {
        setCurrentPage((prevPage) => prevPage + 1);
        searchAnime(searchQuery, currentPage + 1, dispatch);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollHandler);
    return () => window.removeEventListener("scroll", infiniteScrollHandler);
  }, [currentPage]);

  return (
    <div className="anime-list">
      {animesData?.map((anime) => {
        return (
          <Link
            to={anime?.url}
            className="anime text-decoration-none text-white"
            key={anime?.mal_id}
            target="_blank"
            title={anime?.title_english || anime?.title}
          >
            <img
              src={anime?.images?.webp?.large_image_url}
              alt={anime?.title_english || anime?.title}
            />
            <p className="text-truncate fs-5 fw-semibold anime-title">
              {anime?.title_english || anime?.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
