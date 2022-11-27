import { useState, useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const textBoxRef = useRef(null)
  const handleChange = (e) => {
    const {value} = e.target
    setText(value)
  }
  console.log(text)

  //logic to calculate the ttal number of words in text..
  function getWordCount(txt) {
    const wordsArr = txt.trim().split(" ")//trim just clears up the white space.
    const filteredWords = wordsArr.filter((word) => {return word != ""}) //this filter method will remove white space from the very beginning that appears after the page refresh
    // console.log(wordsArr.length)
    console.log(filteredWords)
    return filteredWords.length
    // return wordsArr.length
  }
  // console.log(numberOfWords)

  function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(5)
    setText("")
    textBoxRef.current.disabled = false
        textBoxRef.current.focus()
  }
  function endGame() {
    setIsTimeRunning(false)
      const numWords = getWordCount(text)
      setWordCount(numWords)
      console.log(numWords)
  }

    //useEffect will run when the componenet first mounts and it will run wnytime when time rmaining changes. 
  useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeRemaining <= 0) {
      endGame()
    }
  }, [timeRemaining, isTimeRunning])

  return (
    <>
    <h1>Speed Game</h1>
    <div>
    <textarea id="w3review" name="w3review" rows="4" cols="50" 
    onChange={handleChange} value = {text} disabled={!isTimeRunning} ref={textBoxRef}></textarea>
    </div>
    <div><h4>Time Remaining: {timeRemaining} </h4></div>
    {/* <button type="button" className="button" onClick={() => getWordCount(text)}>Start Game!</button> */}
    <button 
    type="button" className="button" onClick={() => setIsTimeRunning(true)}disabled={isTimeRunning}>
      Start Game!
      </button>
    <div><h1>Word Count: {wordCount}</h1></div>
    </>
  )
}

export default App
