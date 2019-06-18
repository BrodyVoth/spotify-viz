import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'

export default class Example extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 30 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
  }

  hooks () {
    this.sync.on('bar', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })
  }

  paint ({ ctx, height, width, now }) {
    const beat = interpolateBasis([0, 200, 0])(this.sync.beat.progress)
    ctx.fillStyle = 'rgba(0, 0, 0, .075)'
    ctx.fillRect(0, 0, width, height)
    ctx.lineWidth = beat * 2
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress)
    sin(ctx, now / 50, height / 2, this.sync.volume * 50, 100)
    ctx.stroke()
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.beginPath()
    circle(ctx, width / 2, height / 2, this.sync.volume * height / 5 + beat / 2)
    ctx.stroke()
    ctx.fill()
  }
}