import React from "react";
import { Question } from "../types";
import { Steps as ASteps } from "antd";

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;

  questions: Question[];
}

const { Step } = ASteps;

const Steps: React.FC<StepsProps> = ({ currentStep, questions, ...props }) => {
  return (
    <div {...props}>
      <ASteps current={currentStep}>
        {questions.map((question, index) => (
          <Step key={question.id} />
        ))}
      </ASteps>
    </div>
  );
};

export { Steps as default };
