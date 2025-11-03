import React from 'react'
import style from '../Move/Move.module.css'

const Move = ({gonexttPage,gottoPrev}) => {
  return (
   <>
    {gottoPrev && <button onClick={gottoPrev} className={style.prev} >Previous Page</button>}
    {gonexttPage   &&   <button onClick={gonexttPage} className={style.next}>Next Page</button>}
   </>
  )
}

export default Move
