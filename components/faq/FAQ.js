import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Question from '../faq/Question'


/**
 * F.A.Q. container
 * It renders and array of questions
 * each question shoulb be defined according the Question Component.
 *
 * e.g.
 * ```javascript
 *
 * //Define some questions
 * const questions = [{
 *   question: "How can I help you?",
 *        reply: "You have several options to choose:",
 *        bullets: bullets,
 *        actionText: "I'm ready to help!",
 *        onClick: action_example
 * }]
 *
 * // Render a FAQ component
 *
 * <FAQ questions=questions />
 * ```
 */
export default class FAQ extends React.Component {
    static propTypes = {
        /**
         * Style for the main View Component of the F.A.Q.
         * This view contains the title and questions container
         */
        containerStyle: PropTypes.object,
        /**
         * Style for the View component title container
         */
        titleContainerStyle: PropTypes.object,
        /**
         * Style for the Text component containing the title
         */
        titleStyle: PropTypes.object,
        /**
         * A string for the title of the FAQ
         */
        title: PropTypes.string,
        /**
         * An array containing the Questions to be rendered.
         */
        questions: PropTypes.array,
        /**
         * styles for the View component questions container.
         *
         */
        questionContainerStyle: PropTypes.object
    }

    renderQuestions = (questions) => {
        return questions.map((question, index) => {

            return <Question
                key={`${question.question}-${index}`}
                {...question}
            />
        })
    }

    render() {
        const renderedQuestions = this.renderQuestions(this.props.questions)
        return (
            <View style={[this.props.containerStyle]}>
                <View style={[this.props.titleContainerStyle]}>
                    <Text style={[this.props.titleStyle]}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={[this.props.questionContainerStyle]}>
                    {renderedQuestions}
                </View>
            </View>
        )
    }

}

FAQ.defaultProps = {

    containerStyle: {},

    questionContainerStyle: {},

    titleContainerStyle: {},

    titleStyle: {
        fontSize: 30,
        textAlign: 'center'
    }
}