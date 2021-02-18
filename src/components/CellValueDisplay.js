import styled from "@emotion/styled";
import theme from "../theme";

const CellValueDisplay = styled.div`
  height: 100%;
  display: flex;
  justify-content: stretch;
  padding: ${theme.space.cellPaddingY} ${theme.space.cellPaddingX};
  font-size: ${theme.fontSizes.cell}px;
  color: ${(props) => (props.isValid ? theme.colors.text : "red")};
  text-align: ${(props) => props.align || "left"};
  ${(props) =>
    !props.isValid &&
    `
    background-color: rgba(255, 0, 0, .1);
  `}
  > .value-viewer {
    flex: 1;
  }
`;

export default CellValueDisplay;
