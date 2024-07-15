import { useState } from 'react'

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad;
    const average = (props.good-props.bad)/total;
    const percentage = props.good/total;
    return (
        <>
            <h2>Statistics</h2>
            <p>Good: {props.good} </p>
            <p>Neutral: {props.neutral}</p>
            <p>Bad: {props.bad}</p>
            <p>All:{total}</p>
            <p>Average: {average}</p>
            <p>Positive: {percentage} %</p>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => {
        console.log('clicked the good-button')
        setGood(good + 1);
    }

    const handleClickNeutral = () => {
        console.log('clicked the neutral-button')
        setNeutral(neutral + 1);
    }

    const handleClickBad = () => {
        console.log('clicked the bad-button')
        setBad(bad + 1);
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <button onClick={handleClickGood}>good</button>
            <button onClick={handleClickNeutral}>neutral</button>
            <button onClick={handleClickBad}>bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App