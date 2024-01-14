// App.js

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function App({ onChange, value }) {
  // Convert non-string values to string
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  return <CodeMirror value={stringValue} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />;
}

export default App;
