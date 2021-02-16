import React from "react";
import styled from "styled-components";
import { Question } from "../types";
import { Radio, RadioChangeEvent } from "antd";

export interface CurrentQuestionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  question: Question;

  value: number

  onChange?: (e: RadioChangeEvent) => void
}

const StyledWrapper = styled.div`
  margin-top: 1.5rem;
`;

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const CurrentQuestion: React.FC<CurrentQuestionProps> = ({
  question,
  value,
  onChange,
  ...props
}) => {
  return (
    <StyledWrapper {...props}>
      <h3>{question.title}</h3>
      <Radio.Group onChange={onChange} value={value}>
        {question.answers.map((answer) => {
          return (
            <Radio style={radioStyle} value={answer.value} key={answer.id}>
              {answer.title}
            </Radio>
          );
        })}
      </Radio.Group>
    </StyledWrapper>
  );
};

export { CurrentQuestion as default };
