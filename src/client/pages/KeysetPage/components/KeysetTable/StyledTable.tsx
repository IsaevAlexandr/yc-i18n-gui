import styled from "@emotion/styled";

export const StyledTable = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;

  th {
    color: gray;
  }

  th,
  td {
    vertical-align: top;
    word-break: break-word;
    min-width: 300px;
    padding: 0.25rem 0.5rem;
    user-select: text;

    :first-of-type {
      padding-left: 0rem;
    }

    &:last-of-type {
      padding-right: 0rem;
    }
  }

  td {
    border-top: 1px solid lightgray;
  }
`;
