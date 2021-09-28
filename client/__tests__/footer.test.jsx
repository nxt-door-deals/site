/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import AuthContext from "../context/auth/authContext";

// Component import
import Footer from "../components/layout/Footer";

jest.mock("next/image", () => {
  return () => <></>;
});

describe("test if the footer renders", () => {
  it("check random text on the footer", () => {
    render(
      <AuthContext.Provider value={{ user: "" }}>
        <Footer pathname="/" footerGradientClass="" />
      </AuthContext.Provider>
    );

    const randomText = screen.getByText(/All rights reserved/i);

    expect(randomText).toBeInTheDocument();
  });

  it("check random link on the footer", () => {
    render(
      <AuthContext.Provider value={{ user: "" }}>
        <Footer pathname="/" footerGradientClass="" />
      </AuthContext.Provider>
    );

    const randomLink = screen.getByRole("link", {
      name: /our story/i,
    });

    expect(randomLink).toBeInTheDocument();
  });

  it("check if the covid 19 link is visible", () => {
    render(
      <AuthContext.Provider value={{ user: "" }}>
        <Footer pathname="/" footerGradientClass="" />
      </AuthContext.Provider>
    );

    const covidLink = screen.getByRole("link", {
      name: /covid 19/i,
    });

    expect(covidLink).toBeInTheDocument();
  });

  it("check if the browse ads link is visible", () => {
    render(
      <AuthContext.Provider value={{ user: "" }}>
        <Footer pathname="/" footerGradientClass="" />
      </AuthContext.Provider>
    );

    const adsLink = screen.getByRole("link", {
      name: /browse ads/i,
    });

    expect(adsLink).toBeInTheDocument();
  });
});
