import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'
import axios from 'axios'

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {
    axios.get('/api/getUser')
      .then((res) => {
        console.log(res);
        var user = {
          username: res.data.username,
          userId: res.data.userId,
          bookmarked: res.data.bookmarked
        }
        this.props.actions.changeUser(user);
      })
  }

  render() {

    const bookmarked = this.props.user.bookmarked.map((bookmark, i) => {
      return (
        <div>
          <p> {bookmark.title} </p>
          <p> {bookmark.author} </p>
        </div>
        )
    })

    return (
      <div>
        <h3> Profile </h3>
        <p> {this.props.user.username} </p>
        {bookmarked}
      </div>
    )
  }
}

const getState = (state) => {
  console.log(state);
  return ({
    user: state.user
  })
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})

export default connect(
  getState,
  mapDispatch
  ) (Profile)

