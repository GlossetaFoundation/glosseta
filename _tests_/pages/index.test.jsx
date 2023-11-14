import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
  pathname: jest.fn(),
}));

describe("Glosseta Landing Page", () => {
  it("It renders the glossary page with content", () => {
    render(<Home />);

    const glossetaContainer = screen.getByTitle("glosseta-landing-page");
    const glossetaDescription = screen.getByText("glossetaDescription");
    const logo = screen.getByTitle("glosseta-logo");

    expect(glossetaContainer).toBeInTheDocument();

    expect(logo).toHaveAttribute("src", "/glosseta_social_banner.png");
    expect(logo).toHaveAttribute("alt", "Glosseta logo");

    expect(glossetaDescription).toBeInTheDocument();
  });
});
