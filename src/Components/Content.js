import React from 'react'
import Listitems from './Listitems';


const Content = ({items,handleCheck,handleDelete}) => {
 
  return (
    <>
      {items.length?(
        <Listitems 
        items={items} 
       handleCheck={handleCheck}
       handleDelete={handleDelete}
       />
      ):(
        <h1>Your List Is Empty</h1>
      )
}
    </>
  )
}

export default Content;