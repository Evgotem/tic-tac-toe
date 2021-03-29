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

   resetGame = () => {
      setTimeout(() => {
         this.setState({ squares: Array(9).fill(null) });
         this.setState({ count: 0 });
      }, 100);
   };


   isWinner = () => {
      let token = this.state.count % 2 === 0 ? "X" : "0";
      for (let i = 0; i < this.victoryLines.length; i++) {
         let line = this.victoryLines[i];
         if (
            this.state.squares[line[0]] === token &&
            this.state.squares[line[1]] === token &&
            this.state.squares[line[2]] === token
         ) {
            alert(token + " won!");
            this.resetGame();
            return true;
         }
      }
      return false;
   };

   isDraw = () => {
      if (this.state.count === this.victoryLines.length && !this.isWinner) {
         alert("Draw");
         this.resetGame();
      }
   };

   clickHandler = (event) => {
      // получаем номер элемента, по которому кликнули
      let data = event.target.getAttribute("data");
      // записываем массив squares из state в переменную
      let currentSquares = this.state.squares;
      // проверка на наличие введенного знака х или 0 в квадрате
      if (currentSquares[data] === null) {
         // меняем значение элемента на который кликнули
         currentSquares[data] = this.state.count % 2 === 0 ? "X" : "0";
         // увеличиваем счетчик на 1
         this.setState({ count: this.state.count + 1 });
         // перезаписываем измененный массив в state
         this.setState({ squares: currentSquares });
      }
      // проверка на победу;
      this.isWinner();
      // проверка на ничью
      this.isDraw();
   };

   startNewGame = () => {
      this.resetGame();
   }

   render() {
      return (

        <div className='app-wrapper'>
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
        </div>
      );
   }
}

export default App;
