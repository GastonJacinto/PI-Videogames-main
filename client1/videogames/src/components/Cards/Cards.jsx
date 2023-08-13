import React from 'react'
import Card from '../Card/Card'
import style from "./Cards.module.css"

const Cards = ({props}) => {

  return (
    <div className={style.cardsContainer}>
{props?.map((game)=>{
  return (
    <Card 
    id={game.id}
    key={game.id}
    imagen={game.imagen}
    name={game.name}
    genres={game.genres}
    platforms={game.platforms}
    />
  )
}
)}
    </div>
  )
}

export default Cards