import React, { Component } from 'react'
import { AppBar, Drawer } from 'material-ui'
import PropTypes from 'prop-types'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {},
            messages: [],
            isOpen: true
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    componentDidMount() {
        console.log(this.props.username)
    }

    handleToggle() {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        return ( 
            <div style={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                paddingLeft: +this.state.isOpen * 256,
                transition: 'padding-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
            }}>
                <Drawer open={this.state.isOpen}>
                    <AppBar
                        showMenuIconButton={false}
                        title="Online users" />
                    <div>Users list will be here</div>
                </Drawer>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '100%'
                }}>
                    <AppBar onLeftIconButtonClick={this.handleToggle} />
                    <div style={{flex: 1, overflowY: 'scroll'}}>Messages will be here</div>
                    <div style={{display: 'flex', padding: 10}}>Form will be here</div>
                </div>
            </div>
        )
    }
}

Chat.propTypes = {
    username: PropTypes.string.isRequired
}

export default Chat