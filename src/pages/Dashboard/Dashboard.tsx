import * as Styled from "./styles";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Columns } from "./components/Columns/Columns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";

export const Dashboard = memo(() => {
  const { dataList } = useDashboard();

  return (
    <Styled.Container>
      <SearchBar />
      <Columns registrations={dataList} />
    </Styled.Container>
  );
});
