import React, { useState, useEffect } from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import gameOverSoundAsset from "../sounds/over.mov";
import clickSoundAsset from "../sounds/click.mov";

// initializing our players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// initializing click and game over sound 
const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

// possible winningCombinations array with corresponding Strike class
const winningCombinations = [
    // row
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    // column
    { combo: [0, 3, 6], strikeClass: "strike-col-1" },
    { combo: [1, 4, 7], strikeClass: "strike-col-2" },
    { combo: [2, 5, 8], strikeClass: "strike-col-3" },
    // diagonal
    { combo: [0, 4, 8], strikeClass: "strike-diag-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diag-2" }
];

function checkWinner(tiles, setStrikeClass, setGameState) {
    for (const { combo, strikeClass } of winningCombinations) {
        // stores value of each combo and compares it later
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];
    
        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue2 === tileValue3) {
            setStrikeClass(strikeClass);
            if (tileValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            }
            else {
                setGameState(GameState.playerOWins);
            }
            // returns if one of the player wins
            return; 
        }
        
    }

    // if each tile is filled with some value other than null, draw
    const areAllTilesFilled = tiles.every((tile) => tile !== null);
    if (areAllTilesFilled) {
        setGameState(GameState.draw);
    }
}


const TicTacToe = () => {
    // stores and updates the state of tiles
    const [tiles, setTiles] = useState(Array(9).fill(null));
    // stores and updates current playerTurn
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    // stores and updates strike class
    const [strikeClass, setStrikeClass] = useState();
    // stores and updates current gameState
    const [gameState, setGameState] = useState(GameState.inProgress)

    // useEffect calls checkWinner function and is dependent on tiles
    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    // useEffect methods for sounds
    useEffect(() => {
        if (tiles.some((tile) => tile !== null)) {
            clickSound.play();
        }
    }, [tiles]);
    useEffect(() => {
        if (gameState !== GameState.inProgress) {
            gameOverSound.play();
        }
    }, [gameState]);

    // method to handle the functionality of a tile being clicked
    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;    
        }

        // if index is not null then don't change playerturn and just return
        if (tiles[index] !== null) return;
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);

        // updates current playerTurn
        if (playerTurn === 'X') setPlayerTurn(PLAYER_O);
        else setPlayerTurn(PLAYER_X);
    }

    // if reset button is clicked, change gameState to inProgress, reset all tiles to null, change playerTurn to X and set Strikeclass to null
    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    return (
      <div className='container'>
      <h1 className='title'>Tic Tac Toe game in <span>React</span></h1>
            <Board strikeClass={strikeClass} playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} />
            <GameOver gameState={gameState} />
            <Reset gameState={gameState} onReset={handleReset} />
      </div>
  )
}

export default TicTacToe