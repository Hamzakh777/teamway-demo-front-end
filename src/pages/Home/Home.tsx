import { Button, Card } from "antd";
import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Home: React.FC = () => {
  return (
    <StyledPage>
      <Card>
        <h2>Test: Are you an introvert or an extrovert?</h2>
        <Button>test</Button>
      </Card>
    </StyledPage>
  );
};
