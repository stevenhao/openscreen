import uuid from 'uuid';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import logo from './logo.svg';
import './App.css';
import Storage from './lib/storage';

class App extends Component {
  constructor() {
    super()
    this.storage = new Storage()
  }

  handleDrop = (files) => {
    const file = files[0]
    if (!file) {
      throw new Error('No file uploaded :(')
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const screenId = uuid.v4()
      const screenData = {
        // NOTE: can add other fields here, e.g. numIcons
        data: e.target.result,
      }
      this.storage.set(screenId, screenData)
      this.props.history.push(`/${screenId}/1`)
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
