import "antd/dist/antd.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";
import { AuthProvider } from "./components/Auth";
import { ProfilePage } from "./pages/Profile";
import { Header, PageWrapper } from "./components";
import { RegisterPage } from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Header />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </PageWrapper>
    </AuthProvider>
  );
}

export default App;
