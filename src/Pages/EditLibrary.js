import React,{ useState} from 'react';
import {Button, Input, Box, TextField, Grid} from "@material-ui/core"
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarRating from '@material-ui/lab/Rating';
import CheckMark from '@material-ui/icons/CheckSharp';

export default function EditLibrary({book, setLibrary}) {
  const[editState, setEditState] =useState(false);
  const [editedTitle, setEditedTitle] = useState("new title");
  const [editedAuthor, setEditedAuthor] = useState("new author");
  const [editedDescription, setEditedDescription] = useState("new description");
  const [editedRating, setEditedRating] = useState(0);

const updateData = () =>{
  fetch("http://localhost:8080/books/get")
    .then((res)=> res.json())
    .then((res)=> {
      setLibrary(res)
      console.log(res)})
}

  // if (!books) return <div>Loading...</div>
  const deleteBook = (id)=>{
  //  console.log(id)
    axios.delete("http://localhost:8080/books/delete", { params: { id: id } } )
    .then(response => {
        console.log(response);
        
    }) 
    .catch(error => {
        console.log(error)
    })
    updateData();
    updateData();
  }
  const handleChange = (prop) => (e) =>{
    if ('title' === prop){
      setEditedTitle(e.target.value)
    }
    if ('author' === prop){
        setEditedAuthor(e.target.value)
      }
      if ('description' === prop){
        setEditedDescription(e.target.value)
      }
}

const changeEditState = (book) =>{
    if (editState === false){
        setEditState(true);
        setEditedAuthor(book.author);
        setEditedTitle(book.title);
        setEditedDescription(book.description);
        setEditedRating(book.rating)
    } else {
        changeData(book.id)
        setEditState(false);
       // window.location.reload();
    }
}

const changeData = (id)=> {
  const updated = {
    id: id,
    title: editedTitle,
    author: editedAuthor,
    description: editedDescription,
    rating: editedRating
}
axios.put("http://localhost:8080/books/edit", updated)
.then(response => {
    console.log(response);
}) 
.catch(error => {
    console.log(error)
})
updateData();
updateData();
}

const Rating = (Book)=>{
  if (Book.rating !== "N/A") {
      if (editState === false){
    return (
      <StarRating name="half-rating-read" value={Book.rating} precision={0.5} readOnly> 
      </StarRating>
  );} else {
      return (
        <StarRating
        name="simple-controlled"
        value={editedRating}
        onChange={(event, newValue) => {
          setEditedRating(newValue);
        }}
      />
      )
  }
}
}
  return (
    <div>
        {editState ? 
        <Box display="flex" alignItems="center" justifyContent="flex-start"
        height={300} width={1250}  m={2.5} style={{marginLeft: 330}}
        borderRadius={1} boxShadow={3} bgcolor="#d3d0d9">
        <img style={{marginLeft:20, marginBottom:10, width:170}} src={book.image}></img>
        <div >
        <Button style={{float: "right"}} onClick={()=>changeEditState(book)}><CheckMark fontSize="large" ></CheckMark></Button>
        <div style={{fontSize:14, marginLeft: 40 }}><h1 ><TextField style={{width:600}} label="Title" onChange={handleChange('title')} value={ editedTitle}></TextField></h1></div>
        <div style={{marginLeft: 40, fontSize:20}}>{Rating(book)}</div>
        <div style={{marginLeft: 40 }}><Box ><h3 ><TextField style={{width:300}} label="Author" value={editedAuthor} onChange={handleChange('author')}></TextField></h3></Box></div>
        <Box width={1010}><div style={{fontSize: 18, marginLeft: 40}}><TextField style={{width:1000}} label="Description" onChange={handleChange('description')} multiline rowsMax={4} value={editedDescription}></TextField></div></Box>
        </div></Box>
        :
        <Box display="flex" alignItems="center" justifyContent="flex-start"
        height={300} width={1250}  m={2.5} style={{marginLeft: 330}}
        borderRadius={1} boxShadow={3} bgcolor="white">
        <img style={{marginLeft:20, marginBottom:10, width:170}} src={book.image}></img>
        <div >
        <Button style={{float: "right"}} onClick={()=>deleteBook(book.id)}><DeleteIcon fontSize="large" ></DeleteIcon></Button>
        <Button style={{float: "right"}} onClick={()=>changeEditState(book)}><EditIcon fontSize="large" ></EditIcon></Button>
        <div style={{fontSize:14, marginLeft: 40 }}><h1 >{ book.title}</h1></div>
        <div style={{marginLeft: 40, fontSize:20}}>{Rating(book)}</div>
        <div style={{marginLeft: 40 }}><Box ><h3 >{book.author}</h3></Box></div>
        <Box width={1010}><div style={{fontSize: 18, marginLeft: 40}}>{book.description}</div></Box>
        </div></Box>}
    </div>
  );
}

