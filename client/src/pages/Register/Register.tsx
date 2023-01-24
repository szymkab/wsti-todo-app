import { Layout, Space, Typography } from "antd";
import styled from "styled-components";
import { flexCenter } from "../../common/styles";
import { RegisterForm } from "./RegisterForm";

const StyledContent = styled(Layout.Content)`
  ${flexCenter}
  flex-direction: column;
`;

const StyledSpace = styled(Space)`
  display: flex;
  align-items: center;
  width: 50%;
`;

export const RegisterPage = () => {
  return (
    <Layout>
      <StyledContent>
        <StyledSpace direction="vertical">
          <Typography.Title>Todo app</Typography.Title>
          <RegisterForm />
        </StyledSpace>
      </StyledContent>
    </Layout>
  );
};
