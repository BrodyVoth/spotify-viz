import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'

export default class Example extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 80 })

    this.theme = [      
      '#18FF2A', 
      '#7718FF', 
      '#06C5FE', 
      '#FF4242', 
      '#18FF2A'
    ]
  }

  hooks () {
    this.sync.on('beat', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    })
  }

  paint ({ ctx, height, width, now }) {
    const volume = this.sync.volume
    const beat = this.sync.getInterval('beat')
    const bar = this.sync.getInterval('bar')
    const bump = interpolateBasis([0, 150, 0])(beat.progress)

    ctx.fillStyle = interpolateRgb(this.lastColor, this.nextColor)(beat.progress)
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.arc(width/2, height/2, (volume * height/3) + bump, 0, Math.PI * 2)
    ctx.fill()
  }
}