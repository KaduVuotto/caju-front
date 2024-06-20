import { postNewAdmission } from "../postNewAdmission";
import { api } from "../axios";
import { itemMock } from "./mocks/itemMock";

jest.mock("../axios");

describe("postNewAdmission", () => {
  it("should call post with the correct URL and data and return the response data on success", async () => {
    const mockResponse = {
      data: itemMock,
    };

    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await postNewAdmission(itemMock);

    expect(api.post).toHaveBeenCalledWith("/registrations", itemMock);
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("API call failed");

    (api.post as jest.Mock).mockRejectedValue(mockError);

    await expect(postNewAdmission(itemMock)).rejects.toThrow("API call failed");
    expect(api.post).toHaveBeenCalledWith("/registrations", itemMock);
  });
});
