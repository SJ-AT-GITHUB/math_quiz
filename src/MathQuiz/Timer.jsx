import React, { useEffect, useState } from 'react';


const Timer = ({ setQuestion }) => {
    const [timer, setTimer] = useState(20);
    useEffect(() => {
        const id = setInterval(() => {
            setTimer((timer) => (timer - 1));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setQuestion();
            setTimer(20);
        }
    }, [timer, setQuestion]);

    return (
        <>
            Timer: { timer} seconds remaining ...
        </>
    )

}

export default Timer;