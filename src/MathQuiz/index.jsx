import React, { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import cloneDeep from 'lodash.clonedeep';
import Quiz from './Quiz';

const MathQuiz = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { cumulativeScore, maxScore, quizes } = state;
    return (
        <>
            Cumulative Score: {cumulativeScore} / {maxScore}
            <br /><br /><br />
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                {
                    quizes.map(quiz => {
                        const { id } = quiz;
                        return (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '30%',
                                    padding: '60px'
                                }}
                            >
                                <Quiz quiz={cloneDeep(quiz)} dispatch={dispatch} key={id} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default MathQuiz;