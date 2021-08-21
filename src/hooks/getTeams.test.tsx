import useGetTeams from "./getTeams";

var fetchMock = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } })
  })
);

beforeEach(() => {
  fetchMock.mockClear();
});

it("finds exchange", async () => {
  const data = await useGetTeams();

  expect(data.teams.length).toEqual(152);
});
