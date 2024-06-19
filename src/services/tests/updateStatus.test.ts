import { updateStatus } from "../updateStatus";
import { api } from "../axios";
import { itemMock } from "./mocks/itemMock";
import { RegistrationStatus } from "~/types/emuns";

jest.mock("../axios");

describe("updateStatus", () => {
  it("should call put with the correct URL and data and return the response data on success", async () => {
    const newStatus: RegistrationStatus = RegistrationStatus.APPROVED;
    const mockResponse = {
      data: { ...itemMock, status: RegistrationStatus.APPROVED },
    };

    (api.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await updateStatus(itemMock, newStatus);

    expect(api.put).toHaveBeenCalledWith(`/registrations/${itemMock.id}`, {
      ...itemMock,
      status: newStatus,
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if the API call fails", async () => {
    const newStatus: RegistrationStatus = RegistrationStatus.APPROVED;
    const mockError = new Error("API call failed");

    (api.put as jest.Mock).mockRejectedValue(mockError);

    await expect(updateStatus(itemMock, newStatus)).rejects.toThrow(
      "API call failed"
    );
    expect(api.put).toHaveBeenCalledWith(`/registrations/${itemMock.id}`, {
      ...itemMock,
      status: newStatus,
    });
  });
});
