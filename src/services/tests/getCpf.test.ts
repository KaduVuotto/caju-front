import { getCpf } from "../getCpf";
import { api } from "../axios";
import { itemMock, mockCpf } from "./mocks/itemMock";

jest.mock("../axios");

describe("getCpf", () => {
  it("should call get with the correct URL and return data on success", async () => {
    const formattedCpf = mockCpf.replace(/\D/g, "");
    const mockResponse = { data: [itemMock] };

    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getCpf(mockCpf);

    expect(api.get).toHaveBeenCalledWith(`registrations?cpf=${formattedCpf}`);
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if the API call fails", async () => {
    const formattedCpf = mockCpf.replace(/\D/g, "");
    const mockError = new Error("API call failed");

    (api.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getCpf(mockCpf)).rejects.toThrow("API call failed");
    expect(api.get).toHaveBeenCalledWith(`registrations?cpf=${formattedCpf}`);
  });
});
