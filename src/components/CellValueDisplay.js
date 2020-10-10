import styled from "@emotion/styled";
import theme from "../theme";

const CellValueDisplay = styled.div`
  height: 100%;
  padding: 0.125rem 0.25rem;
  color: ${(props) => (props.isValid ? theme.colors.text : "red")};
  display: flex;
  justify-content: stretch;
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
