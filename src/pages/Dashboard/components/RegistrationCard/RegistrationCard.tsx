import { Button } from "~/components/Buttons/Button";
import * as Styled from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { DataRegistrationsItem } from "~/types/interface";
import { DialogFrom, RegistrationStatus } from "~/types/emuns";
import { memo } from "react";
import { Skeleton, Typography } from "@mui/material";

type Props = {
  errorRegistrations: string;
  handleOpenDialog: (
    from: DialogFrom,
    item: DataRegistrationsItem,
    newStatus?: RegistrationStatus
  ) => void;
  item: DataRegistrationsItem;
  loadingRegistrations: boolean;
};

export const RegistrationCard = memo(
  ({
    errorRegistrations,
    handleOpenDialog,
    item,
    loadingRegistrations,
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
              bgcolor="#ff8858"
              onClick={() =>
                handleOpenDialog(
                  DialogFrom.STATUS,
                  item,
                  RegistrationStatus.REVIEW
                )
              }
              small
            >
              Revisar novamente
            </Button>
          )}
          {item.status !== RegistrationStatus.APPROVED && (
            <Button
              bgcolor="rgb(155, 229, 155)"
              onClick={() =>
                handleOpenDialog(
                  DialogFrom.STATUS,
                  item,
                  RegistrationStatus.APPROVED
                )
              }
              small
            >
              Aprovar
            </Button>
          )}
          {item.status !== RegistrationStatus.REPROVED && (
            <Button
              bgcolor="rgb(255, 145, 154)"
              onClick={() =>
                handleOpenDialog(
                  DialogFrom.STATUS,
                  item,
                  RegistrationStatus.REPROVED
                )
              }
              small
            >
              Reprovar
            </Button>
          )}
          <Button
            bgcolor="rgb(255, 145, 154)"
            onClick={() => handleOpenDialog(DialogFrom.DELETE, item)}
            small
          >
            Excluir
          </Button>
        </Styled.Actions>
        {errorRegistrations && (
          <Typography variant="body1" color={"red"}>
            {errorRegistrations}
          </Typography>
        )}
      </Styled.Card>
    );
  }
);
