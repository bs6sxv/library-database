import React,{useEffect, useState} from 'react';
import EditLibrary from './EditLibrary'
import LibraryHeader from "./LibraryHeader"

export default function Library() {
  const[library, setLibrary] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/books/get")
    .then((res)=> res.json())
    .then((res)=> {
      setLibrary(res);
      console.log(res)
    }
    )
  }, [])

  const Loading = () =>{
    if (library.length === 0) {
      return "Loading..."
    } else {
      return "Your library contains: " + library.length + " books!"
    }
  }


  return (
    <div>
      <LibraryHeader></LibraryHeader>
      <h1 style={{justifyContent:"center", marginLeft:850}}>Personal Library</h1>
      <h2 style={{marginLeft: 800}}> {Loading()}</h2>
      {library.map((book)=>(
        <EditLibrary
        setLibrary={setLibrary}
        book={book}></EditLibrary>
      ))}
    </div>
  );
}

