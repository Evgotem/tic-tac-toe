import React from "react";
import "./App.css";

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // создаем массив из 9 элементов и заполняем его пустыми значениями (null)
         squares: Array(9).fill(null),
         // счетчик кликов
         count: 0,
         tokenX: 0,
         token0: 0,
         stepCount: 0
      };
      // победные комбинации
      this.victoryLines = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6],
      ];
   }
   // обнуление игры
   resetGame = () => {
      setTimeout(() => {
         this.setState({ squares: Array(9).fill(null) });
         this.setState({ count: 0 });
         this.setState({ stepCount : 0 });
         document.querySelector('.stepCountBtn').removeAttribute('disabled');
      }, 100);
   };

   resultMessage = message => {
      setTimeout(() => {
         alert(message);
      }, 50);
   }
   //  проверка на победу
   isWinner = () => {
      let token;
      // если изменили символ первого хода, то меняем токен
      if (this.state.stepCount % 2 === 0){
         token = this.state.count % 2 === 0 ? "X" : "0";
      } else {
         token = this.state.count % 2 === 0 ? "0" : "X";
      }
      for (let i = 0; i < this.victoryLines.length; i++) {
         let line = this.victoryLines[i];
         if (
            this.state.squares[line[0]] === token &&
            this.state.squares[line[1]] === token &&
            this.state.squares[line[2]] === token
         ) {
            this.resultMessage(token + " победили!");
            this.resetGame();
            // увеличиваем счетчик у Х или 0 если была победа
            (token === 'X') ? this.setState({tokenX: this.state.tokenX+1}) : this.setState({token0: this.state.token0+1});
            return true;
         }
      }
      return false;
   };
   // проверка на ничью
   isDraw = () => {
      if (this.state.count === this.state.squares.length-1 && !this.isWinner()) {
         this.resultMessage("Ничья");
         this.resetGame();
      }
   };
   // отлавливаем клик по полю
   clickHandler = (event) => {
      // получаем номер элемента, по которому кликнули
      let data = event.target.getAttribute("data");
      // записываем массив squares из state в переменную
      let currentSquares = this.state.squares;
      // проверка на наличие введенного знака х или 0 в квадрате
      if (currentSquares[data] === null) {
         // меняем значение элемента на который кликнули
         if(this.state.stepCount % 2 === 0){
            currentSquares[data] = this.state.count % 2 === 0 ? "X" : "0";
         } else {
            currentSquares[data] = this.state.count % 2 === 0 ? "0" : "X";
         }
         // увеличиваем счетчик на 1
         this.setState({ count: this.state.count + 1 });
         // перезаписываем измененный массив в state
         this.setState({ squares: currentSquares });
      }
      // проверка на победу;
      this.isWinner();
      // проверка на ничью
      this.isDraw();
      // кто ходит первым
      if (this.state.squares.indexOf('X') || this.state.squares.indexOf('0')) {
         document.querySelector('.stepCountBtn').setAttribute('disabled', 'disabled');
      }
   };

   startNewGame = () => {
      this.resetGame();
   }

   // кто ходит первым
   stepCountIncrease = () => {
      this.setState({stepCount: this.state.stepCount+1});
   }

   render() {
      return (

        <div className='app-wrapper'>
           <div className='scores'><b>Счет:</b><br/>
               <b>X</b>: {this.state.tokenX}<br/>
               <b>0</b>: {this.state.token0}
            </div>
            <div className="tic-tac-toe">
               <div className="ttt-grid" onClick={this.clickHandler} data="0">
                  {this.state.squares[0]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="1">
                  {this.state.squares[1]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="2">
                  {this.state.squares[2]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="3">
                  {this.state.squares[3]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="4">
                  {this.state.squares[4]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="5">
                  {this.state.squares[5]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="6">
                  {this.state.squares[6]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="7">
                  {this.state.squares[7]}
               </div>
               <div className="ttt-grid" onClick={this.clickHandler} data="8">
                  {this.state.squares[8]}
               </div>
            </div>
            <button className='new-game-btn' onClick={this.startNewGame}>
               Новая игра
            </button>
            <div className='btn-wrapper'>Первыми ходят:  
               <button className='stepCountBtn' onClick={this.stepCountIncrease}>
                  {(this.state.stepCount % 2 === 0) ? 'X' : '0'}
               </button>
            </div>
        </div>
      );
   }
}

export default App;
