import React from 'react'
import './Control.css'

class Control extends React.Component {
  render() {
    return (
      <div className='control-container'>
        <div id={this.props.sessionType + "-label"}>
          {this.props.sessionType === 'session' ? 'Session' : 'Break'}
        </div>
        <div>
          <button id={this.props.sessionType + "-decrement"}
            onClick={this.props.onClick}
            value={this.props.sessionType}
            title={'Decrement ' + this.props.sessionType + ' time'}>
            <i className="fas fa-minus"></i>
          </button>
          <div id={this.props.sessionType + "-length"}>
            {this.props.length}
          </div>
          <button id={this.props.sessionType + "-increment"}
            onClick={this.props.onClick}
            value={this.props.sessionType}
            title={'Increment ' + this.props.sessionType + ' time'}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Control