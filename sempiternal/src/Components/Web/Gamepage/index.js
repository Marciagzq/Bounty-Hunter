import React from 'react';
import Viewport from "../../Game/Viewport/index"
import Alert from "./sound";
import HUD from "../../Game/UI/HUD/hud"
import { Link } from 'react-router-dom';

class Gamepage extends React.Component {
  render() {
    return (
      <div>
        <Link to="/Intro">
          Exit Game
        </Link>
        <Alert />
        <Viewport />
        {/* <HUD /> */}
      </div>

    );
  }
}

export default Gamepage;