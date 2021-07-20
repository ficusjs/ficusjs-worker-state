/* global Worker */
import { createCustomElement, withWorkerStore } from 'https://cdn.skypack.dev/ficusjs@3'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/htm'

createCustomElement(
  'hello-world',
  withWorkerStore(new Worker('./worker.js'), {
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
