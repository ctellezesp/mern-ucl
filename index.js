import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Routes
import HighlightsList from './components/highlights-index';
import EditHighlights from './components/edit';
import CreateHighlights from './components/create';
import Menu from './components/menu';
import Goals from './components/goals';
import Spanish from './components/spanish';
import CreateGoals from './components/create-goals';
import EditGoals from './components/edit-goals';
import Player from './components/player';
import AddTeams from './components/add-teams';


class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'UEFA Champions League'
    }
  }

  render() {
    return (
      <Router>
        <Menu title={this.state.title}></Menu>
        <Route path="/" exact component={HighlightsList} />
        <Route path="/edit/:id" component={EditHighlights} />
        <Route path="/create" component={CreateHighlights} />
        <Route path="/goals" component={Goals} />
        <Route path="/spanish" component={Spanish} />
        <Route path="/create-goals" component={CreateGoals} />
        <Route path="/edit-goals/:id" component={EditGoals} />
        <Route path="/player/:id" component={Player} />
        <Route path="/add-teams" component={AddTeams} />
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
