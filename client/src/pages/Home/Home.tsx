import { Layout } from "antd";
import styled from "styled-components";
import { TodoList } from "../../components/TodoList/TodoList";

const KanbanWrapper = styled(Layout.Content)`
  min-width: 800px;
  max-width: 1200px;
  margin: auto;
`;

export const HomePage = () => {
  return (
    <Layout>
      <KanbanWrapper>
        <TodoList />
      </KanbanWrapper>
    </Layout>
  );
};
