import Collumns from "./components/Columns";
import * as Styled from "./styles";
import { SearchBar } from "./components/Searchbar";

 export const Dashboard = () => {
  return (
    <Styled.Container>
      <SearchBar />
      <Collumns registrations={[]} />
    </Styled.Container>
  );
};