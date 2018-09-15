import React from 'react';
import Helmet from 'react-helmet';
import _ from 'lodash'
import Storage from './lib/storage';
import { getOffset, getConfig } from './lib/image'

export default class Screen extends React.Component {
  constructor() {
    super()
    this.state = {
      imageDataUrls: null,
      screenData: null,
    }
    this.storage = new Storage()
    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.updateScreenData()
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params !== this.props.match.params) {
      this.updateScreenData()
    }
    if (prevState.screenData !== this.state.screenData) {
      await this.updateCanvas()
    }
  }

  updateScreenData() {
    console.log('updating screen data')
    const screenData = this.storage.get(this.screenId)
    this.setState({
      screenData,
    })
  }

  updateCanvas() {
    if (!this.state.screenData) return
    const canvas = this.canvas.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const imageEl = new Image()

    imageEl.onload = () => {
      const imageDataUrls = _.range(this.iconCount).map(iconIndex => {
        const offset = getOffset(iconIndex)
        console.log(iconIndex, offset)
        ctx.drawImage(imageEl,
            offset.left, offset.top, offset.width, offset.height,
          0, 0, offset.width, offset.height,
        )
        const iconDataUrl = this.canvas.current.toDataURL()
        console.log(iconDataUrl)
        return iconDataUrl
      })
      this.setState({
        imageDataUrls,
      })
      console.log('set state')
    }
    imageEl.src = this.imageData
  }

  get screenId() {
    const { screenId } = this.props.match.params
    return screenId
  }

  get iconIndex() {
    const { iconIndex } = this.props.match.params
    return parseInt(iconIndex, 10)
  }

  get iconCount() {
    const config = getConfig()
    return config.numIcons
  }

  get imageData() {
    return this.state.screenData.data
  }

  handleClick = (e) => {
    // TODO implement
    const id = e.target.getAttribute('data-id')
    console.log('clicked', id)
  }

  renderCanvas() {
    // this will depend on the overall dimensions of the screenshot
    // we will have to figure out if it's iphone 5 vs 5s vs X vs future???
    // TODO use config to set this
    const config = getConfig()
    const canvasStyle = {
      width: config.iconW,
      height: config.iconH,
      position: 'absolute',
      opacity: 0,
    }

    // todo make this invisible
    return (
      <canvas ref={this.canvas} style={canvasStyle}/>
    )
  }

  renderIconGrid() {
    if (!this.state.imageDataUrls) return null
    console.log('render icon grid')
    const config = getConfig()
    const selectedIconIndex = this.iconIndex
    const containerStyle = {
      position: 'relative',
      width: config.width,
      height: config.height,
    }
    const getStyle = iconIndex => {
      const offset = getOffset(iconIndex)
      const isSelected = iconIndex === selectedIconIndex
      const imageDataUrl = this.state.imageDataUrls[iconIndex]
      return {
        position: 'absolute',
        left: offset.left,
        top: offset.top,
        width: offset.width,
        height: offset.height,
        borderRadius: 5,
        outine: isSelected ? '1px purple solid black' : 'auto',
        backgroundImage: `url(${imageDataUrl})`,
      }
    }

    return (
      <div style={containerStyle}>
        {_.range(this.iconCount).map(iconIndex => (
          <div style={getStyle(iconIndex)}
            data-id={iconIndex}
            onClick={this.handleClick}
          >
          </div>
        )) }
      </div>
    )
  }

  renderDebugInfo() {
    const debugStyle = {
      padding: 20,
    }
    const truncatedDivStyle = {
      overflow: 'auto',
      maxWidth: 600,
    }
    return (
      <div>
        <div style={debugStyle}>
          <h4>The Image:</h4>
          {this.state.screenData && <img src={this.imageData}></img>}
          <h4>The Icon:</h4>
          {this.state.screenData && <img src={this.state.iconData}></img>}
        </div>
        <div>Screen Id: {this.screenId}</div>
        <div>Icon Index: {this.iconIndex}</div>
        <div style={truncatedDivStyle}>Icon Data: {this.state.iconData}</div>
      </div>
    )
  }

  renderHelmet() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>Icon {`${this.iconIndex}`} of {`${this.iconCount}`}</title>
        <link rel="apple-touch-icon" href={this.state.iconData}/>
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.renderHelmet()}
        {this.renderCanvas()}
        Hello this is not steven's house
        {/*this.renderDebugInfo()*/}
        {this.renderIconGrid()}
      </div>
    )
  }
}

const PUSHEEN_DATA = 'data:image/png;base64,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'
