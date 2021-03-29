import React from 'react';
import { actions } from './reducer';
import Questions from './Questions';


const Quiz = ({ quiz, dispatch }) => {
    const { noOfQuestions, operators, randomNoLimit, started, score, id } = quiz;
    const { UPDATE_NO_OF_QUESTIONS, UPDATE_OPERATOR, UPDATE_RANDOM_LIMIT, START } = actions;
    if (!started) {
        return (
            <>
                Choose no of Questions:
                <input value={noOfQuestions} name="noOfQuestions" onChange={({ target: { value } }) => dispatch({ type: UPDATE_NO_OF_QUESTIONS, payload: { value, id } })} />
                <br />

                Generate Random No less than:
                <input value={randomNoLimit} name="randomNoLimit" onChange={({ target: { value } }) => dispatch({ type: UPDATE_RANDOM_LIMIT, payload: { value, id } })} />
                <br />

                Choose the Operators for your quiz: (at least one)
                {
                    ['+', '-', '/', '*'].map(operator => (
                        <>
                            <br />
                            <input
                                type="checkbox"
                                value={operator}
                                checked={operators.includes(operator)}
                                onChange={({ target: { value } }) => dispatch({ type: UPDATE_OPERATOR, payload: { value, id } })}
                            />
                            {operator}
                        </>
                    ))
                }
                <br />

                <button disabled={started || !operators.length} onClick={() => dispatch({ type: START, payload: id })}>Start Quiz</button>
                <br />
            </>
        )
    }
    return (
        <Questions
            {...{ randomNoLimit, operators, score, noOfQuestions, dispatch, id }}
        />
    )

}

export default Quiz;