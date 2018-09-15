import React from 'react';

export default class Screen extends React.Component {
  get screenId() {
    const { screenId } = this.props.match.params
    return screenId
  }

  get iconIndex() {
    const { iconIndex } = this.props.match.params
    return parseInt(iconIndex, 10)
  }


  renderDebugInfo() {
    return (
      <div>
        <div>Screen Id: {this.screenId}</div>
        <div>Icon Index: {this.iconIndex}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        Hello this is not steven's house
        {this.renderDebugInfo()}
      </div>
    )
  }
}
