import * as Styled from "./styles";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";

export const Dashboard = memo(() => {
  const {
    dataRegistrations,
    changeStatus,
    loadingRegistrations,
    errorRegistrations,
    loadingScreen,
  } = useDashboard();

  return (
    <Styled.Container>
      <SearchBar />
      <Columns
        registrations={dataRegistrations}
        changeStatus={changeStatus}
        loadingRegistrations={loadingRegistrations}
        loadingScreen={loadingScreen}
        errorRegistrations={errorRegistrations}
      />
    </Styled.Container>
  );
});
