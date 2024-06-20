import { renderHook, act } from "@testing-library/react-hooks";
import { useDashboard } from "../useDashboard";
import { DialogFrom, RegistrationStatus } from "~/types/emuns";
import { initialStateRegistration } from "~/utils/initialStateRegistration";

jest.useFakeTimers();

// Mock dos serviços
jest.mock("~/services/getAllAdmissions", () => ({
  getAllAdmissions: () => [],
}));
jest.mock("~/services/deleteAdmission", () => ({
  deleteAdmission: () => [],
}));
jest.mock("~/services/getCpf", () => ({
  getCpf: () => [initialStateRegistration[0]],
}));
jest.mock("~/services/updateStatus", () => ({
  updateStatus: () => initialStateRegistration,
}));
jest.mock("react-toastify");
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: jest.fn() }),
}));

describe("useDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDashboard());

    expect(result.current.loadingScreen).toBeTruthy();
    expect(result.current.dataRegistrations).toEqual(initialStateRegistration);
    expect(result.current.cpf).toBe("");
    expect(result.current.errorCpf).toBe("");
  });

  it("should fetch initial data on mount", async () => {
    const { result } = renderHook(() => useDashboard());
    await result.current.refresh();
    expect(result.current.dataRegistrations).toEqual([]);
  });

  it("should handle CPF input change and validation", async () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleCpf({
        target: { value: "123.456.789-09" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.cpf).toBe("123.456.789-09");
    expect(result.current.cpfIsValid).toBe(true);
  });

  it("should open and close dialog correctly", () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleOpenDialog(
        DialogFrom.STATUS,
        initialStateRegistration[0]
      );
    });

    expect(result.current.openDialog).toBe(true);
    expect(result.current.textDialog).toBe(
      "Deseja realmente alterar o status do registro?"
    );

    act(() => {
      result.current.handleCloseDialog();
    });

    expect(result.current.openDialog).toBe(false);
  });

  it("should handle status change correctly", async () => {
    const { result } = renderHook(() => useDashboard());
    result.current.handleOpenDialog(
      DialogFrom.STATUS,
      initialStateRegistration[0],
      RegistrationStatus.APPROVED
    );

    await result.current.refresh();

    expect(result.current.openDialog).toBeTruthy();
  });

  it("should handle delete admission correctly", async () => {
    const { result } = renderHook(() => useDashboard());
    result.current.handleOpenDialog(
      DialogFrom.DELETE,
      initialStateRegistration[0]
    );

    await result.current.refresh();

    expect(result.current.openDialog).toBeTruthy();
  });

  it("should handle search cpf correctly", async () => {
    const { result } = renderHook(() => useDashboard());
    await result.current.searchCpf("56642105087");

    expect(result.current.dataRegistrations.length).toBe(1);
  });
});
