import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'
import * as Vibrant from 'node-vibrant'

var currentSong = 'Default song'
var resized = false
var bg = ""

function resizedw(){
  resized = true
}

var resizer;
window.onresize = function(){
clearTimeout(resizer);
resizer = setTimeout(resizedw, 100);
};

export default class Example extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = ['#18FF2A', '#7718FF', '#06C5FE', '#FF4242', '#18FF2A']
    
  }

  hooks () {
    this.sync.on('bar', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
      // console.log(this.sync.state)
    })

    // this.sync.on('section', section => {
    //   this.lastColor = this.nextColor || getRandomElement(this.theme)
    //   this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
    //   // console.log(this.sync.state)
    // })
  }

  paint ({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    var topLeftX = width / 2 - 320
    var topLeftY = height / 2 - 320
    
    if (currentSong != this.sync.state.currentlyPlaying.id || resized) {
      // console.log(currentSong + ' does not equal ' + this.sync.state.currentlyPlaying.id)
      document.getElementById("waitingDiv").style.visibility = "hidden"; 
      
      var img = new Image();
      img.src = this.sync.state.currentlyPlaying.album.images[0].url
      img.crossOrigin = "anonymous";
      img.onload = function() {
        const canvas2 = document.getElementById('myCanvas');
        const ctx2 = canvas2.getContext('2d');
        // Vibrant.from(img.src).getPalette((err, palette) => {
        //   console.log(palette)
        //   console.log(palette.Vibrant.getBodyTextColor())
        //   var bg = palette.DarkMuted.getRgb()
        //   console.log(bg)
        //   ctx.fillStyle = 'rgba(' + bg[0] + ', ' + bg[1] + ', ' + bg[2] + ')'
        //   ctx.fillRect(0, 0, width, height)
        //   ctx.drawImage(img, width / 2 - 320, height / 2 - 320);
        // })

        // ctx.drawImage(img, topLeftX, topLeftY);
        ctx2.canvas.width  = width;
        ctx2.canvas.height = height;
        ctx2.drawImage(img, topLeftX, topLeftY);
        bg = ctx2.getImageData(topLeftX, topLeftY + 160, 1, 1).data
        // console.log(bg)
        document.body.style.backgroundColor = 'rgba(' + bg[0] + ', ' + bg[1] + ', ' + bg[2] + ')'; 
      }

      resized = false

      // ctx.moveTo(width / 2, height / 2 + 360);
      // ctx.font = "50px Verdana";
      // ctx.textAlign = "center"; 
      // ctx.fillStyle = "white";
      // ctx.globalCompositeOperation='source-over';
      // ctx.fillText(this.sync.state.currentlyPlaying.name + ' by ' + this.sync.state.currentlyPlaying.artists[0].name, width / 2, height / 2 + 380);

      currentSong = this.sync.state.currentlyPlaying.id
    }
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = bar
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress)
    sin(ctx, now / 50, 0 + 80, this.sync.volume * 50, 100)
    ctx.stroke()
    sin(ctx, now / 50, height - 80, this.sync.volume * 50, 100)
    ctx.stroke()
    ctx.fillStyle = 'rgba(' + bg[0] + ', ' + bg[1] + ', ' + bg[2] + ')'; 
    ctx.beginPath()
    ctx.lineWidth = beat
    circle(ctx, width / 2, 0 - 30, (this.sync.volume * height / 5 + beat / 10) / 5)
    ctx.stroke()
    ctx.fill()
    circle(ctx, width / 2, height + 30, (this.sync.volume * height / 5 + beat / 10) / 5)
    ctx.stroke()
    ctx.fill()
  }
}