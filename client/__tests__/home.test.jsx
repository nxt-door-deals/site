/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SiteContext from "../context/site/siteContext";

// Component imports
import Landing from "../components/page_components/home/Landing";
import ApartmentSearch from "../components/forms/ApartmentSearch";
import Sell from "../components/page_components/how_it_works/Sell";

describe("renders the landing page", () => {
  it("test if the landing section is visible", () => {
    const fetchApartments = jest.fn();
    const numApartmentsFetched = "";
    const apartmentData = "";
    const clearApartmentSearchResults = jest.fn();

    render(
      <SiteContext.Provider
        value={{
          fetchApartments,
          numApartmentsFetched,
          apartmentData,
          clearApartmentSearchResults,
        }}
      >
        <Landing />
      </SiteContext.Provider>
    );

    const heading = screen.getByRole("heading", {
      name: /your apartment\'s marketplace/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("test if the apartment search form is visible", () => {
    const fetchApartments = jest.fn();
    const numApartmentsFetched = "";
    const apartmentData = "";
    const clearApartmentSearchResults = jest.fn();

    render(
      <SiteContext.Provider
        value={{
          fetchApartments,
          numApartmentsFetched,
          apartmentData,
          clearApartmentSearchResults,
        }}
      >
        <ApartmentSearch />
      </SiteContext.Provider>
    );

    const searchButton = screen.getByText(/Browse Ads/i);

    expect(searchButton).toBeInTheDocument();
  });

  it("test the apartment search input field", () => {
    const fetchApartments = jest.fn();
    const numApartmentsFetched = "";
    const apartmentData = "";
    const clearApartmentSearchResults = jest.fn();

    render(
      <SiteContext.Provider
        value={{
          fetchApartments,
          numApartmentsFetched,
          apartmentData,
          clearApartmentSearchResults,
        }}
      >
        <ApartmentSearch />
      </SiteContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Your apartment/i);

    fireEvent.change(searchInput, { target: { value: "apartment" } });

    expect(searchInput).toHaveValue("apartment");
  });

  it("test the apartment search validation", async () => {
    const fetchApartments = jest.fn();
    const numApartmentsFetched = "";
    const apartmentData = "";
    const clearApartmentSearchResults = jest.fn();

    render(
      <SiteContext.Provider
        value={{
          fetchApartments,
          numApartmentsFetched,
          apartmentData,
          clearApartmentSearchResults,
        }}
      >
        <ApartmentSearch />
      </SiteContext.Provider>
    );

    const searchButton = screen.getByRole("button", {
      name: /browse/i,
    });

    fireEvent.click(searchButton);

    let validationText;
    await waitFor(() => {
      validationText = screen.getByText(/Please select your apartment/i);
    });

    expect(validationText).toBeInTheDocument();
  });

  it("test if the sell component is visible", () => {
    render(<Sell />);

    const sellHeading = screen.getByRole("heading", {
      name: /selling on nxtdoordeals.com/i,
    });

    const cardHeading = screen.getByText(/Find your apartment/i);

    expect(sellHeading).toBeInTheDocument();
    expect(cardHeading).toBeInTheDocument();
  });
});
