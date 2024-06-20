import { renderHook, act } from "@testing-library/react-hooks";
import { useNewAdmission } from "../useNewAdmission";
import { postNewAdmission } from "~/services/postNewAdmission";
import { getCpf } from "~/services/getCpf";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";

// Mock the services and toast
jest.mock("~/services/postNewAdmission");
jest.mock("~/services/getCpf");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedFunction = jest.fn(() => {});

jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockedFunction }),
}));

const mockPostNewAdmission = postNewAdmission as jest.Mock;
const mockGetCpf = getCpf as jest.Mock;

describe("useNewAdmission hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle new admission successfully", async () => {
    mockGetCpf.mockResolvedValue([]);
    mockPostNewAdmission.mockResolvedValue({});

    const { result } = renderHook(() => useNewAdmission(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.handleClickOpen({
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-09",
        admissionDate: "2022-01-01",
      });
    });

    expect(result.current.openDialog).toBe(true);
  });

  it("should handle error when CPF is already registered", async () => {
    mockGetCpf.mockResolvedValue([{ id: "existing-id" }]);

    const { result } = renderHook(() => useNewAdmission(), {
      wrapper: BrowserRouter,
    });

    await act(async () => {
      result.current.handleClickOpen({
        name: "Test User",
        email: "test@example.com",
        cpf: "123.456.789-09",
        admissionDate: "2022-01-01",
      });
      result.current.handleConfirm();
    });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Falha ao cadastrar admissão, CPF já cadastrado!"));
  });
});
