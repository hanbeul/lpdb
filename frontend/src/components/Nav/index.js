import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

export default class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="nav">
      <Menu>
        <Link to= '/'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Icon name='home' />
            Home
          </Menu.Item>
        </Link>
        <Link to= '/page2'>
          <Menu.Item
            name='page 2'
            active={activeItem === 'page 2'}
            onClick={this.handleItemClick}
          >
            Page 2
          </Menu.Item>
        </Link>
        <Link to= '/page3'>
          <Menu.Item
            name='page 3'
            active={activeItem === 'page 3'}
            onClick={this.handleItemClick}
          >
            Page 3
          </Menu.Item>
        </Link>
        <Link to= '/settings'>
          <Menu.Item
            name='upcomingEvents'
            active={activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
          >
            <Icon name='settings' />
            Settings
          </Menu.Item>
        </Link>
      </Menu>
      </div>
    )
  }
}
