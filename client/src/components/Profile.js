import React, {Component} from 'react';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinPrompt: false,
      joinRoomValue: ""
    };
  }

  componentDidMount () {
    //Why is Profile.js not getting the userInfo prop passed down from App.js?
    // console.log(this.props.userInfo.name);
    // console.log(this.props.userInfo.totalscore);
    // console.log(this.props.userInfo.currentgames.length);
  }

  createNewGame = ()=> {
    fetch('/api/newroom', {
      method: 'POST'
    })
    .then((response) => response.json())
    .then((response) => {
      this.joinGame(response.newRoomId);
    })
  }
  openJoinPrompt = () => {
    this.setState({joinPrompt: true});
  }
  closeJoinPrompt = () => {
    this.setState({joinPrompt: false});
  }
  joinPromptSubmit = (event)=> {
    event.preventDefault();
    // should check here if room value makes sense
    this.joinGame( this.state.joinRoomValue);
  }
  joinPromptChange = (event) => {
    this.setState({'joinRoomValue': event.target.value});
  }
  joinGame = (roomId) => {
    this.props.history.push('/game/'+roomId);
  }

  render () {
    return (
      <div className="App-header">
        <h2>Welcome JAMIE</h2>
        <h4>Games SIX | Score FIVE</h4>
        <button type="button" className="btn btn-outline-warning give-padding" onClick={this.createNewGame}>Start a new game 💦</button>
        <button type="button" className="btn btn-outline-warning give-padding" onClick={this.openJoinPrompt}>Join a game 💦</button>
        <h1>YOUR CURRENT GAMES</h1>
        <p>Pick up where you left off.</p>
        {this.state.joinPrompt ? (
          <React.Fragment>
            <div className="joinprompt">
              <form onSubmit={this.joinPromptSubmit}>
                <label>
                  Enter room code:
                  <input type="text" value={this.state.value} onChange={this.joinPromptChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
              <div className="close" onClick={this.closeJoinPrompt}>X</div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default Profile;
