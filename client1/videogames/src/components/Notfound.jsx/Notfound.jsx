import React from 'react'
import style from "./Notfound.module.css"
const Notfound = () => {
  return (
    <div className={style.notFoundContainer} >
   <div className={style.h1Container}>
   <h1 className={style.notFoundh1}> THERE ARE NO GAMES WITH THAT NAME</h1>
   </div>
    </div>
  )
}

export default Notfound