import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  function renderAnswerOptions(key, currentSelection) {
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        correctCount={props.correctCount}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
        selectedAnswer={currentSelection}
        correctOption={props.correctOption}
      />
    );
  }

  // Determine if this is the last question to change button text dynamically
  const isLastQuestion = props.questionId === props.questionTotal;

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map((option) => renderAnswerOptions(option, props.answer))}
        </ul>
        
        {/* Next Button Section Container */}
        <div className="quizFooter">
          <button 
            className="nextButton"
            onClick={props.onNextPressed}
            disabled={props.answer === ''} // Disabled until an option is selected
          >
            {isLastQuestion ? "View Results" : "Next Question"}
          </button>
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  correctCount: PropTypes.number.isRequired,
  correctOption: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  onNextPressed: PropTypes.func.isRequired, // Added prop definition
  answer: PropTypes.string
};

export default Quiz;
