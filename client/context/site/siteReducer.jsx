import { faGalacticSenate } from "@fortawesome/free-brands-svg-icons";
import {
  FETCH_APARTMENT,
  FETCH_APARTMENT_ERROR,
  CREATE_APARTMENT,
  CREATE_APARTMENT_ERROR,
  LOADING,
  LOADING_UNSET,
  CLEAR_APARTMENT_SEARCH_RESULTS,
  CLEAR_ERROR,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAILURE,
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
    case CREATE_APARTMENT:
      return {
        ...state,
        loading: false,
        submittedNeighbourhood: action.payload,
        apartmentCreated: true,
      };
    case CREATE_APARTMENT_ERROR:
      return {
        ...state,
        loading: false,
        apartmentCreated: false,
        apartmentCreationError: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADING_UNSET:
      return {
        ...state,
        loading: false,
      };
    case CREATE_AD_SUCCESS:
      return {
        ...state,
        loading: false,
        adCreated: true,
      };
    case CREATE_AD_FAILURE:
      return {
        ...state,
        loading: false,
        adCreated: false,
        adCreationError: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        fetchError: null,
      };
    case EMAIL_SEND_SUCCESS:
      return {
        ...state,
        emailSent: true,
      };
    case EMAIL_SEND_FAILURE:
      return {
        ...state,
        emailSent: false,
      };
    default:
      return state;
  }
};

export default siteReducer;
