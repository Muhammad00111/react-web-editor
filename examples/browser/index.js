/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-unresolved, import/extensions
import MonacoEditor from 'react-monaco-editor';
import Header from './component/header';
import Multi from './component/mul';
/* eslint-enable import/no-extraneous-dependencies */

// Using with webpack
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.codeValue,
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  method(...data) {
    // if(id==='r')
    // {
      this.setState({code:`Roles: ${data[0]}\n Operations: ${data[1]}\n Tables: ${data[2]}\n Colums Respectivly:${data[3]}\n`});      
    // } 
    // else{
      // this.setState({code:`${this.state.code},${v.toString()}`});      
    // }
  }
  onChange = (newValue, e) => {
    console.log('onChange', newValue, e); // eslint-disable-line no-console
  }

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  }

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue('// code changed! \n');
    }
  }

  changeBySetState = () => {
    this.setState({ code: '// code changed by setState! \n' });
  }
  changeBySetStateSelf = (data) => {
    this.setState({ code: `// ${data}\n` });
  }

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };
    return (
      <div>
        <div>
          <button onClick={this.changeEditorValue}>Change value</button>
          <button onClick={this.changeBySetState}>Change by setState</button>
        </div>
        <hr />
        <MonacoEditor
          height="500"
          language="javascript"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

// Using with require.config
class AnotherEditor extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor(props) {
    super(props);
    const jsonCode = [
      '{',
      '    "$schema": "http://myserver/foo-schema.json"',
      '}'
    ].join('\n');
    this.state = {
      code: jsonCode,
    }
  }

  editorWillMount = (monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      schemas: [{
        uri: 'http://myserver/foo-schema.json',
        schema: {
          type: 'object',
          properties: {
            p1: {
              enum: [ 'v1', 'v2']
            },
            p2: {
              $ref: 'http://myserver/bar-schema.json'
            }
          }
        }
      }, {
        uri: 'http://myserver/bar-schema.json',
        schema: {
          type: 'object',
          properties: {
            q1: {
              enum: [ 'x1', 'x2']
            }
          }
        }
      }]
    });
  }
  render() {
    const code = this.state.code;
    const requireConfig = {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
      paths: {
        vs: 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min/vs'
      }
    };
    return (

      <div>
        <MonacoEditor
          width="800"
          height="600"
          language="json"
          defaultValue={code}
          requireConfig={requireConfig}
          editorWillMount={this.editorWillMount}
        />
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
// const App = () => (
//   <div>
//     <Header loadToEditor={this.loadToEditor} />
//     <h2>Monaco Editor Sample (controlled mode)</h2>
//     <CodeEditor />
//     <hr />
//     <h2>Another editor (uncontrolled mode)</h2>
//     <AnotherEditor />
//   </div>
// )
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      code:'// type your code \n',
    }
  }
  onClick = (...data) => {
    this.child.method(...data) // do stuff
  }
  loadToEditor = (...data) => {
    this.onClick(...data);
  }
  render(){
    return(
      <div>
          <Header loadtoEditor={this.loadToEditor} />
          <h2>Monaco Editor Sample (controlled mode)</h2>
          <CodeEditor onRef = {ref => (this.child = ref)} codeValue={this.state.code} />
          <hr />
          <h2>Another editor (uncontrolled mode)</h2>
          <AnotherEditor />
        </div>);
  };
}
render(
  <App />,
  document.getElementById('root')
);
// height: 3rem;
// vertical-align: middle;
// overflow: auto;
// font-size: 12px;
