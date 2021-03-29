import React, { useEffect, useState, useCallback } from 'react';
import { actions } from './reducer';

import { randomQuestionGenerator } from './helper';


const Questions = (props) => {
    const { randomNoLimit, operators, score, noOfQuestions, dispatch, id } = props;
    const { SUBMIT_ANSWER, RESET } = actions;
    const [{ question, answer, counter, submittedAnswer }, setState] = useState({
        counter: 0,
        submittedAnswer: '',
    });

    const [timer, setTimer] = useState(20);

    const setQuestion = useCallback(
        () => {
            const { question, answer } = randomQuestionGenerator(randomNoLimit, operators);
            setState(({ counter }) => ({
                question, answer, counter: counter + 1,
                submittedAnswer: '',
            }));
        },
        [randomNoLimit, operators],
    );

    useEffect(() => {
        setQuestion();
        const id = setInterval(() => {
            setTimer((timer) => (timer - 1));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (timer === 0 && counter < noOfQuestions) {
            setQuestion();
        }
    }, [timer, setQuestion, counter, noOfQuestions]);

    useEffect(() => {
        setTimer(20);
    }, [question])

    return (
        <>
            {
                counter > noOfQuestions
                    ? <> Quiz Finished <br /></>
                    : (
                        <>
                            Question: {counter} of {noOfQuestions}
                            <br /><br />
                            Timer: { timer} seconds remaining ...
                            <br /><br />
                            {question}
                            <br /><br />
                            <input
                                type="text"
                                value={submittedAnswer}
                                onChange={({ target: { value } }) => setState(({ submittedAnswer, ...rest }) => ({ submittedAnswer: value, ...rest }))}

                            />
                            <br /><br />
                        </>
                    )
            }
                Score: {score} / {noOfQuestions}
            <br /><br />
            <button
                disabled={counter > noOfQuestions}
                onClick={() => {
                    dispatch({ type: SUBMIT_ANSWER, payload: { question, answer, submittedAnswer, id } })
                    setQuestion();
                }}>
                Next
            </button>
            <br /><br />
            <br /><br />
            <button
                onClick={() => {
                    dispatch({ type: RESET, payload: id })
                }}
            >
                Reset
            </button>
        </>
    )

}

export default Questions;