import quizInfo from './quizInfo.json';

let quizQuestions = quizInfo
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 20);

export default quizQuestions;
