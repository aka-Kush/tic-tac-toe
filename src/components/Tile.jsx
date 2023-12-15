import React from 'react'

const Tile = ({ className, value, onClick, playerTurn }) => {
    // adds hover effect by checking playerTurn
    let hoverClass = null;
    if (value == null && playerTurn != null) {
        hoverClass = `${playerTurn}-hover`
    }
  return (
      <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>{value}</div>
  )
}

export default Tile;