import React, { Component } from 'react';
import firebase from "../firebase/config";

export default class CreateGoals extends Component {
  constructor(props){
    super(props);
    this.state = {
      home: '',
      away: '',
      title: '',
      date: '',
      season: '',
      lang: '',
      frame: '',
      data: []
    }
    this.save = this.save.bind(this);
    this.myHome = this.myHome.bind(this);
    this.myAway = this.myAway.bind(this);
    this.myTitle = this.myTitle.bind(this);
    this.myDate = this.myDate.bind(this);
    this.mySeason = this.mySeason.bind(this);
    this.myLang = this.myLang.bind(this);
    this.myFrame = this.myFrame.bind(this);
  }

  componentDidMount(){
    firebase.db.collection("ucl-teams").orderBy('team', 'asc').get()
    .then(res => {
      console.log(res.docs);
      this.setState({
        data: res.docs
      });
      console.log(this.state.data[0].data());
    })
    .catch(err => {
      console.log(err);
    });
  }

  myHome(event){
    this.setState({
      home: event.target.value
    });
  }

  myAway(event){
    this.setState({
      away: event.target.value
    });
  }

  myTitle(event){
    this.setState({
      title: event.target.value
    });
  }

  myDate(event){
    this.setState({
      date: event.target.value.toString()
    });
  }

  myFrame(event){
    this.setState({
      frame: event.target.value
    });
  }

  mySeason(event){
    this.setState({
      season: event.target.value
    });
  }

  myLang(event){
    this.setState({
      lang: event.target.value
    });
  }

  save(){
    let toSave = {
      home: this.state.home,
      away: this.state.away,
      title: this.state.title,
      date: this.state.date,
      season: this.state.season,
      lang: this.state.lang,
      frame: this.state.frame
    }
    firebase.db.collection("ucl-goals").add(toSave)
    .then(res => {
      console.log(res);
      window.alert("Data added");
    })
    .catch(err => {
      console.log(err);
      window.alert("Error");
    })
  }

  render() {
      return (
          <div className="row">
              <div className="col s12 l10 offset-l1">
                <div className="row">
                  <div className="input-field col s12 l6">
                    <select class="browser-default" onChange={this.myHome}>
                        <option value="" disabled selected>Choose your home team</option>
                        {this.state.data.map((item, index) => {
                          return(
                            <option key={index} value={item.data().img}>{item.data().team}</option>
                          )
                        })}
                      </select>
                  </div>
                  <div className="input-field col s12 l6">
                    <select class="browser-default" onChange={this.myAway}>
                        <option value="" disabled selected>Choose your away team</option>
                        {this.state.data.map((item, index) => {
                          return(
                            <option key={index} value={item.data().img}>{item.data().team}</option>
                          )
                        })}
                      </select>
                  </div>
                  <div className="input-field col s12 l12">
                    <input id="title" type="text" className="validate" onChange={this.myTitle} />
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="input-field col s12 l4">
                    <input id="date" type="date" className="validate" onChange={this.myDate} />
                    <label htmlFor="date">Date</label>
                  </div>
                  <div className="input-field col s12 l4">
                    <input id="season" type="text" className="validate" onChange={this.mySeason} />
                    <label htmlFor="season">Season</label>
                  </div>
                  <div className="input-field col s12 l4">
                    <select class="browser-default" onChange={this.myLang}>
                        <option value="" disabled selected>Choose your language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                      </select>
                  </div>
                  <div className="input-field col s12 l12">
                    <textarea id="frame" class="materialize-textarea" onChange={this.myFrame}></textarea>
                    <label htmlFor="frame">Frame</label>
                  </div>
                </div>
                <a class="waves-effect waves-light btn right" onClick={this.save}><i class="material-icons left">save</i>Save</a>
              </div>
          </div>
      )
  }
}