import React from "react";
import io from 'socket.io-client';

import Input from "./Input";
import Joining from "./Joining";
import Prompting from "./Prompting";
import Vote from "./Vote";
import Wait from "./Wait";
import LeaderBoard from "./LeaderBoard";


class Game extends React.Component {
  constructor(props) {
    super(props);
    // this.socket.on("new_game", (msg) => {
    //   this.updateBoard(msg);
    //   document.addEventListener("keydown", this.keyDownBound);
    // });

    // this.socket.on("update_game", (msg) => {
    //   this.updateBoard(msg);
    // });
    //
    this.roomid = null;
    this.state = {
      game: null
    };
  }

  componentDidMount() {
    this.roomid = this.props.match.params.roomid;
    this.loadGame();
    //the line below connects to "socket stuff" in app.js
    this.socket = io("http://localhost:3000", {query:{room: this.roomid}});

    //when backend emits a room state change, the frontend, ON CATCHING THAT,
    //changes the state
    this.socket.on('roomStateChange', (newGameStateData) => {
      console.log('received room state change', newGameStateData);
      this.setState({game: newGameStateData});
    });

  }

  //fetches something like /api/game/fjw8 from api.js
  loadGame = () => {
    fetch('/api/game/'+this.roomid)
    .then(res => res.json())
    .then( res => {
      this.setState({game: res});
    });
  }

//renders state of the game if this.state.game is not null and
//switches which component to render based on the "gamestate" key in Room database
  render() {
    if (this.state.game) {
      switch (this.state.game.gamestate) {
        case 0:
          return (
            <Joining
              game={this.state.game}
              isHost={this.props.userInfo._id == this.state.game.host._id}
            />
          );
        case 1:
          return (
            <Prompting game={this.state.game}/>
          );
        case 2:
          return (
            <Wait />
          );
        case 3:
          return (
            <Vote />
          );
        case 4:
          return (
            <Wait/>
          );
        case 5:
          return (
            <LeaderBoard />
          );
      }
    }
    return (
      <div>Loading...</div>
    );
  }
}

export default Game;
