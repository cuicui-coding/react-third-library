import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function App(props){
  console.log(props);

  return <div></div>
}

ReactDOM.render(
    <App app="app"/>,
  document.querySelector('#root')
)
