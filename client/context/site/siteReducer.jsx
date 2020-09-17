import {
  FETCH_APARTMENT,
  LOADING,
  CLEAR_APARTMENT_SEARCH_RESULTS,
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
    default:
      return state;
  }
};

export default siteReducer;
