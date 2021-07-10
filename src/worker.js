import { createAppState } from '@ficusjs/state'

const store = createAppState('worker.test', {
  initialState: {
    text: 'hello world'
  },
  setText (text) {
    this.state.text = text
  }
})

function postState () {
  self.postMessage(Object.assign({}, store.state))
}

store.subscribe(postState)

self.onmessage = function (e) {
  const { actionName, payload } = e.data
  store[actionName](payload)
}

postState()
