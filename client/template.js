import Visualizer from './classes/visualizer'

export default class HelloWorld extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 50 })
  }

  hooks () {
    this.sync.on('tatum', tatum => {
      console.log(tatum)
    })

    this.sync.on('segment', segment => {
      console.log(segment)
    })

    this.sync.on('beat', beat => {
      console.log(beat)
    })

    this.sync.on('bar', bar => {
      console.log(bar)
    })

    this.sync.on('section', section => {
      console.log(section)
    })
  }

  paint ({ ctx, height, width, now }) {
    const volume = this.sync.volume
    const beat = this.sync.getInterval('beat')
    console.log(beat.progress)
  }
}