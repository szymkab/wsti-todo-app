import { Button, Form, Input } from "antd";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Styleable } from "../../common/types";
import { AuthContext } from "../../components/Auth";

interface Props extends Styleable {}

interface FormValues {
  username: string;
  password: string;
}

export const RegisterForm: FC<Props> = ({ className }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    try {
      const registerResponse = await fetch(
        "http://localhost:3000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      ).then((r) => r.json());
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerResponse.username,
          password: values.password,
        }),
      }).then((r) => r.json());
      if (
        registerResponse?.statusCode === 400 ||
        response?.statusCode === 400
      ) {
        throw new Error();
      }
      auth.login?.(response);
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={className}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Imię"
        name="firstName"
        rules={[{ required: true, message: "Wprowadź imię!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Nazwisko"
        name="lastName"
        rules={[{ required: true, message: "Wprowadź nazwisko!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Użytkownik"
        name="username"
        rules={[{ required: true, message: "Wprowadź nazwę użytkownika!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hasło"
        name="password"
        rules={[{ required: true, message: "Wprowadź hasło!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <a href="#" onClick={() => navigate("/login")}>
          Zaloguj się
        </a>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Utwórz konto
        </Button>
      </Form.Item>
    </Form>
  );
};
