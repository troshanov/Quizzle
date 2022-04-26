import { IQuestion } from "./question";

export interface IQuizz {
    authorId: string;
    questions: IQuestion[],
    title: string
}