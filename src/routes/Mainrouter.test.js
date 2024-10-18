import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from './index.js'

jest.mock("../hooks/GlobalContext", () => ({
  useGlobalData: jest.fn(() => ({
    sideBarClickedData: "mockedSidebarData",
    dropDownSelectedData: "mockedDropDownData",
    setSideBarClickedData: jest.fn(),
  })),
}));

test("renders MainRouter component", () => {

  const { getByText } = render(
    <Router>
      <MainRouter />
    </Router>
  );

  expect(getByText("EmptyComponent")).toBeInTheDocument();
});


