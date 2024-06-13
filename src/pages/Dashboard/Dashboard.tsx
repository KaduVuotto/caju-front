import * as Styled from "./styles";
import { SearchBar } from "./components/Searchbar";
import { Columns } from "./components/Columns/Columns";
 
 export const Dashboard = () => {
  return (
    <Styled.Container>
      <SearchBar />
      <Columns registrations={[]} />
    </Styled.Container>
  );
};