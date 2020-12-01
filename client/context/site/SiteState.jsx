import React, { useReducer } from "react";
import siteReducer from "./siteReducer";
import SiteContext from "./siteContext";
import axios from "axios";
import keys from "../../utils/keys";
import setAuthToken from "../../utils/setToken";

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

// Will be used in the copyright section in the email footer
var currentYear = new Date().getFullYear();

// Email sender
const fromEmail = keys.FROM_EMAIL;

const SiteState = (props) => {
  const initialState = {
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
  };

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const createApartment = async (
    name,
    address1,
    address2,
    city,
    state,
    pincode,
    email
  ) => {
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
    setAuthToken(process.env.SENDGRID_API_KEY);

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
    } catch (error) {
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
    currentYear
  ) => {
    setAuthToken(process.env.SENDGRID_API_KEY);

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
    } catch (error) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  const sendNbhRegistrationSuccessEmailToUser = async (
    apartmentName,
    email,
    currentYear
  ) => {
    setAuthToken(process.env.SENDGRID_API_KEY);

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
    } catch (error) {
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
        fetchApartments,
        clearApartmentSearchResults,
        validateApartmentSelection,
        setLoading,
        unsetLoading,
        createAd,
        createApartment,
        sendNbhRegistrationEmailToUser,
        sendNbhRegistrationVerificationRequestEmail,
        sendNbhRegistrationSuccessEmailToUser,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};

export default SiteState;
