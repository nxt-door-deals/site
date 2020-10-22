import React, { useReducer } from "react";
import siteReducer from "./siteReducer";
import SiteContext from "./siteContext";
import axios from "axios";
import {API_PROXY} from "../../utils/keys"

import {
  FETCH_APARTMENT,
  FETCH_APARTMENT_ERROR,
  LOADING,
  CLEAR_APARTMENT_SEARCH_RESULTS,
} from "../Types";

const SiteState = (props) => {
  const initialState = {
    numApartmentsFetched: "",
    fetchError: null,
    loading: false,
    apartmentData: "",
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const fetchApartments = async (aptName) => {
    try {
      const res = await axios.get(
        `${API_PROXY}/apartments/search/?name=${aptName}`
      );

      dispatch({ type: FETCH_APARTMENT, payload: res.data });
    } catch (err) {
      dispatch({
        type: FETCH_APARTMENT_ERROR,
        payload: err.response.data.detail,
      });
    }
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
        fetchError: state.fetchError,
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
