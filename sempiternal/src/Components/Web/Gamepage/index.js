import React from 'react';
import Viewport from "../../Game/Viewport/index"
import Clip from "./sound";
import { Link } from 'react-router-dom';
import "./game.css"

class Gamepage extends React.Component {
  render() {
    return (
      <div className="body-game">
        <Link to="/Intro">
          Exit Game
        </Link>
        <Clip />
        <Viewport />
        {/* <HUD /> */}

        <div className="col s12 center-align">
                            <footer>
                                <h6 className="game-footer">© 2019 Gaming App. All Rights Reserved</h6>
                                <h6 className="h6-color"> Created by Michael Vega and Marcia Zegarra</h6>
                            </footer>
                        </div>
      </div>

    );
  }
}

export default Gamepage;