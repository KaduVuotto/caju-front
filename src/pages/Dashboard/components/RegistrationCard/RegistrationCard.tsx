import { Button } from "~/components/Buttons/Button";
import * as Styled from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { DataRegistrationsItem } from "~/types/interface";
import { RegistrationStatus } from "~/types/emuns";
import { memo } from "react";
import { Skeleton, Typography } from "@mui/material";

type Props = {
  item: DataRegistrationsItem;
  changeStatus: (
    item: DataRegistrationsItem,
    newStatus: string
  ) => Promise<void>;
  loadingRegistrations: boolean;
  errorRegistrations: string;
  deleteCard: (item: DataRegistrationsItem) => Promise<void>;
};

export const RegistrationCard = memo(
  ({
    item,
    changeStatus,
    errorRegistrations,
    loadingRegistrations,
    deleteCard,
  }: Props) => {
    if (loadingRegistrations || item.id === "") {
      return (
        <Styled.Card>
          <Styled.IconAndText>
            <Typography variant="h5">
              <Skeleton width={"20vw"} />
            </Typography>
          </Styled.IconAndText>
          <Styled.IconAndText>
            <Typography variant="body1">
              <Skeleton width={"20vw"} />
            </Typography>
          </Styled.IconAndText>
          <Styled.IconAndText>
            <Typography variant="body1">
              <Skeleton width={"20vw"} />
            </Typography>
          </Styled.IconAndText>
          <Styled.Actions>
            <Button loading={loadingRegistrations} small />
            <Button loading={loadingRegistrations} small />
            <Button loading={loadingRegistrations} small />
            <Button loading={loadingRegistrations} small />
          </Styled.Actions>
        </Styled.Card>
      );
    }

    return (
      <Styled.Card>
        <Styled.IconAndText>
          <HiOutlineUser />
          <Typography variant="h5">{item.employeeName}</Typography>
        </Styled.IconAndText>
        <Styled.IconAndText>
          <HiOutlineMail />
          <Typography variant="body1">{item.email}</Typography>
        </Styled.IconAndText>
        <Styled.IconAndText>
          <HiOutlineCalendar />
          <Typography variant="body1">{item.admissionDate}</Typography>
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
            onClick={() => deleteCard(item)}
            small
            bgcolor="rgb(255, 145, 154)"
          >
            Excluir
          </Button>
        </Styled.Actions>
        {errorRegistrations && (
          <Typography variant="body1" color={"red"}>{errorRegistrations}</Typography>
        )}
      </Styled.Card>
    );
  }
);
