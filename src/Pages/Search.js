import React,{useEffect, useState} from 'react';
// import {Button, Input, Box, TextField, Grid} from "@material-ui/core"
import axios from "axios";
import StarRating from '@material-ui/lab/Rating';
import SearchIcon from '@material-ui/icons/Search'
import {Radio, RadioGroup, FormControlLabel, FormLabel, TextField, FormControl, Select, MenuItem,InputLabel, Button, IconButton, Box, Grid} from "@material-ui/core";
import Display from "./Display"

export default function SearchPage() {
  const[books, setBooks] = useState([]);
  const [buttontext, setTextButton] = useState("Add to my library");
  const [type, setType] = useState("default");
  const [printType, setPrintType] = useState("all");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("hello");

  const newSearch = ()=>{
    const url = new URL("http://localhost:8080/books/search")
    url.searchParams.append("type", type)
    url.searchParams.append("q", query)
    url.searchParams.append("print", printType)
    fetch(url)
    .then((res)=> res.json())
    .then((res)=> {
      setBooks(res);
    }
    )
  }


const handleQuery = (e) =>{
    setQuery(e.target.value);
}

const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const decodeHTMLEntities = text => {
      if(text===undefined) {
          return "No description"
      } else {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;}
  }

  const beforeDisplay = (array) =>{
      if (array != []){
      books.forEach((book)=> (
          book.text = "add to Library",
          book.added = false))
      console.log(books)}
  }

  const addBook = (book, newtitle, newauthor, newimage, newdescription, newrating) =>{
      book.added = true;
    //   book.text="Added ✓";
    const newBook = {
        title: newtitle,
        author: newauthor,
        image: newimage,
        description: newdescription,
        rating: newrating 
    }
    axios.post("http://localhost:8080/books/add", newBook)
    .then(response => {
        console.log(response);
    }) 
    .catch(error => {
        console.log(error)
    })
    changeText(book)
  } 

  const changeText = (book) =>{
      if (book.added === false ){
          return ("Add to Library")
      } 
      if (book.added === true ){
          return("Added ✓")
      }
      console.log(book.added)
  }

  const Rating = (Book)=>{
      if (Book.averageRating === undefined) {
          return "N/A"
      } else {
          return (
              <StarRating name="half-rating-read" defaultValue={Book.averageRating} precision={0.5} readOnly> 
              </StarRating>
          );
      }
  }

  const AddRating = (Book)=>{
    if (Book.averageRating === undefined) {
        return "N/A"
    } else {
        return (
            Book.averageRating
        );
    }
}
const updateData = () =>{
    fetch("http://localhost:8080/books/get")
      .then((res)=> res.json())
      .then((res)=> {
        setBooks(res)
        console.log(res)})
  }

// const addedOrNot = (book) =>{
//     console.log(book.added)
//     if (book.added === undefined){
//         book.added = false;
//     }
//     console.log(book.added)
//     if (book.added === false ){
//     return (<Button variant="contained" color="primary" 
//     onClick={()=>addBook(book.volumeInfo.title, book.volumeInfo.authors[0],book.volumeInfo.imageLinks.thumbnail, decodeHTMLEntities(book.searchInfo.textSnippet), AddRating(book.volumeInfo))}>
//         Add to My Library</Button>)}
//     if (book.added === true ){
//         return (<Button variant="contained" color="primary" >Added</Button>)
//     }
// }

const handlePrint = (e) => {
    setPrintType(e.target.value)
}

  // if (!books) return <div>Loading...</div>

  return (
    <div style={{ textAlign: 'center' }}>
        {beforeDisplay(books)}
         <Box boxShadow={7} border={2} bgcolor="#f4f6ff" width="1400px" height="300px"  borderRadius={16} 
         style={{ marginLeft:260, textAlign: 'center', justifyContent:"center", alignItems:"center"}} >
      <h1 style={{fontSize:36}}>Browse the Library!</h1>
        {/* <span>  */}
        <div display="flex">Keyword Search:   <TextField variant="standard"  type="text" placeholder="Search" style={{width:800, marginTop:10, marginRight:10, marginLeft:20}} onChange={handleQuery} />
        {/* <TextField variant="filled"  type="text" label="Search by Title" style={{width:400, marginTop:10, marginRight:10}} onChange={handleChange('title')} />
        <TextField variant="filled"  type="text" label="Search by Author" style={{width:400, marginTop:10}} onChange={handleChange('author')} /></span> */}
        <Button size="large" style={{marginTop:10}} variant="contained" color="primary" onClick={newSearch}><SearchIcon ></SearchIcon></Button></div>
        <div style={{marginTop:20, marginRight: 720, }}>Advanced Options:<FormControl className="form" style={{width:150, marginRight:10, marginLeft:30}}>
        <InputLabel >Any Field</InputLabel> 
        <Select
          open={open}
          onClose={handleClose}
          value={type}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem value={"inauthor:"}>Author</MenuItem>
          <MenuItem value={"intitle:"}>Title</MenuItem>
          <MenuItem value={"inpublisher:"}>Publisher</MenuItem>
          <MenuItem value={"subject:"}>Subject</MenuItem>
          <MenuItem value={"isbn:"}>ISBN</MenuItem>

        </Select>
      </FormControl>
      <RadioGroup value={printType} onChange={handlePrint}>
        <div style={{marginLeft: 205, marginTop:20, width:550}}>
             Filter by:<FormControlLabel style={{marginLeft: 20}} value="all" control={<Radio />} label="All" /> 
        <FormControlLabel value="books" control={<Radio />} label="Books" />
        <FormControlLabel value="magazines" control={<Radio />} label="Magazines" />
        <FormControlLabel value="ebooks" control={<Radio />} label="eBooks" />
        </div>
      </RadioGroup>
      </div> 
        </Box>
        <Grid style={{marginLeft:300, marginTop:50}} 
        container spacing={10} justifyContent="center " alignContent="center" alignItems="center">
            {books.map((book)=>(
            <Display
            books={books}
            setBooks={setBooks}
            book={book}></Display>
      ))}</Grid>
    </div>
  );
}

