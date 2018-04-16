import React, { Component } from "react"
import Notification from "components/Notification"
import MOCK_DATA from "core/data"

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = { filter: "unread" }
  }

  render() {
    const { filter } = this.state
    // @TODO Remove when real data loaded
    const { data = MOCK_DATA } = this.props
    const notifications = data.notifications.filter(n => {
      const shouldNotify = filter === "all"
      const isTrue = filter === "unread" ? !n.readAt : n.role === filter
      return shouldNotify || isTrue
    })

    return (
      <div className="notifications-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Notifications</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-3">
              <div className="filters list-group flex-row flex-md-column">
                <a
                  className={`list-group-item list-group-item-action${filter === "unread" ? " active" : ""}`}
                  onClick={() => this.setState({ filter: "unread" })}
                >
                  Unread
                </a>
                <a
                  className={`list-group-item list-group-item-action${filter === "all" ? " active" : ""}`}
                  onClick={() => this.setState({ filter: "all" })}
                >
                  All
                </a>
                <a
                  className={`list-group-item list-group-item-action${filter === "buy" ? " active" : ""}`}
                  onClick={() => this.setState({ filter: "buy" })}
                >
                  Buy
                </a>
                <a
                  className={`list-group-item list-group-item-action${filter === "sell" ? " active" : ""}`}
                  onClick={() => this.setState({ filter: "sell" })}
                >
                  Sell
                </a>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="notifications-list">
                <ul className="list-group">
                  {notifications.map(n => <Notification key={`notification-${n._id}`} notification={n} />)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications
