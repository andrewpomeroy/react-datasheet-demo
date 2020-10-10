import React from "react";
import styled from "@emotion/styled";
import theme from "../theme";
import CellValueDisplay from "./CellValueDisplay";

const HeaderCellValueDisplayStyle = styled(CellValueDisplay)`
  font-weight: bold;
  color: ${theme.colors.text};
`;

const HeaderCellValueDisplay = ({ isValid, children, ...props }) => {
  return (
    <HeaderCellValueDisplayStyle isValid={true} {...props}>
      {children}
    </HeaderCellValueDisplayStyle>
  );
};

export default HeaderCellValueDisplay;
