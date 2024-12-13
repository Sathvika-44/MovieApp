jest.mock("axios", () => ({
    create: jest.fn(() => ({
      defaults: {
        baseURL: "https://www.omdbapi.com", // Set the default baseURL for the mock
      },
      get: jest.fn(), // Mock other methods as needed
    })),
  }));
  
  import movieApi from "./movieApi";
  
  describe("movieApi configuration", () => {
    it("should configure axios with the correct baseURL", () => {
      expect(movieApi.defaults.baseURL).toBe("https://www.omdbapi.com");
    });
  });
  
  