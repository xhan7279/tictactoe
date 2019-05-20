import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class GameBoard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      cells: new Array(this.props.row).fill(null).map( x => Array(this.props.col).fill(null))
    };

    this.computerMove = (r, c) => {
        const board = this
        for (let row = 0; row < board.props.row; row++){
            if (board.checkRow(row) === true){
                return;
            }
        }
        for (let col = 0; col < board.props.col; col++){
            if (board.checkCol(col) === true){
                return;
            }
        }
        if (board.computeMove(r, c) === true){
            return
        }
        else {
            console.error("wrong")
        }
   }
   this.checkRow = (r) => {
        console.log("Check row", r)
        const board = this
        const cells = board.state.cells
        const row = cells[r]
        let playerCount = row.filter(x => x === board.props.player).length
        let computerCount = row.filter(x => x === board.props.computer).length
        let computer_move_row = r
        let computer_move_col = null
        if (playerCount === board.props.row - 1  && row.includes(null)){ //player is about to win
            computer_move_col = row.indexOf(null)
        }
        if (computerCount === board.props.row - 1  && row.includes(null)){ //computer is about to win
            computer_move_col = row.indexOf(null)
        }
        if (computer_move_col != null){
            console.log("Computer move at ", computer_move_row, ", ", computer_move_col)
            const new_cells = board.state.cells
            new_cells[computer_move_row][computer_move_col] = board.props.computer
            board.setState({ cells: new_cells});
            return true
        }

   }
   this.checkCol = (c) => {
        console.log("Check columns", c)
        const board = this
        const cells = board.state.cells
        let playerCount = cells.filter(x => x[c] === board.props.player).length
        let computerCount = cells.filter(x => x[c] === board.props.computer).length
        let computer_move_row = null
        let computer_move_col = c
        let cols = cells.map(x => x[c])
        console.log(cols)
        console.log(playerCount, computerCount)
        if (playerCount === board.props.col - 1  && cols.includes(null)){ //player is about to win
            computer_move_row = cols.indexOf(null)
        }
        if (computerCount === board.props.col - 1  && cols.includes(null)){ //computer is about to win
            computer_move_row = cols.indexOf(null)
        }
        if (computer_move_row != null){
            console.log("Computer move at ", computer_move_row, ", ", computer_move_col)
            const new_cells = board.state.cells
            new_cells[computer_move_row][computer_move_col] = board.props.computer
            board.setState({ cells: new_cells});
            return true
        }

   }
   this.computeMove = (r, c) => {
        const board = this
        const cells = board.state.cells
        const row = board.props.row
        const col = board.props.col
        const max_i = Math.max(r, row - r)
        const max_j = Math.max(c, col - c)

        let computer_move_row = null
        let computer_move_col = null

        for (let i = 0; i < max_i && computer_move_row === null && computer_move_col === null; i ++){
            if (r - i >= 0){
                for (let j = 0; j < max_j; j ++){
                    if (c - j >= 0 && cells[i][j] === null){
                        computer_move_row = i
                        computer_move_col = j
                        break
                    }
                    if (c + j <= col && cells[i][j] === null){
                        computer_move_row = i
                        computer_move_col = j
                        break
                    }
                }
            }
            if (r + i <= row){
                for (let j = 0; j < max_j; j ++){
                    if (c - j >= 0 && cells[i][j] === null){
                        computer_move_row = i
                        computer_move_col = j
                        break
                    }
                    if (c + j <= col && cells[i][j] === null){
                        computer_move_row = i
                        computer_move_col = j
                        break
                    }
                }
            }
        }
        if (computer_move_col != null && computer_move_row != null){
            const new_cells = board.state.cells
            new_cells[computer_move_row][computer_move_col] = board.props.computer
            board.setState({ cells: new_cells});
            return true
        }
        else {
            console.error("Something is wrong")
        }
   }
  }

   static defaultProps = {
     row: 3,
     col: 3,
     player: 'X',
     computer: 'O'
   }



   playerMove(row, col){
        const board = this
        console.log("Player move at ", row, ", ", col)
        let new_cells = board.state.cells
        new_cells[row][col] = board.props.player
        board.setState({ cells: new_cells}, () => {
            console.log(board)
            board.computerMove(row, col)
        });
   }

   render() {
        const board = this
        const row = this.props.row
        const col = this.props.col
        const cells = this.state.cells
        const playerMove = this.playerMove
        return (
          <div className="board">
            {
                Array.from(Array(row).keys()).map(function(i){
                    return <div className="row" key={i.toString()}>
                    {
                        Array.from(Array(col).keys()).map(function(j){
                            return <div className="cell" key={j.toString()} onClick={playerMove.bind(board, i, j)} >{
                                cells[i][j]
                            }</div>
                        })
                    }
                    </div>
                })
            }
          </div>
        );
   }

}

export default GameBoard;
