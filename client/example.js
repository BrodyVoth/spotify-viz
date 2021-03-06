import Visualizer from './classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from './util/array'
import { sin, circle } from './util/canvas'
import * as Vibrant from 'node-vibrant'

var currentSong = 'Default song'
var resized = false
var mostFrequent = ""
var color1 = ""
var color2 = ""

//themes. 1: moving right, 2: moving left, 3: right and left, 4: left and right, 5: no effects

window.onclick = changeTheme

var mode = 0

function changeTheme() {
  if (mode >= 4) {
    mode = 0
  } else {
    mode += 1
  }
}

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
    const bar = interpolateBasis([10, this.sync.volume * 10, 10])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    
    //do this only when it's detected to be a new song or the page was resized since last frame
    if (currentSong != this.sync.state.currentlyPlaying.id || resized) {

      document.getElementById("waitingDiv").style.visibility = "hidden"; 

      var img = new Image();
      img.src = this.sync.state.currentlyPlaying.album.images[0].url

      img.crossOrigin = "anonymous";
      img.onload = function() {
        const canvas2 = document.getElementById('myCanvas');
        const ctx2 = canvas2.getContext('2d');
        Vibrant.from(img.src).getPalette((err, palette) => {
          color1 = palette.LightVibrant.getHex()
          color2 = palette.DarkVibrant.getHex()
        })
        var topLeftX = (width - this.width) / 2
        var topLeftY = (height - this.height) / 2

        ctx2.canvas.width  = width;
        ctx2.canvas.height = height;
        ctx2.drawImage(img, topLeftX, topLeftY);

        // get background color from border of art ----------------------------
        // get rgb values from border of pixels from art
        var bgNewLeft = ctx2.getImageData(topLeftX, topLeftY, 2, this.height).data
        var bgNewTop = ctx2.getImageData(topLeftX, topLeftY, 640, 2).data
        var bgNewRight = ctx2.getImageData(topLeftX + this.width - 2, topLeftY, 2, this.height).data
        var bgNewBottom = ctx2.getImageData(topLeftX, topLeftY + 639, 640, 2).data
        var pixelRows = [bgNewLeft, bgNewTop, bgNewRight, bgNewBottom]

        // append rgb values of each pixel to color list. use alpha value to ignore off-screen values (they are rgba(0,0,0,0))
        let colorList = []
        for (let i=0; i < bgNewLeft.length; i+= 4) {
          for (let j=0; j < pixelRows.length; j++) {
            if (pixelRows[j][i+3] != 0) {
              const r = pixelRows[j][i];
              const g = pixelRows[j][i + 1];
              const b = pixelRows[j][i + 2];
              colorList.push([r, g, b]);
            }
          }
        }

        // find most common exact color
        let counts = colorList.reduce((a, c) => {
          a[c] = (a[c] || 0) + 1;
          return a;
        }, {});
        let maxCount = Math.max(...Object.values(counts));
        mostFrequent = Object.keys(counts).find(k => counts[k] === maxCount);

        document.body.style.backgroundColor = 'rgba(' + mostFrequent + ')'; 

        // if color getter doesn't find enough of the same color to be proud of the result, add a shadow
        if (maxCount < 600) { 
          ctx2.globalCompositeOperation='destination-over';
          ctx2.shadowBlur = 50;
          ctx2.shadowColor = "rgba(0,0,0,0.8)";
          ctx2.fillRect(topLeftX + 49, topLeftY + 49, this.width - 50, this.height - 50); 
        }
        // end of background color --------------------------------------------
      }

      resized = false

      // display song and artist name under album art
      // ctx.moveTo(width / 2, height / 2 + 360);
      // ctx.font = "50px Verdana";
      // ctx.textAlign = "center"; 
      // ctx.fillStyle = "white";
      // ctx.globalCompositeOperation='source-over';
      // ctx.fillText(this.sync.state.currentlyPlaying.name + ' by ' + this.sync.state.currentlyPlaying.artists[0].name, width / 2, height / 2 + 380);

      currentSong = this.sync.state.currentlyPlaying.id
    }
    var topDirections = [-now, now , -now, now]
    var bottomDirections = [-now, now, now, -now]

    ctx.clearRect(0, 0, width, height);
    if (mode != 4) {
      ctx.lineWidth = bar
      ctx.strokeStyle = interpolateRgb(color1, color2)(this.sync.bar.progress)
      sin(ctx, topDirections[mode] / 80, 80, this.sync.volume * 70, 100)
      ctx.stroke()
      sin(ctx, bottomDirections[mode] / 80, height - 80, this.sync.volume * 70, 100)
      ctx.stroke()
      ctx.fillStyle = 'rgba(' + mostFrequent + ')'; 
      ctx.beginPath()
      ctx.lineWidth = beat
      // circle(ctx, width / 2, -30, (this.sync.volume * height / 5 + beat / 10) / 5)
      circle(ctx, -20, height / 2, (this.sync.volume * height / 5 + beat / 10) / 5)

      ctx.stroke()
      ctx.fill()
      // circle(ctx, width / 2, height + 30, (this.sync.volume * height / 5 + beat / 10) / 5)
      circle(ctx, width + 20, height / 2, (this.sync.volume * height / 5 + beat / 10) / 5)

      ctx.stroke()
      ctx.fill()
    }
  }
}