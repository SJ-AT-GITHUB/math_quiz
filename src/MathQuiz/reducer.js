import cloneDeep from 'lodash.clonedeep';

export const initialState = {
    cumulativeScore: 0,
    maxScore: 40,
    quizes: [
        {
            id: 'quiz_1',
            started: false,
            noOfQuestions: 5,
            score: 0,
            operators: ['+', '-', '/', '*'],
            randomNoLimit: 10,
            questions: [],
        },
        {
            id: 'quiz_2',
            started: false,
            noOfQuestions: 5,
            score: 0,
            operators: ['+', '-', '/', '*'],
            randomNoLimit: 10,
            questions: [],
        },
    ]

}

export const actions = {
    UPDATE_NO_OF_QUESTIONS: 'updateNoOfQuestions',
    UPDATE_OPERATOR: 'updateOperator',
    UPDATE_RANDOM_LIMIT: 'updateRandomLimit',
    RESET: 'reset',
    START: 'start',
    SUBMIT_ANSWER: 'submitAnswer',
}

const reducer = (state, action) => {
    console.log('action', action);
    switch (action.type) {
        case actions.START:
            {
                const { quizes, ...rest } = cloneDeep(state);
                const index = quizes.findIndex(({ id }) => id === action.payload);
                quizes[index].started = true;
                return { ...rest, quizes };
            }
        case actions.SUBMIT_ANSWER:
            {
                const { question, answer, submittedAnswer } = action.payload;
                const { quizes, cumulativeScore, ...rest } = cloneDeep(state);
                let newCumulativeScore = cumulativeScore;
                const index = quizes.findIndex(({ id }) => id === action.payload.id);
                const newQuiz = cloneDeep(quizes[index]);
                newQuiz.questions.push({ question, answer, submittedAnswer });
                if (answer === parseInt(submittedAnswer)) {
                    newQuiz.score++;
                    newCumulativeScore++;
                }
                quizes[index] = newQuiz;
                return { ...rest, quizes, cumulativeScore: newCumulativeScore };
            }
        case actions.RESET:
            {
                const { quizes, cumulativeScore, ...rest } = cloneDeep(state);
                const index = quizes.findIndex(({ id }) => id === action.payload);
                const { score } = quizes[index];
                const newQuiz = cloneDeep(initialState.quizes[index]);
                quizes[index] = newQuiz;
                return { ...rest, quizes, cumulativeScore: cumulativeScore - score };
            }
        case actions.UPDATE_NO_OF_QUESTIONS:
            {
                const { quizes, maxScore, ...rest } = cloneDeep(state);
                const index = quizes.findIndex(({ id }) => id === action.payload.id);
                quizes[index].noOfQuestions = parseInt(action.payload.value);
                const newMax = quizes.reduce((acc, { noOfQuestions }) => acc + noOfQuestions, 0)
                return { ...rest, quizes, maxScore: newMax };
            }
        case actions.UPDATE_OPERATOR:
            {
                const { quizes, ...rest } = cloneDeep(state);
                const index = quizes.findIndex(({ id }) => id === action.payload.id);
                if (quizes[index].operators.includes(action.payload.value)) {
                    quizes[index].operators = quizes[index].operators.filter(op => op !== action.payload.value)
                } else {
                    quizes[index].operators.push(action.payload.value);
                }
                return { ...rest, quizes };
            }
        case actions.UPDATE_RANDOM_LIMIT:
            {
                const { quizes, ...rest } = cloneDeep(state);
                const index = quizes.findIndex(({ id }) => id === action.payload.id);
                quizes[index].randomNoLimit = parseInt(action.payload.value);
                return { ...rest, quizes };
            }
        default:
            console.log('Unhandled Action');
    }
}

export default reducer;