export interface Question {
    id: number,
    title: string,
    answers: Answer[]
}

export interface Answer {
    id: number,
    title: string,
    value: number,
    questionId: number
}