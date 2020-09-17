import React, { useReducer } from "react";
import siteReducer from "./siteReducer";
import SiteContext from "./siteContext";
import axios from "axios";

import {
  FETCH_APARTMENT,
  LOADING,
  CLEAR_APARTMENT_SEARCH_RESULTS,
} from "../Types";

const SiteState = (props) => {
  const initialState = {
    numApartmentsFetched: "",
    loading: false,
    apartmentData: "",
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const fetchApartments = async (aptName) => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/apartments/search/?name=${aptName}`
    );

    var aptData = res.data;
    dispatch({ type: FETCH_APARTMENT, payload: aptData });
  };

  const clearApartmentSearchResults = () => {
    dispatch({ type: CLEAR_APARTMENT_SEARCH_RESULTS });
  };

  const setLoading = () => {
    dispatch({ type: LOADING });
  };

  return (
    <SiteContext.Provider
      value={{
        numApartmentsFetched: state.numApartmentsFetched,
        loading: state.loading,
        apartmentData: state.apartmentData,
        fetchApartments,
        clearApartmentSearchResults,
        setLoading,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
