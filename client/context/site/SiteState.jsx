import React, { useReducer } from "react";
import siteReducer from "./siteReducer";
import SiteContext from "./siteContext";
import axios from "axios";
import keys from "../../utils/keys"

import {
  FETCH_APARTMENT,
  FETCH_APARTMENT_ERROR,
  LOADING,
  CLEAR_APARTMENT_SEARCH_RESULTS,
  CLEAR_ERROR
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
        `${keys.API_PROXY}/apartments/search/?name=${aptName}`
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

  const validateApartmentSelection = async (message) => {
    dispatch({type: FETCH_APARTMENT_ERROR, payload: message})
    setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
  }

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
        validateApartmentSelection,
        setLoading,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
