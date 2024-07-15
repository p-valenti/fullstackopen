import { useState } from 'react'

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
            <h2>Statistics</h2>
            <p>Good: {good} </p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All:{good+neutral+bad}</p>
            <p>Average: {(good-bad)/(good+neutral+bad)}</p>
            <p>Positive: {good/(good+neutral+bad)}</p>
        </div>
    )
}

export default App