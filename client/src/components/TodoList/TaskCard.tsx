import { Card, Checkbox as AntdCheckbox } from "antd";
import styled, { css } from "styled-components";
import { Task, TaskStatus } from "../../data/types";
import dayjs from "dayjs";

const Wrapper = styled.div<{ red: boolean }>`
  ${({ red }) => css`
    ${red &&
    css`
      border: 2px solid #ff0000;
    `}
    margin-bottom: 8px;
    &:last-child {
      margin: 0;
    }
  `}
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
  const diffInDays = dayjs(task.date).diff(
    new Date().toISOString().split("T")[0],
    "days",
  );
  const isUrgent = diffInDays < 2;

  return (
    <Wrapper red={isUrgent}>
      <Card
        size="small"
        title={task.name}
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
          <b>Data: </b>
          {dayjs(task.date).format("DD/MM/YYYY")}
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
