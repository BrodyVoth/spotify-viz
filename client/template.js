import Visualizer from './classes/visualizer'
import { interpolateBasis, interpolateRgbBasis } from 'd3-interpolate'
import { sin } from './util/canvas'

export default class Hello extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 80 })
  }

  hooks () {
    this.sync.on('beat', beat => {
      this.color = beat.index % 2 === 0 ? 'red' : 'blue'
      this.nextColor =  beat.index % 2 === 0 ? 'blue' : 'red'
      this.amp = this.sync.volume * 300
    })
  }

  paint ({ ctx, height, width, now }) {
    const { progress } = this.sync.getInterval('beat')
    const amp = interpolateBasis([50, this.amp, 50])(progress)
    ctx.lineWidth = interpolateBasis([this.sync.volume * 5, 100 * this.sync.volume, this.sync.volume * 5])(progress)
    ctx.fillStyle = 'rgba(255, 255, 255, .3)'
    ctx.strokeStyle = interpolateRgbBasis([this.color, this.nextColor])(progress)
    ctx.fillRect(0, 0, width, height)
    sin(ctx, now / 50, height/2, amp, 200)
    sin(ctx, now / 90, height/2, amp, 150)
    sin(ctx, now / 200, height/2, amp, 300)
  }
}