/* global importScripts */
importScripts('https://unpkg.com/@ficusjs/state@1.2.0/dist/worker-app-state.iife.js')

const store = globalThis.ficusjs.createAppState({
  initialState: {
    text: 'hello world'
  },
  setText (text) {
    this.state.text = text
  }
})

function postState () {
  globalThis.postMessage(Object.assign({}, store.state))
}

store.subscribe(postState)

globalThis.onmessage = function (e) {
  const { actionName, payload } = e.data
  store[actionName](payload)
}

postState()
