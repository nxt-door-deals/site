import React, { useReducer } from "react";
import siteReducer from "./siteReducer";
import SiteContext from "./siteContext";
import axios from "axios";
import keys from "../../utils/keys";
import { setAuthToken, setApiKey } from "../../utils/setToken";

import {
  LOAD_APARTMENTS,
  FETCH_APARTMENT,
  FETCH_APARTMENT_ERROR,
  FETCH_APARTMENT_NAME,
  FETCH_APARTMENT_NAME_ERROR,
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
  VERIFY_NEIGHBOURHOOD_SUCCESS,
  VERIFY_NEIGHBOURHOOD_FAILURE,
  FETCH_NBH_AD_SUCCESS,
  FETCH_NBH_AD_FAILURE,
} from "../Types";

var sendgridKey = "";
var projectKey = "";

if (process.env.NEXT_PUBLIC_ENV === "development") {
  sendgridKey = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;
  projectKey = process.env.NEXT_PUBLIC_PROJECT_API_KEY;
} else if (process.env.NEXT_PUBLIC_ENV === "production") {
  sendgridKey = process.env.SENDGRID_API_KEY;
  projectKey = process.env.PROJECT_API_KEY;
}

// Will be used in the copyright section in the email footer
var currentYear = new Date().getFullYear();

// Email sender
const fromEmail = keys.FROM_EMAIL;

const SiteState = (props) => {
  const initialState = {
    allApartments: "",
    numApartmentsFetched: "",
    fetchError: null,
    loading: false,
    apartmentData: "",
    submittedNeighbourhood: null,
    apartmentCreated: false,
    apartmentCreationError: "",
    adCreated: false,
    adCreationError: "",
    emailSent: null,
    neighbourhoodVerified: null,
    adsDataNbh: [],
    adsDataNbhFetched: false,
    verifiedNeighbourhoodDetails: null,
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const loadAllApartments = async () => {
    try {
      const res = await axios.get(`${keys.API_PROXY}/apartments/all`);

      dispatch({ type: LOAD_APARTMENTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: FETCH_APARTMENT_ERROR,
        payload: err.response.data.detail,
      });
    }
  };

  const createApartment = async (
    name,
    address1,
    address2,
    city,
    state,
    pincode,
    email
  ) => {
    setApiKey(projectKey);
    const jsonPayload = {
      name: name,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      pincode: pincode,
      submitted_by: email,
    };

    try {
      const res = await axios.post(
        `${keys.API_PROXY}/apartments/add`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: CREATE_APARTMENT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CREATE_APARTMENT_ERROR,
        payload: err.response.data.detail,
      });
    }
  };

  const getNeighbourhoodFromId = async (id) => {
    try {
      const res = await axios.get(`${keys.API_PROXY}/apartments/${id}`);
      dispatch({ type: FETCH_APARTMENT_NAME, payload: res.data });
    } catch (err) {
      dispatch({
        type: FETCH_APARTMENT_NAME_ERROR,
        payload: err.response.data.detail,
      });
    }
  };

  const verifyNeighbourhood = async (token) => {
    setApiKey(projectKey);
    token = encodeURIComponent(token);
    try {
      const res = await axios.put(
        `${keys.API_PROXY}/verify/neighbourhood/?token=${token}`
      );

      dispatch({ type: VERIFY_NEIGHBOURHOOD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: VERIFY_NEIGHBOURHOOD_FAILURE });
    }
  };

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
    dispatch({ type: FETCH_APARTMENT_ERROR, payload: message });
    setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
  };

  const setLoading = () => {
    dispatch({ type: LOADING });
  };

  const unsetLoading = () => {
    dispatch({ type: LOADING_UNSET });
  };

  const fetchAdsForNbh = async (nbhId) => {
    try {
      const res = await axios.get(`${keys.API_PROXY}/nbhads/get/${nbhId}`);

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const searchAds = async (nbhId, categoryList, search) => {
    nbhId = encodeURIComponent(nbhId);
    categoryList = encodeURIComponent(categoryList);
    search = encodeURIComponent(search);

    try {
      const res = await axios.get(
        `${keys.API_PROXY}/search/ads?nbh_id=${nbhId}&category=${categoryList}&search_text=${search}`
      );

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const searchGiveaways = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      const res = await axios.get(
        `${keys.API_PROXY}/search/ads/giveaway?nbh_id=${nbhId}`
      );

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const sortByPriceAsc = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      const res = await axios.get(
        `${keys.API_PROXY}/sort/ads/price_asc?nbh_id=${nbhId}`
      );
      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const sortByPriceDesc = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      const res = await axios.get(
        `${keys.API_PROXY}/sort/ads/price_desc?nbh_id=${nbhId}`
      );
      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const sortByDateCreatedAsc = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      let res = await axios.get(
        `${keys.API_PROXY}/sort/ads/created_asc?nbh_id=${nbhId}`
      );

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const sortByDateCreatedDesc = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      let res = await axios.get(
        `${keys.API_PROXY}/sort/ads/created_desc?nbh_id=${nbhId}`
      );

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const sortGiveawayAsc = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      let res = await axios.get(
        `${keys.API_PROXY}/sort/ads/giveaway_asc?nbh_id=${nbhId}`
      );

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const sortGiveawayDesc = async (nbhId) => {
    nbhId = encodeURIComponent(nbhId);
    try {
      let res = await axios.get(
        `${keys.API_PROXY}/sort/ads/giveaway_desc?nbh_id=${nbhId}`
      );

      dispatch({ type: FETCH_NBH_AD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_NBH_AD_FAILURE });
    }
  };

  const createAd = async (
    categoryList,
    title,
    description,
    typeOfSale,
    price,
    negotiable,
    condition,
    availableFrom,
    publishFlatNo,
    userId,
    apartmentId,
    images
  ) => {
    const formData = new FormData();

    formData.set("ad_category", categoryList);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("ad_type", typeOfSale);
    formData.set("price", price);
    formData.set("negotiable", negotiable);
    formData.set("condition", condition);
    formData.set("available_from", availableFrom);
    formData.set("publish_flat_number", publishFlatNo);
    formData.set("posted_by", userId);
    formData.set("apartment_id", apartmentId);
    images !== []
      ? images.forEach((file) => formData.append("images", file))
      : formData.set("images", images);

    try {
      await axios.post(`${keys.API_PROXY}/ads/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: CREATE_AD_SUCCESS });
    } catch (err) {
      dispatch({ type: CREATE_AD_FAILURE, payload: err.response.data.detail });
    }
  };

  // Nbh registration email start
  const sendNbhRegistrationEmailToUser = async (
    apartmentName,
    email,
    currentYear
  ) => {
    setAuthToken(sendgridKey);

    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      email: email,
      apartment_name: apartmentName,
      year: currentYear,
      template_name: "NB_REGISTRATION_PROCESS_START_USER_TEMPLATE",
    };

    try {
      await axios.post(
        `${keys.API_PROXY}/email/send/nbhregistration`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: EMAIL_SEND_SUCCESS });
    } catch (err) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  const sendNbhRegistrationVerificationRequestEmail = async (
    apartmentName,
    address1,
    address2,
    city,
    state,
    pincode,
    email,
    verificationUrl,
    currentYear
  ) => {
    setAuthToken(sendgridKey);

    const jsonPayload = {
      from_email: fromEmail,
      to_email: fromEmail, // Email sent to NDD from NDD
      apartment_name: apartmentName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      pincode: pincode,
      email: email,
      verificationurl: verificationUrl,
      year: currentYear,
      template_name: "NB_REGISTRATION_APPROVAL_REQUEST_TEMPLATE",
    };

    try {
      await axios.post(
        `${keys.API_PROXY}/email/send/nbhregistration`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: EMAIL_SEND_SUCCESS });
    } catch (err) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  const sendNbhRegistrationSuccessEmailToUser = async (
    apartmentName,
    email
  ) => {
    setAuthToken(sendgridKey);

    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      apartment_name: apartmentName,
      year: currentYear,
      template_name: "NB_REGISTRATION_SUCCESS_NOTIFICATION_TEMPLATE",
    };

    try {
      await axios.post(
        `${keys.API_PROXY}/email/send/nbhregistration`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: EMAIL_SEND_SUCCESS });
    } catch (err) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };
  // Nbh registration email ends

  return (
    <SiteContext.Provider
      value={{
        numApartmentsFetched: state.numApartmentsFetched,
        loading: state.loading,
        apartmentData: state.apartmentData,
        fetchError: state.fetchError,
        submittedNeighbourhood: state.submittedNeighbourhood,
        adCreated: state.adCreated,
        adCreationError: state.adCreationError,
        apartmentCreated: state.apartmentCreated,
        apartmentCreationError: state.apartmentCreationError,
        emailSent: state.emailSent,
        neighbourhoodVerified: state.neighbourhoodVerified,
        verifiedNeighbourhoodDetails: state.verifiedNeighbourhoodDetails,
        adsDataNbh: state.adsDataNbh,
        adsDataNbhFetched: state.adsDataNbhFetched,
        allApartments: state.allApartments,
        loadAllApartments,
        fetchApartments,
        getNeighbourhoodFromId,
        clearApartmentSearchResults,
        validateApartmentSelection,
        setLoading,
        unsetLoading,
        createAd,
        createApartment,
        sendNbhRegistrationEmailToUser,
        sendNbhRegistrationVerificationRequestEmail,
        sendNbhRegistrationSuccessEmailToUser,
        verifyNeighbourhood,
        fetchAdsForNbh,
        searchAds,
        searchGiveaways,
        sortByPriceAsc,
        sortByPriceDesc,
        sortByDateCreatedAsc,
        sortByDateCreatedDesc,
        sortGiveawayAsc,
        sortGiveawayDesc,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
