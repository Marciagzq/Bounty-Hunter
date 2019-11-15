import React from 'react';
import Viewport from "../../Game/Viewport/index"
import HUD from "../../Game/UI/HUD/hud"


class Gamepage extends React.Component {
  render() {
    return (
      <div>
        <Viewport />
        {/* <HUD /> */}
      </div>
    );
  }
}

export default Gamepage;