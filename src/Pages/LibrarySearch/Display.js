import React,{ useState} from 'react';
// import {Button, Input, Box, TextField, Grid} from "@material-ui/core"
import axios from "axios";
import StarRating from '@material-ui/lab/Rating';
import {Button,  Grid} from "@material-ui/core";
import ebook from "./ebook.png"

export default function Display({book,books,setBooks}){
    const [bookAdded, setBookAdded] = useState(false);
    const decodeHTMLEntities = text => {
        if(text===undefined) {
            return "No description"
        } else {
      const textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      return textArea.value;}
    }
  

  
    const addBook = (book, newtitle, newauthor, newimage, newdescription, newrating) =>{
        setBookAdded(true);
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

  const isEbook = (book) => {
    if (book === true) {
        return "Yes"
    } else {
          return "No"
      }
  }
  
  

    return(
        <Grid bgcolor="#9ba7c0" item xs={12} sm={6}> 
            {/* style={{background: "#9ba7c0", height: 400}} */}
            <h2 style={{marginBottom:10, fontSize:30}}>{JSON.stringify(book.volumeInfo.title)}</h2>
            <img style={{marginBottom:10, width:200}} src={book.volumeInfo.imageLinks.thumbnail}></img>
            <div >{decodeHTMLEntities(book.searchInfo.textSnippet)}</div>
            <div style={{marginTop:10, fontSize:20, marginBottom:10}}>Author: {book.volumeInfo.authors[0]}</div>
            <div style={{marginTop:10, fontSize:20, marginBottom:10}}>Rating: {Rating(book.volumeInfo)}</div>
            <div style={{marginTop:10, fontSize:20, marginBottom:10}}>Ebook 
            <img style={{width:25, marginLeft:5, marginRight:3}} src={ebook}></img>: {isEbook(book.saleInfo.isEbook)}</div>
            <Button variant="contained" color="primary" style={{marginRight:10}} href={book.volumeInfo.infoLink} target="_blank">Get More Info</Button> 
                <Button variant="contained" color="primary" 
    onClick={()=>addBook(book, book.volumeInfo.title, book.volumeInfo.authors[0],book.volumeInfo.imageLinks.thumbnail, decodeHTMLEntities(book.searchInfo.textSnippet), AddRating(book.volumeInfo))}>
        {bookAdded ? "Added ✓" : "Add to Library"}</Button>
            </Grid>
    )
}