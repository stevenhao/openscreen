import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone';

class App extends Component {
  handleDrop = (files) => {
    const file = files[0]
    if (!file) {
      throw new Error('No file uploaded :(')
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target.result
      console.log(result)
      // TODO generate screenId, then save in localStorage, then redirect / render a link to /:screenId/1
    }
    reader.readAsDataURL(file)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Steven's House</h1>
        </header>
        <p className="App-intro">
          To get started, upload a screenshot of your wallpaper.
          {/* TODO add instructions explaining how to screenshot your wallpaper, and emphasize that must be a **screenshot**, not the original photo */}
        </p>

        <Dropzone onDrop={this.handleDrop}/>
      </div>
    )
  }
}

export default App;
