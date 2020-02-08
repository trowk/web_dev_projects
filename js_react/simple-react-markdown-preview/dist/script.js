$(document).ready(function () {
  $(".bar-text").css("margin-left", "20px");
});

const defaultInput = `# Welcome to React Markdown Previewer
## You can have subheadings
[Or Links!](https://www.google.com)
You can write code like \`<div><\div>\`
Or like <br />\`\`\`
int sum=0;
for(int i=0; i<10; i++){sum+=i};  
return sum; \`\`\`<br />
Lists can be made like
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes
* or asterisks
> Blockquotes are kind of cool

**But don't forget to add images**
![React Logo w/ Text](https://goo.gl/Umyytc)
`;
marked.setOptions({
  breaks: true });

const Editor = props => {
  console.log(props.height);
  return (
    React.createElement("textarea", { id: "editor", class: "editor", style: props.height, onChange: props.handleInput, type: "text", value: props.input }));


};

const Previewer = props => {
  return (
    React.createElement("div", { id: "preview", class: "previewer", dangerouslySetInnerHTML: { __html: marked(props.input) } }));

};

const Bar = props => {
  return (
    React.createElement("div", { id: "bar", class: "bar" },
    React.createElement("div", { id: "bar-left", class: "bar-left" },
    React.createElement("i", { class: "fas fa-code icon" }),
    React.createElement("div", { id: "bar-text", class: "bar-text" }, React.createElement("strong", null, props.name))),

    React.createElement("button", { id: "expand-button", class: "expand", onClick: props.click },
    React.createElement("i", { class: "fas fa-expand icon" }))));



};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorExpanded: false,
      previewExpanded: false,
      input: defaultInput };

    this.handleEditorExpansion = this.handleEditorExpansion.bind(this);
    this.handlePreviewExpansion = this.handlePreviewExpansion.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleEditorExpansion() {
    this.setState({
      editorExpanded: !this.state.editorExpanded });

  }
  handlePreviewExpansion() {
    this.setState({
      previewExpanded: !this.state.previewExpanded });

  }
  handleInput(event) {
    this.setState({
      input: event.target.value });

  }
  render() {
    const editorClasses = !this.state.editorExpanded ?
    "editor-container" :
    "editor-container enlarged-window";
    const previewClasses = !this.state.previewExpanded ?
    "previewer-container" :
    "previewer-container enlarged-window";
    const heightStyle = !this.state.editorExpanded ?
    { height: '170px' } :
    { height: '870px' };
    return (
      React.createElement("div", null,
      this.state.previewExpanded ?
      React.createElement("div", null) :
      React.createElement("div", { id: "editor-container", class: editorClasses },
      React.createElement(Bar, { name: "Editor", click: this.handleEditorExpansion }),
      React.createElement(Editor, { height: heightStyle, handleInput: this.handleInput, input: this.state.input })),



      this.state.editorExpanded ?
      React.createElement("div", null) :
      React.createElement("div", { id: "previewer-container", class: previewClasses },
      React.createElement(Bar, { name: "Previewer", click: this.handlePreviewExpansion }),
      React.createElement(Previewer, { input: this.state.input }))));




  }}
;

ReactDOM.render(React.createElement(Container, null), document.getElementById('body'));