import React, {Fragment, useContext , useState} from "react";
// import fire from "./fire"
// import Hero from "./Hero"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Button} from '@material-ui/core';
import Login from "../discard/Login"
import Header from './Header'
import MainFeaturedPost from "./MainFeaturedPost"
import bookspic from "./books.jpeg"
export default function Home() {

    // const [user, setUser] = useState('');
    // const handleLogout =()=>{
    //     fire.auth().signOut();
    //   }

    const sections = [
      { title: '', url: '' },
      { title: 'SEARCH PUBLIC LIBRARY', url: 'Search' },
      { title: 'PERSONAL LIBRARY', url: 'PersonalLibrary' },
      { title: '', url: '' },
    ];

    const mainFeaturedPost = {
      title: 'Google Books now available to Browse! ',
      description:
        "The content of over 100,000 books made more discoverable on the web. You can retrieve book information, viewability, eBook availability, and much more.",
      image: bookspic,
      imgText: 'main image description',
      linkText: 'Start your search now…',
    };

    return (
        <div>
    {/* <h1 style={{textAlign:"center"}}>Welcome!</h1> */}
    <Header sections={sections}></Header>
    <MainFeaturedPost  post={mainFeaturedPost}></MainFeaturedPost>
    {/* <Button  style={{marginTop:20, marginRight:400, marginBottom:70}} variant="contained" size="large"><Link to="/PersonalLibrary">Personal Library</Link></Button> 
    <Button style={{marginTop:20, marginBottom:70 }} variant="contained" size="large"><Link to="/Search">Search Public Library</Link></Button> */}
    {/* <Login user={user} setUser={setUser}></Login>
    <Hero user={user} setUser={setUser} handleLogout={handleLogout}></Hero> */}
  </div>
    )
}