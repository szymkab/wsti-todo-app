import { Layout, Menu, Space } from "antd";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./Auth";

const menuItems = ["Todo", "Profil", "Wyloguj"].map((item) => ({
  key: item.toUpperCase(),
  label: item,
}));

const Logo = styled.div`
  color: #fff;
  margin-right: 8px;
`;

const StyledHeader = styled(Layout.Header)`
  height: auto;
`;

export const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (value: any) => {
    if (value.key === "TODO" && location.pathname !== "/") {
      navigate("/");
    } else if (value.key === "PROFIL" && location.pathname !== "/profil") {
      navigate("/profil");
    } else if (value.key === "WYLOGUJ") {
      auth.logout?.();
    }
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  const selectedKeys = [];
  location.pathname === "/" && selectedKeys.push("TODO");
  location.pathname === "/profil" && selectedKeys.push("PROFIL");

  return (
    <StyledHeader>
      <Space>
        <Logo>TK</Logo>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          onSelect={handleSelect}
          selectedKeys={selectedKeys}
        />
      </Space>
    </StyledHeader>
  );
};
