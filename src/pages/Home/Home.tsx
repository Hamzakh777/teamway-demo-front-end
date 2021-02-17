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

  // steps
  const [currentStep, setCurrentStep] = useState(0);
  const currentQuestion: Question | undefined = questions[currentStep];

  const stepsNode = (
    <>
      <Button style={{ marginRight: "1rem" }} disabled={currentStep === 0}>
        Previous
      </Button>
      <Button type="primary">Next</Button>
    </>
  );

  // results
  const [results, setResults] = useState<{ [key: number]: number }>({});
  const handleResultChange = (questionId: number, value: number) => {
    setResults((oldResults) => ({ ...oldResults, [questionId]: value }));
  };

  useEffect(() => {
    let res: { [key: number]: number } = {};
    for (const question of questions) {
      res[question.id] = 0;
    }
    setResults(res);
  }, [questions]);

  return (
    <StyledPage>
      <Card
        title="Test: Are you an introvert or an extrovert?"
        bodyStyle={{ width: "35rem" }}
        loading={isLoading}
      >
        {!isLoading && !!currentQuestion && (
          <div>
            <Steps questions={questions} currentStep={currentStep} />
            <CurrentQuestion
              question={currentQuestion}
              value={results[currentQuestion.id] ?? null}
              onChange={(value) =>
                handleResultChange(currentQuestion.id, value)
              }
            />
            <StyledActionsWrapper>{stepsNode}</StyledActionsWrapper>
          </div>
        )}
      </Card>
    </StyledPage>
  );
};
