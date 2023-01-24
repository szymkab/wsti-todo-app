import { Card, Checkbox as AntdCheckbox } from "antd";
import styled from "styled-components";
import { Task, TaskStatus } from "../../data/types";

const Wrapper = styled.div`
  margin-bottom: 8px;
  &:last-child {
    margin: 0;
  }
`;

const Checkbox = styled(AntdCheckbox)`
  margin-left: 8px;
`;

const Remove = styled.a`
  color: #ff0000;
  margin-left: 8px;
`;

const getStatusName = (status: number) => {
  switch (status) {
    case 0:
      return "Otwarte";
    case 1:
      return "Zrobione";
  }
};

interface Props {
  task: Task;
  onEditClick: () => void;
  onRemoveClick: () => void;
  onCheckClick: (status: boolean) => void;
}

export const TaskCard = ({
  task,
  onEditClick,
  onRemoveClick,
  onCheckClick,
}: Props) => {
  return (
    <Wrapper>
      <Card
        size="small"
        title={`Zadanie ${task.id}`}
        extra={
          <>
            <a href="#" onClick={onEditClick}>
              Edytuj
            </a>
            <Remove href="#" onClick={onRemoveClick}>
              Usuń
            </Remove>
          </>
        }
      >
        <p>
          <b>Opis: </b>
          {task.description}
        </p>
        <p>
          <b>Status: </b>
          {getStatusName(task.status)}
        </p>
        <p>
          <b>
            Oznacz jako{" "}
            {task.status === TaskStatus.DONE ? "do zrobienia" : "zrobione"}
          </b>
          <Checkbox
            value={task.status}
            checked={!!task.status}
            onClick={() => onCheckClick(!task.status)}
          />
        </p>
      </Card>
    </Wrapper>
  );
};
