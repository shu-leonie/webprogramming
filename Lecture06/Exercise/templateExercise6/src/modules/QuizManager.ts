// import Question from "./Question.js";
// import Option from "./Option.js";
//import QuestionInterface from "./QuestionInterface.ts";
//import type { QuestionInterface } from "./modules/QuestionInterface.js";
//import type QuestionInterface from "./QuestionInterface.js";


export default class QuizManager {

    questions: Question[] = [];
    easyQuestions: Question[] = [];
    mediumQuestions: Question[] = [];
    hardQuestions: Question[] = [];

    usedQuestionIds: number[] = [];

    constructor() {
        this.init();
    }


    // load json
    async loadQuestions(): Promise<Question[]> {
        try {
            const response: Response = await fetch('./questions.json');
            const data: Question[] = await response.json();

            return data;

        } catch (error) {
            console.error('Error loading questions', error);
            return [];
        }
    }

    async init() {
        const data: Question[] = await this.loadQuestions();

        this.questions = this.shuffleArray(data);
        //console.log(this.questions);

        this.easyQuestions = this.questions.filter(q => q.difficulty === 1);
        this.mediumQuestions = this.questions.filter(q => q.difficulty === 2);
        this.hardQuestions = this.questions.filter(q => q.difficulty === 3);

        // should be called from outside, when the quiz starts
        this.getQuestions();
    }

    public getQuestions() {
        let selectedQuestions = this.selectQuestions();

        if (selectedQuestions.length < 5) {
            this.usedQuestionIds = [];
            selectedQuestions = this.selectQuestions();
        }

        // add question ids to usedQuestionIds
        selectedQuestions.forEach(q => this.usedQuestionIds.push(q.id));
        console.log(selectedQuestions);
    }

    shuffleArray(array: any[]): any[] {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    selectQuestions(): Question[] {
        // get two easy, two medium and one hard question that have not been used before
        const selectedQuestions: Question[] = [];
        selectedQuestions.push(...this.easyQuestions.filter(q => !this.usedQuestionIds.includes(q.id)).slice(0, 2));
        selectedQuestions.push(...this.mediumQuestions.filter(q => !this.usedQuestionIds.includes(q.id)).slice(0, 2));
        selectedQuestions.push(...this.hardQuestions.filter(q => !this.usedQuestionIds.includes(q.id)).slice(0, 1));

        return selectedQuestions;
    }
}

interface Question {
    id: number;
    category: string;
    question: string;
    options: Option[];
    answerId: number;
    difficulty: number;
}

interface Option {
    id: number;
    answer: string;
    isCorrect: boolean;
}