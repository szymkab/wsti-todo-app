import { Layout } from "antd";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StyledLayout = styled(Layout)`
  height: 100%;
  padding: 25px 50px;
  overflow-x: auto;
`;

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};
