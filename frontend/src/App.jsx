import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { API_URL } from "../utils/constants";

export const App = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setPlanets([]);
    setLoading(true);
    try {
      const response = await fetch(API_URL + "data");
      const data = await response.json();
      setLoading(false);
      setPlanets(data.planets);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-4 px-3 mx-auto d-flex flex-column align-items-center">
      <button
        className="btn btn-primary fw-semibold px-4"
        type="button"
        onClick={fetchData}
        disabled={loading}
      >
        Get Planets
      </button>
      <hr className="bg-black w-100" />
      {loading && <div>Loading</div>}
      {planets.length !== 0 &&
        planets.map((planet) => {
          return <div key={planet}>{planet}</div>;
        })}
    </div>
  );
};
