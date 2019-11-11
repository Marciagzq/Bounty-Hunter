import React from 'react';
import World from "../../Game/World/index"
import HUD from "../../Game/UI/HUD/hud"
class Gamepage extends React.Component {
  render() {
    return (
      <div>
        <World />
        <HUD />
      </div>
    );
  }
}

export default Gamepage;