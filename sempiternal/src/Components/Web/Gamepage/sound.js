import React, { Component } from 'react';
import soundfile from '../../../data/sounds/lvl1.mp3'
import Sound from 'react-sound'

export default class Clip extends Component {
render() {
 return (
   <Sound
   url={soundfile}
   playStatus={Sound.status.PLAYING}
   onLoading={this.handleSongLoading}
   onPlaying={this.handleSongPlaying}
   onFinishedPlaying={this.handleSongFinishedPlaying}
   />
  );
 }
}