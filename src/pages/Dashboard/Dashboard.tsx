import * as Styled from "./styles";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";
import { Typography } from "@mui/material";

export const Dashboard = memo(() => {
  const {
    dataRegistrations,
    changeStatus,
    loadingRegistrations,
    errorRegistrations,
    loadingScreen,
    errorScreen,
    deleteCard,
  } = useDashboard();

  return (
    <Styled.Container>
      <SearchBar />
      {errorScreen ? (
        <Styled.ErrorContainer>
          <Typography variant="body1">{errorScreen}</Typography>
        </Styled.ErrorContainer>
      ) : (
        <Columns
          registrations={dataRegistrations}
          changeStatus={changeStatus}
          loadingRegistrations={loadingRegistrations}
          loadingScreen={loadingScreen}
          errorRegistrations={errorRegistrations}
          deleteCard={deleteCard}
        />
      )}
    </Styled.Container>
  );
});
