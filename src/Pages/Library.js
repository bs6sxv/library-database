import React,{useEffect, useState} from 'react';
import EditLibrary from './EditLibrary'

export default function SearchPage() {
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
      return "Loading Library..."
    } else {
      return "Your library contains: " + library.length + " books!"
    }
  }


  return (
    <div>
      <h2 style={{marginLeft: 570}}>{Loading()}</h2>
      {library.map((book)=>(
        <EditLibrary
        setLibrary={setLibrary}
        book={book}></EditLibrary>
      ))}
    </div>
  );
}

