import { getProfile, getProjects } from "@/services/api";

jest.mock("axios", () => {
  const mockGet = jest.fn();
  return {
    default: {
      create: () => ({ get: mockGet }),
    },
    create: () => ({ get: mockGet }),
  };
});

const getMockGet = () => {
  const axios = require("axios");
  return axios.create().get as jest.Mock;
};

describe("api", () => {
  beforeEach(() => {
    getMockGet().mockClear();
  });

  it("getProfile should return data", async () => {
    getMockGet().mockResolvedValue({
      data: { about: {}, experience: [], projects: [] },
    });

    const result = await getProfile();

    expect(result).toEqual({ about: {}, experience: [], projects: [] });
  });

  it("getProfile should throw when request fails", async () => {
    getMockGet().mockRejectedValue(new Error("Network error"));

    await expect(getProfile()).rejects.toThrow("Failed to fetch profile");
  });

  it("getProjects should return data", async () => {
    getMockGet().mockResolvedValue({ data: [{ name: "Test Project" }] });

    const result = await getProjects();

    expect(result).toEqual([{ name: "Test Project" }]);
  });
});
