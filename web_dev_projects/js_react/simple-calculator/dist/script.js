class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      number: '0',
      hitEnter: true };

    this.updateDisplay = this.updateDisplay.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  updateDisplay(event) {
    const value = event.target.value;
    const digitLimit = 19;
    const numberRegex = /[0-9]|\./;
    const opRegex = /[/*+-]/;
    const AC = 'AC';
    if (this.state.number.length < digitLimit && numberRegex.test(value) &&
    !(this.state.number.includes('.') && value == '.')) {
      const newNumber = opRegex.test(this.state.number) ||
      this.state.number == '0' ||
      this.state.hitEnter ?
      value :
      this.state.number + value;
      const newExpr = this.state.hitEnter ?
      newNumber :
      newNumber == '0' && this.state.expression[this.state.expression.length - 1] == '0' ?
      this.state.expression :
      this.state.expression + value;
      this.setState({
        expression: newExpr,
        number: newNumber,
        hitEnter: false });

    } else if (opRegex.test(value)) {
      const exp = this.state.expression;
      if (this.state.hitEnter) {
        const enterExp = this.state.number == 'UNDEFINED' ? '0' + value : this.state.number + value;
        this.setState({
          expression: enterExp,
          number: value,
          hitEnter: false });

      } else if (exp.length > 0 && (
      !opRegex.test(exp[exp.length - 1]) ||
      value == '-' && exp[exp.length - 1] != '-')) {
        this.setState({
          expression: this.state.expression + value,
          number: value,
          hitEnter: false });

      } else if (exp.length > 1 && opRegex.test(exp[exp.length - 1]) && opRegex.test(exp[exp.length - 2])) {
        if (exp[exp.length - 1] == '-' && value != '-') {
          this.setState({
            expression: exp.slice(0, exp.length - 2) + value,
            number: value,
            hitEnter: false });

        }
      } else {
        this.setState({
          expression: exp.slice(0, exp.length - 1) + value,
          number: value,
          hitEnter: false });

      }
    } else if (value == AC) {
      this.setState({
        expression: '',
        number: '0',
        hitEnter: true });

    }


  }
  calculate() {
    let infinity = false;
    const rounder = 100000000;
    const numRegex = /[0-9.]+/g;
    const opRegex = /[/*\-+]+/g;
    let nums = this.state.expression.match(numRegex);
    let ops = this.state.expression.match(opRegex);
    const parseNum = num => {
      if (typeof num != 'string') {
        return num;
      } else
      if (num.includes('.')) {
        return parseFloat(num);
      } else {
        return parseInt(num);
      }
    };
    if (!this.state.hitEnter) {
      if (this.state.expression.length > 0 && nums.length > 0 && this.state.expression[0] == '-') {
        nums[0] = -1 * parseNum(nums[0]);
        ops.splice(0, 1);
      }
      for (let i = 0; i < ops.length && !infinity; i++) {
        if (ops[i][0] == '*' || ops[i][0] == '/') {
          let num1 = parseNum(nums[i]);
          let num2 = parseNum(nums[i + 1]);
          if (ops[i].length > 1 && ops[i][1] == '-') {
            num2 = -1 * num2;
          }
          let result = null;
          if (ops[i][0] == '*') {
            result = num1 * num2;
          } else if (ops[i][0] == '/') {
            console.log("OK");
            if (num2 == 0) {
              infinity = true;
            } else {
              result = num1 / num2;
            }
          }
          nums[i] = Math.round(result * rounder) / rounder;
          nums.splice(i + 1, 1);
          ops.splice(i, 1);
          i--;
        }
      }
      console.log("After First Loop- Nums: " + nums + ", ops: " + ops + ", infin: " + infinity);
      if (infinity) {
        this.setState({
          expression: '',
          number: 'UNDEFINED',
          hitEnter: true });

      } else {
        let i = 0;
        while (nums.length > 1) {
          let num1 = parseNum(nums[i]);
          let num2 = parseNum(nums[i + 1]);
          if (ops[i].length > 1 && ops[i][1] == '-') {
            num2 = -1 * num2;
          }
          let result = null;
          if (ops[i][0] == '+') {
            result = num1 + num2;
          } else if (ops[i][0] == '-') {
            result = num1 - num2;
          }
          nums[i] = Math.round(result * rounder) / rounder;
          nums.splice(i + 1, 1);
          ops.splice(i, 1);
        }
        console.log("After Second Loop- Nums: " + nums + ", typeof: " + typeof nums[0] + "ops: " + ops);
        this.setState({
          expression: this.state.expression + '=' + nums[0],
          number: nums[0].toString(),
          hitEnter: true });

      }
    }
  }
  render() {
    return (
      React.createElement("div", { id: "calculator-container", class: "calculator-container" },
      React.createElement(Display, { expression: this.state.expression, number: this.state.number }),
      React.createElement(Buttons, { updateDisplay: this.updateDisplay, calculate: this.calculate })));


  }}
;
const Display = props => {
  return (
    React.createElement("div", { id: "total-display", class: "total-display" },
    React.createElement("div", { id: "expression", class: "expression" },
    props.expression),

    React.createElement("div", { id: "display", class: "display" },
    props.number)));



};
const Buttons = props => {
  return (
    React.createElement("div", { id: "button-grid", class: "button-grid" },
    React.createElement(Clear, { id: "clear", value: "AC", updateDisplay: props.updateDisplay }),
    React.createElement(Operation, { id: "divide", value: "/", updateDisplay: props.updateDisplay }),
    React.createElement(Operation, { id: "multiply", value: "*", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "seven", value: "7", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "eight", value: "8", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "nine", value: "9", updateDisplay: props.updateDisplay }),
    React.createElement(Operation, { id: "subtract", value: "-", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "four", value: "4", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "five", value: "5", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "six", value: "6", updateDisplay: props.updateDisplay }),
    React.createElement(Operation, { id: "add", value: "+", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "one", value: "1", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "two", value: "2", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "three", value: "3", updateDisplay: props.updateDisplay }),
    React.createElement(Equal, { id: "equals", value: "=", calculate: props.calculate }),
    React.createElement(Number, { id: "zero", value: "0", updateDisplay: props.updateDisplay }),
    React.createElement(Number, { id: "decimal", value: ".", updateDisplay: props.updateDisplay })));


};
const Number = props => {
  return (
    React.createElement("button", { id: props.id, class: "number button btn-dark", value: props.value, onClick: props.updateDisplay },
    props.value));


};
const Operation = props => {
  return (
    React.createElement("button", { id: props.id, class: "operation button", value: props.value, onClick: props.updateDisplay },
    props.value));


};
const Clear = props => {
  return (
    React.createElement("button", { id: props.id, class: "clear button", value: props.value, onClick: props.updateDisplay },
    props.value));


};
const Equal = props => {
  return (
    React.createElement("button", { id: props.id, class: "equal button", value: props.value, onClick: props.calculate },
    props.value));


};

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));