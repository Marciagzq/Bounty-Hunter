import React from 'react';
import World from "./Components/Game/World/index"
import HUD from "./Components/Game/UI/HUD/hud"
class App extends React.Component {
  render() {
    return (
      <div>
        <World />
        <HUD />
      </div>
    );
  }
}

export default App;
