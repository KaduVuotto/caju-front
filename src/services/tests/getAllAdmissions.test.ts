import { getAllAdmissions } from "../getAllAdmissions";
import { api } from "../axios";
 import { itemMock } from "./mocks/itemMock";

jest.mock("../axios");


describe("getAllAdmissions", () => {
  it("should call get with the correct URL and return data on success", async () => {
    const mockResponse = { data: [itemMock] };

    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAllAdmissions();

    expect(api.get).toHaveBeenCalledWith("registrations");
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("API call failed");

    (api.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getAllAdmissions()).rejects.toThrow("API call failed");
    expect(api.get).toHaveBeenCalledWith("registrations");
  });
});
