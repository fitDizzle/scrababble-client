import React from "react";
import StaticContentContainer from "../components/static/staticContentContainer";

const ReportAnIssue = () => {
  return (
    <StaticContentContainer>
      <label>Report An Issue</label>
      <form>
        <label>Name:</label>
        <input type="text" />
        <label>email:</label>
        <input type="email" />
        <label>Message:</label>
        <input type="text" />
      </form>
    </StaticContentContainer>
  );
};

export default ReportAnIssue;
