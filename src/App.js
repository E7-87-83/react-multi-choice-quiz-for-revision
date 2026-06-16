import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      userAnswer: '',
      answersCount: {},
      correctCount: 0,
      correctOption: '',
      answer: '',
      result: false,
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this); // Bind new handler
    this.setNextQuestion = this.setNextQuestion.bind(this);
  }

  componentDidMount() {
    const correctOption = quizQuestions.map(question => question.answers[question.correct]);
    const shuffledAnswerOptions = quizQuestions.map(question => {
      const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
      return shuffleArray(question.answers);
    });
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      correctOption: correctOption[0]
    });
  }

  handleAnswerSelected(event) {
    const selectedValue = event.target.value;

    this.setState({
      answer: selectedValue
    }, () => {
      const isCorrect = selectedValue === this.state.correctOption;
      this.setState(prevState => ({
        correctCount: isCorrect ? prevState.correctCount + 1 : prevState.correctCount
      }));
      // Automated setTimeout transitions removed from here!
    });
  }

  // New handler triggered by the Next button
  handleNextQuestion() {
    if (this.state.questionId < quizQuestions.length) {
      this.setNextQuestion();
    } else {
      this.setState({ result: true });
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    const nextCorrectIndex = quizQuestions[counter].correct;
    const nextCorrectOption = quizQuestions[counter].answers[nextCorrectIndex];

    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: shuffleArray(quizQuestions[counter].answers),
      correctOption: nextCorrectOption, 
      answer: '' 
    });
  }

  renderQuiz() {
    return (
      <Quiz
        correctCount={this.state.correctCount}
        correctOption={this.state.correctOption}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        answer={this.state.answer}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onNextPressed={this.handleNextQuestion} // Pass button event down
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.correctCount} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>香港基本法及國安法溫習工具 v0.01.0</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
