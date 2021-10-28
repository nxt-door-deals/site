/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SiteContext from "../context/site/siteContext";
import AuthContext from "../context/auth/authContext";

// Component imports
import NoAdsForNeighbourhood from "../components/page_components/browse_ads/NoAdsForNeighbourhood";
import SearchNbhAds from "../components/forms/SearchNbhAds";
import NbhAdsCard from "../components/page_components/browse_ads/NbhAdsCard";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("test if the browse ads page renders", () => {
  it("test if the no ads component is rendered", () => {
    const user = "";

    render(
      <AuthContext.Provider value={{ user }}>
        <NoAdsForNeighbourhood />
      </AuthContext.Provider>
    );

    const message = screen.getByText(
      /looks like there are no ads for this apartment yet/i
    );

    expect(message).toBeInTheDocument();
  });

  it("test if the search ads functionality is working", () => {
    const searchAds = jest.fn();
    const searchGiveaways = jest.fn();
    const sortByPriceAsc = jest.fn();
    const sortByPriceDesc = jest.fn();
    const sortByDateCreatedAsc = jest.fn();
    const sortByDateCreatedDesc = jest.fn();
    const sortGiveawayAsc = jest.fn();
    const sortGiveawayDesc = jest.fn();
    const fetchAdsForNbh = jest.fn();

    render(
      <SiteContext.Provider
        value={{
          searchAds,
          searchGiveaways,
          sortByPriceAsc,
          sortByPriceDesc,
          sortByDateCreatedAsc,
          sortByDateCreatedDesc,
          sortGiveawayAsc,
          sortGiveawayDesc,
          fetchAdsForNbh,
        }}
      >
        <SearchNbhAds nbhId="" />
      </SiteContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Search Ads.../i);

    fireEvent.change(searchInput, { target: { value: "search" } });

    expect(searchInput).toHaveValue("search");
  });

  it("test if an ad card is visible", () => {
    const adsDataNbh = [
      {
        id: "2cf2e547-275d-4dcf-8161-8364af5ce990",
        posted_by: 1,
        title: "Giving away a copy of The Shining",
        price: "0",
        date_posted: "today",
        images: [
          "https://nxt-door-deals-test.s3.ap-south-1.amazonaws.com/users/1/ads/2cf2e547-275d-4dcf-8161-8364af5ce990/a8573839-286b-4501-abc1-5ccb4975944e.jpeg",
        ],
        ad_type: "giveaway",
        ad_category: "Books",
        condition: "Almost New",
        chat_record_count: 0,
      },
    ];
    const fetchAdsForNbh = jest.fn();
    const loading = "";
    const setLoading = jest.fn();
    const adsDataNbhFetched = "";

    render(
      <SiteContext.Provider
        value={{
          adsDataNbh,
          fetchAdsForNbh,
          loading,
          setLoading,
          adsDataNbhFetched,
        }}
      >
        <NbhAdsCard nbhId="" />
      </SiteContext.Provider>
    );

    const notFoundText = screen.getByText(/Giving away a copy of The Shining/i);

    expect(notFoundText).toBeInTheDocument();
  });
});
