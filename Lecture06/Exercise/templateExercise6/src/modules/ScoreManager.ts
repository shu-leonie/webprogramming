export default class ScoreManager {

    difficulties: { [key: number]: string } = { 1: "easy", 2: "medium", 3: "hard" };

    // create user?

    // user.score += checkAnswer();

    // check if answer is correct and return the difficulty score for the question
    // checkAnswer(question: Question, answerId: number): number {
    //     const selectedOption = question.options.find(option => option.id === answerId);

    //     // increment possible score
    //     // user.possibleScore += question.difficulty;

    //     if (selectedOption) {
    //         return selectedOption.isCorrect ? question.difficulty : 0;
    //     }
    //     return 0;
    // }

}

interface User {
    name: string;
    score: number;
    possibleScore: number;

    // method to calculate the score percentage
    calculateScorePercentage(): number

    // { if (this.possibleScore === 0) return 0;
    //     return (this.score / this.possibleScore) * 100;
    // }
}