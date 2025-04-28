const { loadQuestion, submitAnswer } = require("../scripts/quiz");

describe("Quiz Logic Tests", () => {
    test("Quiz loads first question", () => {
        document.body.innerHTML = '<p id="quiz-question"></p>';
        loadQuestion();
        expect(document.getElementById("quiz-question").innerText).not.toBe("");
    });

    test("Correct answer increases score", () => {
        let initialScore = 0;
        submitAnswer(0); // Assuming correct answer is at index 0
        expect(initialScore).toBe(1);
    });
});
