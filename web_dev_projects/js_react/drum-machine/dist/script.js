$(document).ready(function () {
  $("button").addClass("btn btn-default");
});

const ON = 'ON';
const OFF = 'OFF';
const drumPadItems = [{ key: 'Q',
  description: 'Electronic 1' },
{ key: 'W',
  description: 'Electronic 2' },
{ key: 'E',
  description: 'Electronic 3' },
{ key: 'A',
  url: '',
  description: 'Electronic 4' },
{ key: 'S',
  description: 'Clap' },
{ key: 'D',
  description: 'Open Hi hat' },
{ key: 'Z',
  description: 'Drum' },
{ key: 'X',
  description: 'Kickdrum' },
{ key: 'C',
  description: 'Piano Chord' }];
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      power: ON,
      display: '' };

    this.powerClick = this.powerClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.drumPadClick = this.drumPadClick.bind(this);
    this.handleDrumPadItem = this.handleDrumPadItem.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (this.state.power != OFF) {
      let index = -1;
      switch (event.keyCode) {
        case 81:
          index = 0;
          break;
        case 87:
          index = 1;
          break;
        case 69:
          index = 2;
          break;
        case 65:
          index = 3;
          break;
        case 83:
          index = 4;
          break;
        case 68:
          index = 5;
          break;
        case 90:
          index = 6;
          break;
        case 88:
          index = 7;
          break;
        case 67:
          index = 8;
          break;}

      this.handleDrumPadItem(index);
    }
  }
  drumPadClick(key) {
    if (this.props.power != OFF) {
      let index = -1;
      switch (key) {
        case 'Q':
          index = 0;
          break;
        case 'W':
          index = 1;
          break;
        case 'E':
          index = 2;
          break;
        case 'A':
          index = 3;
          break;
        case 'S':
          index = 4;
          break;
        case 'D':
          index = 5;
          break;
        case 'Z':
          index = 6;
          break;
        case 'X':
          index = 7;
          break;
        case 'C':
          index = 8;
          break;}

      this.handleDrumPadItem(index);
    }
  }
  handleDrumPadItem(index) {
    if (this.state.power == ON) {
      if (index > -1) {
        this.setState({
          display: drumPadItems[index].description });

        const audio = document.getElementById(drumPadItems[index].key);
        if (audio.paused) {
          audio.play();
        } else {
          audio.currentTime = 0;
        }
      }
    }
  }
  powerClick() {
    const newPower = this.state.power == ON ?
    OFF :
    ON;
    this.setState({
      power: newPower,
      display: '' });

  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine", className: "drum-machine" },
      React.createElement("div", { id: "button-grid", className: "button-grid" },
      React.createElement(DrumPad, { letter: "Q", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" }),
      React.createElement(DrumPad, { letter: "W", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" }),
      React.createElement(DrumPad, { letter: "E", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" }),
      React.createElement(DrumPad, { letter: "A", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" }),
      React.createElement(DrumPad, { letter: "S", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" }),
      React.createElement(DrumPad, { letter: "D", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" }),
      React.createElement(DrumPad, { letter: "Z", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" }),
      React.createElement(DrumPad, { letter: "X", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" }),
      React.createElement(DrumPad, { letter: "C", drumPadClick: this.drumPadClick, url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" })),

      React.createElement(Options, { powerClick: this.powerClick, power: this.state.power, display: this.state.display, volume: this.state.volume })));


  }}
;

const DrumPad = props => {
  return (
    React.createElement("button", { className: "drum-pad", onClick: () => props.drumPadClick(props.letter) },
    React.createElement("div", { class: "btn-label" },
    React.createElement("strong", null, props.letter)),

    React.createElement("audio", { id: props.letter },
    React.createElement("source", { src: props.url, type: "audio/mp3" }))));



};

const Options = props => {
  return (
    React.createElement("div", { id: "functions", class: "functions" },
    React.createElement("div", { id: "power", class: "power" },
    React.createElement("div", { class: "text-center power-label" }, React.createElement("strong", null, "Power")),
    React.createElement("button", { id: "power-button", class: "power-button", onClick: props.powerClick }, props.power)),

    React.createElement("div", { id: "display", class: "display text-center" },
    React.createElement("div", { class: "audio-label" }, React.createElement("strong", null, props.display)))));



};

ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById('root'));