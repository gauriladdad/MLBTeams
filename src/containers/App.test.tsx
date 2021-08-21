import React from "react";
import { act } from "react-test-renderer";
import { render } from "@testing-library/react";
import App from "./App";
import Teams from "../components/Teams";

const fakeData = {
  teams: [
    {
      id: 133,
      name: "Oakland Athletics",
      link: "/api/v1/teams/133",
      season: 2021
    }
  ]
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        fakeData
      })
  })
);

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({ json: () => fakeData });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Loading", () => {
  it("should Display Loading Indicator", async () => {
    await act(async () => {
      const { getByText } = await render(<App />);
      expect(getByText("Loading...")).toBeTruthy();
    });
  });
});

describe("Data Fetch", () => {
  it("should fetch Data as expected", async () => {
    await render(<Teams />);
    expect((await global.fetch()).json()).toEqual(fakeData);
  });
});
