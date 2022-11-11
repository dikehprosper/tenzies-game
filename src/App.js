import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';


function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
const allHeld = dice.every(die => die.isHeld)
const firstValue = dice[0].value
const allSameValue = dice.every(die => die.value === firstValue)
 if (allHeld && allSameValue){
  setTenzies(true)
 }
}, [dice])

function allNewDice() {
  const newDice = []
  for (let i= 0; i < 10; i++){
    newDice.push({
      value: Math.ceil(Math.random() * 6),
      id : nanoid(),
      isHeld:false
    })
  }
  return newDice
}
const diceElements = dice.map(die =>
   <Die 
   value={die.value}
  key = {die.id}
  isHeld= {die.isHeld}
  holdDice = {() => holdDice(die.id)} 
  />)


function rollDice(){
  if (!tenzies) {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
      die :
      {
        value: Math.ceil(Math.random() * 6),
        id : nanoid(),
        isHeld:false
      }
    }))
 } else { 
  setTenzies(false)
  setDice(allNewDice())
 }


}

function holdDice(id) {
  setDice(oldDice => 
    oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} : die
     } ))
}
function good() {
return(
<h1>Good Job!!</h1>
)
  
}
  
  return (
    <main>
      { tenzies && <div className='on-end'> <h1>Good Job!!</h1> <h4>You have
         successfully completed the game!</h4> </div>}
      <h1 className="title">Tenzies</h1>
      <h4 className="instructions">Roll until all the dice are the same, 
      Click <br /> each die to freeze it at its current <br /> value between rolls</h4>
    <div className='dice-container'>
       {diceElements}
    </div>
    <button className='roll-dice' onClick={rollDice}>
      {tenzies ? "New Game" : "Roll"}
    </button>
    </main>
  );
}

export default App;
