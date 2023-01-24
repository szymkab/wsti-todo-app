import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Task } from "../../data/types";
import { getAuthHeader } from "../Auth";
import { AddNewTaskModal } from "./AddNewTaskModal";
import { TaskCard } from "./TaskCard";

const AddNewButton = styled(Button)`
  margin-bottom: 16px;
`;

export const TodoList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState<Task | null>(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<boolean>(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        headers: getAuthHeader(),
      });
      const json = await response.json();
      setTasks(json);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskFormFinish = async (values: {
    description: string;
    date: any;
  }) => {
    console.log(values);
    try {
      await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          ...values,
          status: 0,
          date: values.date?.toISOString(),
        }),
      });
      setTimeout(() => fetchTasks(), 200);
      setIsModalVisible(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateTask = async (item: Task) => {
    try {
      await fetch(`http://localhost:3000/todo/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(item),
      });
      setTimeout(() => fetchTasks(), 200);
      setEditModal(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveTask = async (item: Task) => {
    try {
      await fetch(`http://localhost:3000/todo/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });
      setTimeout(() => fetchTasks(), 200);
    } catch (e) {
      console.error(e);
    }
  };

  if (error) {
    return (
      <Typography.Text>Wystapil blad podczas pobierania zadan</Typography.Text>
    );
  }

  return (
    <div>
      <AddNewButton onClick={() => setIsModalVisible(true)} type="primary">
        Dodaj nowe zadanie
      </AddNewButton>
      {isModalVisible && (
        <AddNewTaskModal
          isModalVisible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onFormFinish={handleTaskFormFinish}
        />
      )}
      {editModal && (
        <AddNewTaskModal
          isModalVisible={!!editModal}
          onCancel={() => setEditModal(null)}
          {...editModal}
          values={editModal}
          onFormFinish={handleTaskFormFinish}
        />
      )}
      {tasks.map((task: Task) => (
        <TaskCard
          task={task}
          onEditClick={() => setEditModal(task)}
          onRemoveClick={() => handleRemoveTask(task)}
          onCheckClick={(status: boolean) =>
            handleUpdateTask({ ...task, status: Number(status) })
          }
        />
      ))}
    </div>
  );
};
