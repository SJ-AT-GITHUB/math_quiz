const maths = {
    "+": (x, y) => x + y,
    '-': (x, y) => x - y,
    '/': (x, y) => Math.floor(x / y),
    '*': (x, y) => x * y,
}

export const randomQuestionGenerator = (randomNoLimit, operators) => {
    const x = Math.floor(Math.random() * (randomNoLimit));
    const y = Math.floor(Math.random() * (randomNoLimit));
    const operator = operators[Math.floor(Math.random() * (operators.length))];
    console.log('@#$@#$#@$', x, y, operator);
    return ({
        question: `${x} ${operator} ${y} ?`,
        answer: maths[operator](x, y),
    })
}
