import { Button, DatePicker, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Task } from "../../data/types";
import moment from "moment";

interface Props {
  isModalVisible?: boolean;
  onCancel: () => void;
  onFormFinish: (values: any) => void;
  values?: Task;
}

export const AddNewTaskModal = ({
  isModalVisible,
  onCancel,
  onFormFinish,
  values,
}: Props) => {
  const handleFormFinish = (updatedValues: any) => {
    onFormFinish(values ? { ...values, ...updatedValues } : updatedValues);
    onCancel();
  };

  return (
    <Modal
      title={!!values ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
      visible={isModalVisible}
      onCancel={onCancel}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={handleFormFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nazwa"
          name="name"
          rules={[{ required: true, message: "Wprowadź nazwę zadania!" }]}
          initialValue={values?.name || ""}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Opis"
          name="description"
          rules={[{ required: true, message: "Wprowadź opis!" }]}
          initialValue={values?.description || ""}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Data"
          name="date"
          rules={[{ required: true, message: "Wprowadź datę!" }]}
          initialValue={moment(values?.date) || ""}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 11 }}>
          <Button type="primary" htmlType="submit">
            Zatwierdź
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
