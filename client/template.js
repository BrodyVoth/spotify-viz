import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'

export default class HelloWorld extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 100 })
  }

  hooks () {
    this.sync.on('tatum', tatum => {

    })

    this.sync.on('segment', segment => {

    })

    this.sync.on('beat', beat => {

    })

    this.sync.on('bar', bar => {

    })

    this.sync.on('section', section => {

    })
  }

  paint ({ ctx, height, width, now }) {
    const volume = this.sync.volume
    const beat = this.sync.getInterval('beat')

    console.log(volume, beat.index)
  }
}