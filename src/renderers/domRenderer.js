import { createVirtualRenderer } from './virtualRenderer';
import canUseDOM from '../utils/canUseDOM';
import { rulesToCSS } from '../utils/css';

/**
 * Create a DOM renderer to use for rendering styles
 * to an HTML document.
 *
 * @param  {Object}       options
 * @param  {HTMLDocument} options.domDocument - usually from window
 * @param  {Node}         options.element     - pass an existing element to use for stylishly
 * @return {Object}                           - the renderer
 */
export function createDOMRenderer({
  domDocument = canUseDOM && window.document,
  element = getStylishlyDOMElement(domDocument)
} = {}) {
  const renderer = createVirtualRenderer();

  renderer.events.on('renderSheet', (id, rules) => {
    element.textContent = element.textContent + rulesToCSS(rules);
  });

  return renderer;
}

/**
 * Get the stylishly DOM node from the document
 *
 * @private
 * @param  {HTMLDocument} domDocument - usually from window
 * @return {Node}
 */
export function getStylishlyDOMElement(domDocument) {
  // first see if we have a node the user placed
  let stylishlyDOMElement = domDocument.head.querySelector('[data-stylishly]');

  if (stylishlyDOMElement === null) {
    stylishlyDOMElement = createStylishlyDOMElement(domDocument);
  }

  return stylishlyDOMElement;
}

/**
 * Create the stylishly DOM node in the document
 *
 * @param  {HTMLDocument} domDocument - usually from window
 * @return {Node}
 */
export function createStylishlyDOMElement(domDocument) {
  const styleNode = domDocument.createElement('style');
  styleNode.setAttribute('data-stylishly', true);

  domDocument.head.appendChild(styleNode);

  return styleNode;
}