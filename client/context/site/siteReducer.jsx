import {
  FETCH_APARTMENT,
  FETCH_APARTMENT_ERROR,
  LOADING,
  CLEAR_APARTMENT_SEARCH_RESULTS,
  CLEAR_ERROR,
} from "../Types";

const siteReducer = (state, action) => {
  switch (action.type) {
    case FETCH_APARTMENT:
      return {
        ...state,
        apartmentData: action.payload,
        numApartmentsFetched: action.payload.length,
        loading: false,
      };
    case FETCH_APARTMENT_ERROR:
      return {
        ...state,
        fetchError: action.payload,
      };
    case CLEAR_APARTMENT_SEARCH_RESULTS:
      return {
        ...state,
        apartmentData: "",
        numApartmentsFetched: "",
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        fetchError: null
      }
    default:
      return state;
  }
};

export default siteReducer;
