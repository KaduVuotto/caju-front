import { Button } from "~/components/Buttons/styles";
import * as Styled from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

type Props = {
  data: any;
};

export const RegistrationCard = ({data}: Props) => {
  return (
    <Styled.Card>
      <Styled.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </Styled.IconAndText>
      <Styled.Actions>
        <Button small bgcolor="rgb(255, 145, 154)" >Reprovar</Button>
        <Button small bgcolor="rgb(155, 229, 155)">Aprovar</Button>
        <Button small bgcolor="#ff8858">Revisar novamente</Button>

        <HiOutlineTrash />
      </Styled.Actions>
    </Styled.Card>
  );
};