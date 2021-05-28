const express = require("express");
const cors = require("cors");
const request = require("request");

const db = require("./firebase");
// const { doc } = require("./firebase");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors({origin : true}))

app.get('/books/get', async (req, res)=> {
    const snapshot= await db.collection("books").get();
    // console.log(snapshot)
    const books = [];

    snapshot.forEach((doc)=> {
      //x  console.log(doc.id, "=>", doc.data())
        books.push({...doc.data(), id: doc.id})
    })
    res.send(books);
   // res.sendStatus(2020)
})

app.get('/books/search', (req, res)=>{
    // const title = req.query.title;
    // const author = req.query.author;
    const type = req.query.type;
    const q = req.query.q;
    const print = req.query.print;
    let url = "https://www.googleapis.com/books/v1/volumes?q="
    if (type !== "default") {
            url += type;
        }
    url += q
    url += "&printType=" + print;
    // if (title !== undefined) {
    //     url += "intitle:";
    //     url += title
    // }
    // if (author !== undefined) {
    //     url += "+inauthor:";
    //     url += author
    // }
    console.log(url)
    request(url, 
    function(error, response, body){
      if (!error && response.statusCode == 200){
        const parsedBody = JSON.parse(body);
        const results = parsedBody.items
        res.send(results)
      }
    }
    )
})

app.post("/books/add", async (req, res)=>{
    const {title , author, image, description, rating} = req.body;
    console.log(description)
    const resp = await db.collection("books").add({
        title,
        author,
        image,
        description,
        rating
    });
    console.log("added document with id: ", resp.id)
})

app.delete("/books/delete", async (req, res)=>{
    const id = req.query.id;
    console.log(id)
    const resp = await db.collection("books").doc(id).delete();
})

app.put("/books/edit", async (req, res)=>{
    const {title , author, description, id, rating} = req.body;
    console.log(id)
    const change = db.collection('books').doc(id);
    const resp = await change.update({
        rating, 
        title,
        author,
        description});
})

app.listen(PORT, () => { 
    console.log(`Example app listening at http://localhost:${PORT}`)
  })