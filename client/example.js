import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'

export default class Example extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 15 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
  }

  hooks () {
    this.sync.on('beat', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })
  }

  paint ({ ctx, height, width, now }) {
    const lineBeat = interpolateBasis([2, 250, 2])(this.sync.beat.progress)
    const sizeBeat = interpolateBasis([0, 250, 0])(this.sync.bar.progress)
    ctx.fillStyle = 'rgba(0, 0, 0, .075)'
    ctx.fillRect(0, 0, width, height)
    ctx.lineWidth = lineBeat
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.beat.progress)
    sin(ctx, now / 50, height / 2, this.sync.volume * 50, 100)
    ctx.stroke()
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.beginPath()
    circle(ctx, width / 2, height / 2, this.sync.volume * height / 5 + sizeBeat)
    ctx.stroke()
    ctx.fill()
  }
}