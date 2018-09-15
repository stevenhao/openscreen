import React from 'react';
import Helmet from 'react-helmet';

export default class Screen extends React.Component {
  get screenId() {
    const { screenId } = this.props.match.params
    return screenId
  }

  get iconIndex() {
    const { iconIndex } = this.props.match.params
    return parseInt(iconIndex, 10)
  }

  get iconCount() {
    return 16
  }

  renderDebugInfo() {
    return (
      <div>
        <div>Screen Id: {this.screenId}</div>
        <div>Icon Index: {this.iconIndex}</div>
      </div>
    )
  }

  renderHelmet() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>Icon {`${this.iconIndex}`} of {`${this.iconCount}`}</title>
        <link rel="apple-touch-icon" href="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjVw-f3q7zdAhViOX0KHdW9CPEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.facebook.com%2FPusheen%2F&psig=AOvVaw1PpcnzkWZxiE2I53hkj29G&ust=1537078009279375" />
      </Helmet>
    )
  }

  render() {
    return (
      <div>
        {this.renderHelmet()}
        Hello this is not steven's house
        {this.renderDebugInfo()}
      </div>
    )
  }
}
