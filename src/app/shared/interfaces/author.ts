import { IQuizz } from "./quizz";

export interface IAuthor {
    id: string;
    quizzes: IQuizz[],
}