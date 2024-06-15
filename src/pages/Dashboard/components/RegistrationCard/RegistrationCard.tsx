import { Button } from "~/components/Buttons/Button";
import * as Styled from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { DataListItem } from "~/types/interface";
import { RegistrationStatus } from "~/types/emuns";
import { useDashboard } from "~/hooks/useDashboard";
import { memo } from "react";

type Props = {
  item: DataListItem;
};

export const RegistrationCard = memo(({ item }: Props) => {
  const { changeStatus, loading, error } = useDashboard();

  if (loading) {
    return <Styled.Card>Carregando...</Styled.Card>;
  }
  return (
    <Styled.Card>
      <Styled.IconAndText>
        <HiOutlineUser />
        <h3>{item.employeeName}</h3>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineMail />
        <p>{item.email}</p>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineCalendar />
        <span>{item.admissionDate}</span>
      </Styled.IconAndText>
      <Styled.Actions>
        {item.status !== RegistrationStatus.REVIEW && (
          <Button
            onClick={() => {
              changeStatus(item, RegistrationStatus.REVIEW);
            }}
            small
            bgcolor="#ff8858"
          >
            Revisar novamente
          </Button>
        )}
        {item.status !== RegistrationStatus.APPROVED && (
          <Button
            onClick={() => changeStatus(item, RegistrationStatus.APPROVED)}
            small
            bgcolor="rgb(155, 229, 155)"
          >
            Aprovar
          </Button>
        )}
        {item.status !== RegistrationStatus.REPROVED && (
          <Button
            onClick={() => changeStatus(item, RegistrationStatus.REPROVED)}
            small
            bgcolor="rgb(255, 145, 154)"
          >
            Reprovar
          </Button>
        )}
        <Button
          onClick={() => changeStatus(item, RegistrationStatus.REVIEW)}
          small
          bgcolor="rgb(255, 145, 154)"
        >
          Excluir
        </Button>
      </Styled.Actions>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Styled.Card>
  );
});
