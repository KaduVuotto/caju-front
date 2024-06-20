import { deleteAdmission } from "../deleteAdmission";
import { api } from "../axios";
import { itemMock } from "./mocks/itemMock";

jest.mock("../axios");

describe("deleteAdmission", () => {
  it("should call delete with the correct URL and return data on success", async () => {
    const mockResponse = { data: [itemMock] };

    (api.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await deleteAdmission(itemMock);

    expect(api.delete).toHaveBeenCalledWith(`/registrations/${itemMock.id}`);
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("API call failed");

    (api.delete as jest.Mock).mockRejectedValue(mockError);

    await expect(deleteAdmission(itemMock)).rejects.toThrow("API call failed");
    expect(api.delete).toHaveBeenCalledWith(`/registrations/${itemMock.id}`);
  });
});
