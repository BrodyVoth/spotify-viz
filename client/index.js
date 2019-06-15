import { auth } from './classes/sync'
import Hello from './hello-visualizer'
import Template from './template'

if (window.location.hash === '#start') {
  const hello = new Template()
} else {
  auth()
}