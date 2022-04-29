import React from "react";
import styled from "@emotion/styled";

interface PageProps {
  padding?: boolean;
}

export const Page = styled.div<PageProps>((props) => ({
  padding: props.padding && "1rem",
}));
