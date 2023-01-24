import { Layout, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../components/Auth";

export const ProfilePage = () => {
  const auth = useContext(AuthContext);

  return (
    <Layout>
      <Layout.Content>
        <Typography.Title>Profil</Typography.Title>
        <Typography.Paragraph>
          <b>ID:</b> {auth.user?.id}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <b>Nazwa:</b> {auth.user?.username}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <b>Imię:</b> {auth.user?.firstName}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <b>Nazwisko:</b> {auth.user?.lastName}
        </Typography.Paragraph>
      </Layout.Content>
    </Layout>
  );
};
