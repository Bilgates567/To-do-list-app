import React from 'react'

 const Header = ({tittle}) => {
   // const headerstyle={backgroundColor:"mediumblue",color:"white"}
  return (
   <header>
    <h1>{tittle}</h1>
   </header>
  )

}
// Header.defaultProps={
//   tittle:"To do list"
// }
export default Header;
