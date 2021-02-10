import {
  LOAD_APARTMENTS,
  FETCH_APARTMENT,
  FETCH_APARTMENT_ERROR,
  FETCH_APARTMENT_NAME,
  FETCH_APARTMENT_NAME_ERROR,
  FETCH_NBH_AD_SUCCESS,
  FETCH_NBH_AD_FAILURE,
  CREATE_APARTMENT,
  CREATE_APARTMENT_ERROR,
  LOADING,
  LOADING_UNSET,
  CLEAR_APARTMENT_SEARCH_RESULTS,
  CLEAR_ERROR,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
  UPDATE_AD_SUCCESS,
  UPDATE_AD_FAILURE,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAILURE,
  VERIFY_NEIGHBOURHOOD_SUCCESS,
  VERIFY_NEIGHBOURHOOD_FAILURE,
  DELETE_AD_IMAGE,
  CHAT_HISTORY_LOADED,
  CHAT_ERROR,
  REPORTED_AD_SUCCESS,
  REPORTED_AD_FAILURE,
} from "../Types";

const siteReducer = (state, action) => {
  switch (action.type) {
    case LOAD_APARTMENTS:
      return {
        ...state,
        allApartments: action.payload,
      };
    case FETCH_APARTMENT:
      return {
        ...state,
        apartmentData: action.payload,
        numApartmentsFetched: action.payload.length,
        loading: false,
      };
    case FETCH_APARTMENT_NAME:
      return {
        ...state,
        apartmentData: action.payload,
      };
    case FETCH_APARTMENT_NAME_ERROR:
    case FETCH_APARTMENT_ERROR:
    case CHAT_ERROR:
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
        adError: action.payload,
      };
    case UPDATE_AD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_AD_FAILURE:
      return {
        ...state,
        loading: false,
        adError: action.payload,
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
    case VERIFY_NEIGHBOURHOOD_SUCCESS:
      return {
        ...state,
        neighbourhoodVerified: true,
        verifiedNeighbourhoodDetails: action.payload,
      };
    case VERIFY_NEIGHBOURHOOD_FAILURE:
      return {
        ...state,
        neighbourhoodVerified: false,
      };
    case FETCH_NBH_AD_SUCCESS:
      return {
        ...state,
        adsDataNbh: action.payload,
        adsDataNbhFetched: true,
      };
    case FETCH_NBH_AD_FAILURE:
      return {
        ...state,
        adsDataNbhFetched: false,
      };
    case DELETE_AD_IMAGE:
      return {
        ...state,
        adError: action.payload,
      };
    case CHAT_HISTORY_LOADED:
      return {
        ...state,
        chatHistory: action.payload,
      };
    case REPORTED_AD_SUCCESS:
      return {
        ...state,
        reportedAd: action.payload,
      };
    case REPORTED_AD_FAILURE:
      return {
        ...state,
        adError: action.payload,
      };
    default:
      return state;
  }
};

export default siteReducer;
