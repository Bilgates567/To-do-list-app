import React from 'react'
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import { useState,useEffect } from 'react';
import Additem from './Components/Additem';
import { Searchitem } from './Components/Searchitem';
import ApiReqest from './Components/ApiReqest';


const App = () => {
  const API_URL=' http://localhost:3500/items'
  const [items,setItems]=useState([])

const[newItem,setNewItem]=useState('')
const[fetchError,setFetchError]=useState(null)
const[islodeing,setisLodeing]=useState(true)
useEffect(()=>{
  const fectchItems=async()=>{
    try{
      const response=await fetch(API_URL);
      if(!response.ok) throw Error("Data not recevied")
      console.log(response)
      const listItems= await response.json()
      console.log(listItems)
      setItems(listItems);
      setFetchError(null)

    }
    catch(err){
      setFetchError(err.message)
    }
    finally{
      setisLodeing(false)
    }
  }
  setTimeout(()=>{
    (async ()=>await fectchItems())()
  },2000)
},[])

//search
const[search,setSearch]=useState('')

const addItems=async(item)=>{
  const id=items.length?items[items.length-1].id+1:1
  const addNewitems={id,checked:false,item}
  const listItem=[...items,addNewitems]
  setItems(listItem)


  //post json server
  const postOperation={
    method:"POST",
    headers:{'Content-Type':'application/json'
  },
    body:JSON.stringify(addNewitems)
  }
  const result=await ApiReqest(API_URL,postOperation)
  if(result) setFetchError(result)

}

const handleCheck = async(id)=>{
  const listitems=items.map((item)=>
  item.id===id?{...item,checked:!item.checked}:item)
  setItems(listitems)

  //update json server
  const myItems=listitems.filter((item)=>item.id===id)
  const updateOperation={
    method:"PATCH",
    headers:{'Content-Type':'application/json'
  },
    body:JSON.stringify({checked:myItems[0]})
  }
  const reqUrl=`${API_URL}/${id}`
  const result=await ApiReqest(reqUrl,updateOperation)
  if(result) setFetchError(result)

}

const handleDelete=async(id)=>{
  const Listitems=items.filter((item)=>
    item.id!==id)
    setItems(Listitems)

  //delete 
  const deleteOperation={method:'DELETE'}
  const reqUrl=`${API_URL}/${id}`
  const result=await ApiReqest(reqUrl,deleteOperation)
  if(result) setFetchError(result)
  
}

const handleSumbit=(e)=>{
  e.preventDefault()
   
   if(!newItem)return;
   console.log(newItem)
   addItems(newItem)
   setNewItem('')
  
}



  return (
    <div className='App'>
      <Header tittle={"Course List"} />
      <Additem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSumbit={handleSumbit}
      />
      <Searchitem 
        search={search}
        setSearch={setSearch}
       />
       <main>
        {islodeing && <p>Loading Please Wait...</p>}
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
        {!islodeing && !fetchError &&
        <Content items={items.filter(item=>((item.item).
          toLowerCase()).
          includes(search.toLowerCase()))} 
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length}/>
    </div>
  )
}



export default App
