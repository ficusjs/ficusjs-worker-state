import { createCustomElement } from 'https://cdn.skypack.dev/@ficusjs/core/custom-element'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers/htm'

function withWorkerAppState (workerUrl, options) {
  return {
    ...options,
    created () {
      this.worker = new Worker(new URL(workerUrl, import.meta.url))
      this.worker.onmessage = e => {
        this.state = e.data

        // clear the getter cache
        this.computedCache = {}

        // Run the render processor now that there's changes
        this._processRender()
      }
    },
    dispatch (actionName, payload) {
      this.worker.postMessage({ actionName, payload })
    }
  }
}

createCustomElement(
  'hello-world',
  withWorkerAppState('./worker.js', {
    renderer,
    onButtonClick () {
      this.dispatch('setText', 'This is a test')
    },
    render () {
      return html`
        <section>
          <p>${this.state ? html`${this.state.text}` : ''}</p>
          <button type="button" onclick="${this.onButtonClick}">Dispatch worker action</button>
        </section>
      `
    }
  })
)
