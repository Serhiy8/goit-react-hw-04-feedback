import { useState } from 'react';
import css from './App.module.css';
import Section from 'components/Section/Section';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics/Statistics';
import Notification from 'components/Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = {
    good: 'good',
    neutral: 'neutral',
    bad: 'bad',
  };

  const handleButtonClick = e => {
    const value = e.target.value;
    switch (value) {
      case options.good:
        setGood(good + 1);
        break;
      case options.neutral:
        setNeutral(neutral + 1);
        break;
      case options.bad:
        setBad(bad + 1);
        break;

      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

  return (
    <>
      <div className={css.container}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.values(options)}
            onLeaveFeedback={handleButtonClick}
          />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    </>
  );
};
