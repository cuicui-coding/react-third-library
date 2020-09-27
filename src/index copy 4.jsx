import { observable, action, computed } from 'mobx'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import {
  observer,
  PropTypes as ObservablePropTypes,
  Provider,
  inject,
} from 'mobx-react'

class userStoreClass {
  @observable user = {
    name: 'admin',
    role: '管理员',
  }
  count = 0
  @computed get userName() {
    return 'hello' + this.user.name
  }
  @action changeUser() {
    if (this.count % 2 === 1) {
      this.user = {
        name: 'admin',
        role: '管理员',
      }
    } else {
      debugger
      this.user.name = 'guest'
      this.user.role = '访客'
      this.user.isGuest = 'true'
      debugger
    }
    this.count++
  }
}
const userStore = new userStoreClass()

window.userStore = userStore

// debugger
// @inject('userStore')
// @observer
// export default class App extends Component {
//   constructor(props) {
//     super(props)
//     console.log(this.props, 'constructor props')

//     window.props = this.props;
//     debugger

//     this.state = {
//       number: 0,
//     }
//   }
//   render() {
//     debugger
//     console.log(this.props, 'render props')

//     // 可以以this.props.userStore形式获取store内state
//     const { user } = this.props.userStore
//     // 以.形式使用对象的属性值
//     return (
//       <div className="user">
//         <div className="user_list">name：{user.name}</div>
//         <div className="user_list">role：{user.name}</div>
//         <div className="user_list">
//           {user.isGuest ? `isGuest：${user.isGuest}` : ''}
//         </div>
//         <button
//           type="primary"
//           onClick={() => this.props.userStore.changeUser()}
//         >
//           Change User
//         </button>
//       </div>
//     )
//   }
// }
debugger
const App = inject((userStore)=> userStore)(observer((props)=>{
  console.log(props, 'props')
  debugger;

  const {user} = props.userStore;
      return (
      <div className="user">
        <div className="user_list">name：{user.name}</div>
        <div className="user_list">role：{user.name}</div>
        <div className="user_list">
          {user.isGuest ? `isGuest：${user.isGuest}` : ''}
        </div>
        <button
          type="primary"
          onClick={() => userStore.changeUser()}
        >
          Change User
        </button>
      </div>
    )
})
)
ReactDOM.render(
  <Provider userStore={userStore} theme='default'>
    <App app="app"/>
  </Provider>,
  document.querySelector('#root')
)
