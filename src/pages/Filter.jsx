import React, { useState, useEffect } from "react";

import ResultsPage from "../components/ResultsPage";
import { useStateContext } from "../context/stateContext";

function Details() {
  const { searchType, setSearchType } = useStateContext();
  const { query, setQuery } = useStateContext();

  return (
    <div>
      <div>
        <ResultsPage />
      </div>
    </div>
  );
}

export default Details;
