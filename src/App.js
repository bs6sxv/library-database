import React,{Fragment, useState} from 'react';
import Library from "./Pages/PersonalLibrary/Library"
import Search from "./Pages/LibrarySearch/Search"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Button} from '@material-ui/core';
// import Hero from "./UserAuth/Hero"
import './App.css';
import HomePage from "./HomeScreen/Home"
// import fire from "../server/firebase"
// import Login from "./UserAuth/Login"
function App() {
  return (
    <div >
      <Router>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Search"  component={LibrarySearch}/>
        <Route path="/PersonalLibrary"  component={PersonalLibrary} />
       </Switch>
      </Router>
    </div>
  );
}
const Home = () => (
  <Fragment>
    {/* <h1 style={{textAlign:"center"}}>Welcome!</h1>
    <Button  style={{marginTop:20, marginRight:400, marginBottom:70}} variant="contained" size="large"><Link to="/PersonalLibrary">Personal Library</Link></Button> 
    <Button style={{marginTop:20, marginBottom:70 }} variant="contained" size="large"><Link to="/Search">Search Public Library</Link></Button> */}
    {/* <Login></Login>
    <Hero handleLogout={handleLogout}></Hero> */}
    <HomePage></HomePage>
  </Fragment>
  );

  const PersonalLibrary = () => (
    <Fragment>
      {/* <div style={{textAlign:"center"}}><h1>Personal Library </h1></div>
      <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100, marginRight:450}} variant="contained" ><Link to="/">Go to home page</Link></Button>
      <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained"   > <Link to="/Search">Search Public Library</Link> </Button> */}
      <Library></Library>
    </Fragment>
    );

    const LibrarySearch = () => (
      <Fragment>
        {/* <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100, marginRight:450}}  variant="contained" ><Link to="/">Go to home page</Link></Button>
        <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained"   > <Link to="/PersonalLibrary">View Personal Library</Link> </Button> */}
        <Search ></Search>
      </Fragment>
      );
export default App;
