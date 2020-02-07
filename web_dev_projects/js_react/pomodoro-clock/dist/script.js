const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;
const DEFAULT_SECONDS = 0;
const DEFAULT_SESSION_PAUSED = true;
const DEFAULT_SESSION_TIMER = true;
const BREAK = 'break';
const SESSION = 'session';
const LABEL = '-label';
const DECREMENT = '-decrement';
const INCREMENT = '-increment';
const LENGTH = '-length';
const INFO = '-info';
const ICONUP = '-icon-up';
const ICONDOWN = '-icon-down';
class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: DEFAULT_BREAK_LENGTH,
      sessionLength: DEFAULT_SESSION_LENGTH,
      seessionTimeRemaining: DEFAULT_SESSION_LENGTH,
      isSessionPaused: DEFAULT_SESSION_PAUSED,
      isSessionTimer: DEFAULT_SESSION_TIMER,
      minutes: DEFAULT_SESSION_LENGTH,
      seconds: DEFAULT_SECONDS };

    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
    this.countDown = this.countDown.bind(this);
    this.audio = document.getElementById('beep');
    this.interval = null;
  }
  handleSessionIncrement() {
    if (this.state.isSessionPaused) {
      const newSessionLength = this.state.sessionLength + 1 > 60 ?
      1 :
      this.state.sessionLength + 1;
      const minutes = this.state.isSessionTimer ?
      newSessionLength :
      this.state.minutes;
      this.setState({
        sessionLength: newSessionLength,
        minutes: minutes,
        seconds: 0 });

    }
  }
  handleBreakIncrement() {
    if (this.state.isSessionPaused) {
      const newBreakLength = this.state.breakLength + 1 > 60 ?
      1 :
      this.state.breakLength + 1;
      const minutes = !this.state.isSessionTimer ?
      newBreakLength :
      this.state.minutes;
      this.setState({
        breakLength: newBreakLength,
        minutes: minutes,
        seconds: 0 });

    }
  }
  handleSessionDecrement() {
    if (this.state.isSessionPaused) {
      const newSessionLength = this.state.sessionLength - 1 < 1 ?
      60 :
      this.state.sessionLength - 1;
      const minutes = this.state.isSessionTimer ?
      newSessionLength :
      this.state.minutes;
      this.setState({
        sessionLength: newSessionLength,
        minutes: minutes,
        seconds: 0 });

      this.setState({
        sessionLength: newSessionLength,
        minutes });

    }
  }
  handleBreakDecrement() {
    if (this.state.isSessionPaused) {
      const newBreakLength = this.state.breakLength - 1 < 1 ?
      60 :
      this.state.breakLength - 1;
      const minutes = !this.state.isSessionTimer ?
      newBreakLength :
      this.state.minutes;
      this.setState({
        breakLength: newBreakLength,
        minutes: minutes,
        seconds: 0 });

    }
  }
  handleStartStop() {
    const willPlay = this.state.isSessionPaused;
    this.setState({
      isSessionPaused: !willPlay });

    if (willPlay) {
      this.interval = setInterval(this.countDown, 1000);
    } else {
      clearInterval(this.interval);
    }
  }
  countDown() {
    const totalSeconds = this.state.minutes * 60 + this.state.seconds - 1;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds - seconds) / 60);
    if (minutes <= 0 && seconds < 0) {
      clearInterval(this.interval);
      this.audio = document.getElementById('beep');
      this.audio.play();
      setTimeout(this.handleTimeout, 3100);
    } else {
      this.setState({
        minutes: minutes,
        seconds: seconds });

    }
  }
  handleReset() {
    clearInterval(this.interval);
    console.log("here");
    if (this.audio != null) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    console.log("this far2");
    this.setState({
      breakLength: DEFAULT_BREAK_LENGTH,
      sessionLength: DEFAULT_SESSION_LENGTH,
      seessionTimeRemaining: DEFAULT_SESSION_LENGTH,
      isSessionPaused: DEFAULT_SESSION_PAUSED,
      isSessionTimer: DEFAULT_SESSION_TIMER,
      minutes: DEFAULT_SESSION_LENGTH,
      seconds: DEFAULT_SECONDS });

  }
  handleTimeout() {
    if (this.state.isSessionPaused != DEFAULT_SESSION_PAUSED) {
      const minutes = this.state.isSessionTimer ?
      this.state.breakLength :
      this.state.sessionLength;
      const seconds = 0;
      this.setState({
        isSessionTimer: !this.state.isSessionTimer,
        minutes: minutes,
        seconds: seconds });

      this.interval = setInterval(this.countDown, 1000);
    }
  }
  render() {
    return (
      React.createElement("div", { id: "pomodoro-container", class: "pomodoro-container" },
      React.createElement("header", { id: "title-container", class: "title-container" },
      React.createElement("h1", { id: "title", class: "title" }, "Pomodoro Clock")),



      React.createElement("main", { id: "clock" },
      React.createElement("div", { id: "info-container", class: "info-container" },
      React.createElement(Settings, { value: BREAK, display: "Break Length", time: this.state.breakLength, handleIncrement: this.handleBreakIncrement, handleDecrement: this.handleBreakDecrement }),
      React.createElement(Settings, { value: SESSION, display: "Session Length", time: this.state.sessionLength, handleIncrement: this.handleSessionIncrement, handleDecrement: this.handleSessionDecrement })),

      React.createElement("div", { id: "timer-outline", class: "timer-outline" },
      React.createElement(Clock, { minutes: this.state.minutes, seconds: this.state.seconds, isSessionTimer: this.state.isSessionTimer })),

      React.createElement(Buttons, { handleStartStop: this.handleStartStop, isSessionPaused: this.state.isSessionPaused, handleReset: this.handleReset })),

      React.createElement("audio", { id: "beep", src: "https://www.pacdv.com/sounds/interface_sound_effects/beep-11.wav", type: "audio/mp3" })));


  }}
;

const Settings = props => {
  return (
    React.createElement("div", { id: props.value, class: "setting-container" },
    React.createElement("h2", { id: props.value + LABEL, class: "settings-label" },
    props.display),

    React.createElement("div", { id: props.value + INFO, class: "info" },
    React.createElement("button", { id: props.value + INCREMENT, class: "button", value: props.value, onClick: props.handleIncrement },
    React.createElement("i", { id: props.value + ICONUP, class: "fas fa-arrow-up" })),

    React.createElement("h3", { id: props.value + LENGTH, class: "length" },
    props.time),

    React.createElement("button", { id: props.value + DECREMENT, class: "button", value: props.value, onClick: props.handleDecrement },
    React.createElement("i", { id: props.value + ICONDOWN, class: "fas fa-arrow-down" })))));




};

const Clock = props => {
  const seconds = props.seconds < 10 ?
  '0' + props.seconds :
  props.seconds;
  const minutes = props.minutes < 10 ?
  '0' + props.minutes :
  props.minutes;
  const display = props.isSessionTimer ?
  'Session' :
  'Break';
  return (
    React.createElement("div", { id: "timer-container", class: "timer-container" },
    React.createElement("h2", { id: "timer-label", class: "timer-label" },
    display),

    React.createElement("h3", { id: "time-left", class: "time-left" },
    minutes, ":", seconds)));



};

const Buttons = props => {
  return (
    React.createElement("div", { id: "button-grid", class: "button-grid" },
    React.createElement("button", { id: "start_stop", class: "start_stop button", value: "start_stop", onClick: props.handleStartStop },
    !props.isSessionPaused ?
    React.createElement("i", { id: "start_stop-icon", class: "fas fa-pause" }) :
    React.createElement("i", { id: "start_stop-icon", class: "fas fa-play" })),

    React.createElement("button", { id: "reset", class: "reset button", value: "reset", onClick: props.handleReset },
    React.createElement("i", { id: "reset-icon", class: "fas fa-sync" }))));



};

ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementById('root'));