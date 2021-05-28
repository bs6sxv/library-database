import React,{Fragment} from 'react';
import Library from "./Pages/Library"
import Search from "./Pages/Search"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Button} from '@material-ui/core';
import './App.css';
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
    <div>Welcome!</div>
    <Button  style={{marginTop:20, marginRight:400, marginBottom:70}} variant="contained" size="large"><Link to="/PersonalLibrary">Personal Library</Link></Button> 
    <Button style={{marginTop:20, marginBottom:70 }} variant="contained" size="large"><Link to="/Search">Search Public Library</Link></Button>
  </Fragment>
  );

  const PersonalLibrary = () => (
    <Fragment>
      <div style={{textAlign:"center"}}><h1>Personal Library </h1></div>
      <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100, marginRight:450}} variant="contained" ><Link to="/">Go to home page</Link></Button>
      <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained"   > <Link to="/Search">Search Public Library</Link> </Button>
      <Library></Library>
    </Fragment>
    );

    const LibrarySearch = () => (
      <Fragment>
        <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100, marginRight:450}}  variant="contained" ><Link to="/">Go to home page</Link></Button>
        <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained"   > <Link to="/PersonalLibrary">View Personal Library</Link> </Button>
        <Search ></Search>
      </Fragment>
      );
export default App;
