import { Layout, Space, Typography } from "antd";
import styled from "styled-components";
import { flexCenter } from "../../common/styles";
import { LoginForm } from "./LoginForm";

const StyledContent = styled(Layout.Content)`
  ${flexCenter}
  flex-direction: column;
`;

const StyledSpace = styled(Space)`
  display: flex;
  align-items: center;
  width: 50%;
`;

export const LoginPage = () => {
  return (
    <Layout>
      <StyledContent>
        <StyledSpace direction="vertical">
          <Typography.Title>Tablica Kanban</Typography.Title>
          <LoginForm />
        </StyledSpace>
      </StyledContent>
    </Layout>
  );
};
