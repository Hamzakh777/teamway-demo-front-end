import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Question } from "../../types";
import Steps from "../../components/Steps";
import CurrentQuestion from "../../components/CurrentQuestion";

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const StyledActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurentStep] = useState(0);
  const [results, setResults] = useState({});

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const api = process.env.REACT_APP_API as string;
      const { data } = await axios.get<Question[]>(api);

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      setQuestions(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {

  }, [questions]);

  return (
    <StyledPage>
      <Card
        title="Test: Are you an introvert or an extrovert?"
        bodyStyle={{ width: "35rem" }}
        loading={isLoading}
      >
        <Steps questions={questions} currentStep={currentStep} />
        {/* <CurrentQuestion question={questions[currentStep]} /> */}
        <StyledActionsWrapper>
          <Button style={{ marginRight: "1rem" }}>Previous</Button>
          <Button type="primary">Next</Button>
        </StyledActionsWrapper>
      </Card>
    </StyledPage>
  );
};
