import React, { useEffect, useState } from "react";

import { searchAnime } from "../services/searchAnimes";
import { OptionsModal } from "./modals/OptionsModal";

export const AnimeList = ({
  animesData,
  pagination,
  dispatch,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [animeDetails, setAnimeDetails] = useState({});

  const openOptionsModal = (details) => setShowOptionsModal(true);
  const closeOptionsModal = () => setShowOptionsModal(false);

  const infiniteScrollHandler = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (windowHeight + scrollTop + 10 > scrollHeight) {
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
      <OptionsModal
        showOptionsModal={showOptionsModal}
        closeOptionsModal={closeOptionsModal}
      />
      {animesData?.map((anime) => {
        return (
          <div
            className="anime text-decoration-none text-white"
            key={anime?.mal_id}
            target="_blank"
            title={anime?.title_english || anime?.title}
            onClick={() => openOptionsModal(anime)}
          >
            <img
              src={anime?.images?.webp?.large_image_url}
              alt={anime?.title_english || anime?.title}
            />
            <p className="text-truncate fs-5 fw-semibold anime-title">
              {anime?.title_english || anime?.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};
