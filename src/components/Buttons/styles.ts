import styled from "styled-components";

export const IconButton = styled.button<{
  disabled?: boolean;
}>`
  cursor: pointer;
  border: 2px solid ${(props) => (props.disabled ? "gray" : "#64a98c")};
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: ${(props) => (props.disabled ? "gray" : "#64a98c")};
  }
`;

export const Button = styled.button<{
  disabled?: boolean;
}>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: ${(props) => (props.disabled ? "gray" : "#64a98c")};
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) =>
    props.disabled ? "gray" : props.bgcolor ?? "none"};
  color: ${(props) => (props.disabled ? "gray" : props.color ?? "#000")};
  cursor: pointer;
`;
