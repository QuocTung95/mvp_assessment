import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import { act } from "react";
import ReactDOMClient from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../../contexts/AuthContext";
import { APII } from "../../../services/declaration";
import Home from "../Home";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    get: jest.fn(),
  })),
  get: jest.fn(),
}));

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Home List page", () => {
  beforeAll(async () => {
    const spyGetDeclarations = jest.spyOn(APII, "getDeclarations");
    spyGetDeclarations.mockImplementation(() => Promise.resolve([]));
  });

  it("should render create button when user already login", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    await act(async () => {
      ReactDOMClient.createRoot(container).render(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuthenticated: "token" }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      );
    });

    const createNewButton = screen.getByRole("button", {
      name: "Create New Declaration",
      hidden: false,
    });

    expect(createNewButton).toBeInTheDocument();

    userEvent.click(createNewButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/form");
  });

  it("should render warning when user have not login", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    await act(async () => {
      ReactDOMClient.createRoot(container).render(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuthenticated: "" }}>
            <Home />
          </AuthContext.Provider>
        </MemoryRouter>
      );
    });

    const warning = screen.getByRole("heading", {
      level: 1,
      name: "You need to login to declare your health.",
      hidden: false,
    });

    expect(warning).toBeInTheDocument();
  });
});
