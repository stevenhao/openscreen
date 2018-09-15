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

  get currentIconData() {
    if (!this.state.imageDataUrls) return ''
    return this.state.imageDataUrls[this.iconIndex]
  }

  handleClick = (e) => {
    // TODO implement
    const iconIndex = e.target.getAttribute('data-id')
    this.props.history.push(`/${this.screenId}/${iconIndex}`)
    window.location.href = `/${this.screenId}/${iconIndex}`
  }

  renderCanvas() {
    // this will depend on the overall dimensions of the screenshot
    // we will have to figure out if it's iphone 5 vs 5s vs X vs future???
    // TODO use config to set this
    const config = getConfig()
    const dimensions = {
      width: config.iconW,
      height: config.iconH,
    }
    const canvasStyle = {
      position: 'absolute',
      opacity: 0,
    }

    // todo make this invisible
    return (
      <canvas ref={this.canvas} style={canvasStyle} width={dimensions.width} height={dimensions.height}/>
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
    const getIsSelected = iconIndex => {
      const isSelected = iconIndex === selectedIconIndex
      return isSelected
    }

    const getStyle = iconIndex => {
      const offset = getOffset(iconIndex)
      const isSelected = getIsSelected(iconIndex)
      const imageDataUrl = this.state.imageDataUrls[iconIndex]
      return {
        position: 'absolute',
        cursor: 'pointer',
        left: offset.left,
        top: offset.top,
        // width: offset.width,
        // height: offset.height,
        borderRadius: 5,
        // boxSizing: 'border-box',
        border: isSelected ? '3px solid purple' : 'auto',
        transform: isSelected ? 'translateX(-3px) translateY(-3px)' : 'auto',
        backgroundImage: `url(${imageDataUrl})`,
      }
    }

    return (
      <div style={containerStyle}>
        {_.range(this.iconCount).map(iconIndex => (
          <img key={`${iconIndex} ${getIsSelected(iconIndex)}`} style={getStyle(iconIndex)}
            src={this.state.imageDataUrls[iconIndex]}
            data-id={iconIndex}
            onClick={this.handleClick} />
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
        <link rel="apple-touch-icon" href={this.currentIconData}/>
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
