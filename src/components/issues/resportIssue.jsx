import React, { useState } from "react";
import styled from "styled-components";

const StyledReportIssueButton = styled.button`
  min-width: 200px;
  border: none;
  font-size: 18px;
  padding: 7px 10px;
  background-color: ${(props) => (props.bg === true ? "green" : "lightBlue")};
  :hover {
    background-color: ${(props) => (props.bg === true ? "lightBlue" : "green")};
  }
`;

const ReportIssueButton = () => {
  const [state, setState] = useState({
    active: false,
  });

  return (
    <StyledReportIssueButton
      href=""
      type="submit"
      bg={state.active}
      onClick={(e) => console.log("Report an issue")}
    >
      Report an Issue
    </StyledReportIssueButton>
  );
};

export default ReportIssueButton;
