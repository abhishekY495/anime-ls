import React, { useContext, useEffect, useState } from "react";
import "./AnimeList.css";

import { searchAnime } from "../services/searchAnimes";
import { OptionsModal } from "./modals/OptionsModal";
import { AnimesDataContext } from "../contexts/AnimesDataContext";

export const AnimeList = ({
  animesData,
  pagination,
  dispatch,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [animeDetails, setAnimeDetails] = useState({});

  const openOptionsModal = () => setShowOptionsModal(true);
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

  const selectAnime = (anime) => {
    openOptionsModal();
    const animeData = {
      title: anime.title,
      coverImage:
        anime.images.webp.large_image_url || anime.images.webp.image_url,
      link: anime.url,
    };
    dispatch({ type: "SET_SELECTED_ANIME", payload: animeData });
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollHandler);
    return () => window.removeEventListener("scroll", infiniteScrollHandler);
  }, [currentPage]);

  return (
    <div className="anime-list">
      <OptionsModal
        showOptionsModal={showOptionsModal}
        openOptionsModal={openOptionsModal}
        closeOptionsModal={closeOptionsModal}
      />
      {animesData?.map((anime) => {
        return (
          <div
            className="anime text-decoration-none text-white"
            key={anime?.mal_id}
            target="_blank"
            title={anime?.title_english || anime?.title}
            onClick={() => selectAnime(anime)}
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
