import quizInfo from './quizInfo.json';
import basicDetail from '../basicDetail.json';

let quizQuestions = quizInfo
    .slice(0, basicDetail.numOfQs)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default quizQuestions;
