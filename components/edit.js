import React, { Component } from 'react';
import firebase from "../firebase/config";

export default class EditHighlights extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      title: '',
      date: '',
      season: '',
      frame: '',
      matches: '',
      broadcaster: ''
    }
    this.edit = this.edit.bind(this);
    this.myTitle = this.myTitle.bind(this);
    this.myDate = this.myDate.bind(this);
    this.mySeason = this.mySeason.bind(this);
    this.myFrame = this.myFrame.bind(this);
    this.myMatches = this.myMatches.bind(this);
    this.myBroadcaster = this.myBroadcaster.bind(this);
  }

  componentDidMount(){
    firebase.db.collection("ucl-highlights").doc(this.state.id).get()
    .then(res => {
      this.setState({
        title: res.data().title,
        date: res.data().date,
        season: res.data().season,
        frame: res.data().frame,
        matches: res.data().matches,
        broadcaster: res.data().broadcaster
      });
    })
    .catch(err => {
      console.log(err);
    })
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

  mySeason(event){
    this.setState({
      season: event.target.value
    });
  }

  myFrame(event){
    this.setState({
      frame: event.target.value
    });
    console.log(this.state);
  }

  myMatches(event){
    this.setState({
      matches: event.target.value
    });
  }

  myBroadcaster(event){
    console.log("moving");
    this.setState({
      broadcaster: event.target.value
    });
    console.log(this.state.broadcaster);
  }

  edit(){
    console.log(this.state)
    const editData = {
      title: this.state.title,
      date: this.state.date,
      season: this.state.season,
      frame: this.state.frame,
      matches: this.state.matches,
      broadcaster: this.state.broadcaster
    }
    firebase.db.collection("ucl-highlights").doc(this.state.id).set(editData, {merge: true})
    .then(res => {
      console.log(res);
      window.alert("Data edited succesfully");
    })
    .catch(err => {
      console.log(err);
      window.alert("Error");
    });
  }


  render() {
      return (
          <div className="row">
                <div className="col s12 l10 offset-l1">
                  <div className="row">
                    <div className="input-field col s12 l12">
                      <input id="title" type="text" className="validate" value={this.state.title} onChange={this.myTitle} />
                      <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="date" type="date" className="validate" value={this.state.date} onChange={this.myDate}/>
                      <label htmlFor="date">Date</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="season" type="text" className="validate" value={this.state.season} onChange={this.mySeason}/>
                      <label htmlFor="season">Season</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <select class="browser-default" value={this.state.broadcaster} onChange={this.myBroadcaster}>
                        <option disabled>Broadcaster</option>
                        <option value="https://firebasestorage.googleapis.com/v0/b/premier-league-b9ec4.appspot.com/o/bt.png?alt=media&token=7e7aa0fd-ef36-4795-8ba2-d5717fa70ab3">BT Sport</option>
                        <option value="https://firebasestorage.googleapis.com/v0/b/premier-league-b9ec4.appspot.com/o/uefa.png?alt=media&token=52dfd5bb-d7d4-4f12-bc20-ebd66e6a7f27">UEFA</option>
                        <option value="https://firebasestorage.googleapis.com/v0/b/premier-league-b9ec4.appspot.com/o/itv.png?alt=media&token=69c73f20-6235-4da6-a982-878657193100">ITV</option>
                        <option value="https://firebasestorage.googleapis.com/v0/b/premier-league-b9ec4.appspot.com/o/skysports.png?alt=media&token=5e1a6017-62d5-4a6e-a655-cffcc7751dee">Sky Sports</option>
                        <option value="https://firebasestorage.googleapis.com/v0/b/premier-league-b9ec4.appspot.com/o/movistar.png?alt=media&token=83ebdff3-66a5-469d-ab92-b87e6941c91a">Movistar</option>
                      </select>
                    </div>
                    <div className="input-field col s12 l12">
                      <textarea id="frame" className="materialize-textarea" value={this.state.frame} onChange={this.myFrame}></textarea>
                      <label htmlFor="frame">Frame</label>
                    </div>
                    <div className="input-field col s12 l12">
                      <textarea id="matches" className="materialize-textarea" value={this.state.matches} onChange={this.myMatches}></textarea>
                      <label htmlFor="matches">Matches</label>
                    </div>
                  </div>
                  <a className="waves-effect waves-light btn right" onClick={this.edit}><i className="material-icons left">save</i>Edit</a>
                </div>
            </div>
      )
  }
}