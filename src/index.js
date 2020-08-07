import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';

import App from './App';
const routing = (
    <HashRouter>
      <Route path='/' component={ App } exact />
   </HashRouter>
  )
// ReactDom.render(<App />, document.getElementById('root'));
ReactDom.render(routing,document.getElementById('root'));