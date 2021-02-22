import React from "react";
import styled from "@emotion/styled";
import theme from "../theme";
import CellValueDisplay from "./CellValueDisplay";

const HeaderCellValueDisplayStyle = styled(CellValueDisplay)`
  font-weight: bold;
  color: ${theme.colors.text};
`;

const HeaderCellValueDisplay = React.forwardRef(
  ({ isValid, children, ...props }, ref) => {
    return (
      <HeaderCellValueDisplayStyle
        isValid={true}
        align="center"
        ref={ref}
        {...props}
      >
        {children}
      </HeaderCellValueDisplayStyle>
    );
  }
);

export default HeaderCellValueDisplay;
