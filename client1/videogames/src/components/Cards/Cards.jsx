import React from 'react'
import Card from '../Card/Card'
import style from "./Cards.module.css"
import Notfound from '../Notfound.jsx/Notfound'
import { useSelector } from 'react-redux'

const Cards = ({props}) => {
const found = useSelector((state)=> state.found)

  return (
    <div className={style.cardsContainer}>
{found?props?.map((game)=>{
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
):<Notfound/>}
    </div>
  )
}

export default Cards