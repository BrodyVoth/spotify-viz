#### Run Locally

1) Create a new Spotify app in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2) Add `http://localhost:8001/callback` to your app's Redirect URIs.
2) Enter your app's `client_id` and `client_secret` to `config.json` in the server directory.
3) Install and run using NPM.

```
npm i
npm run serve
```

5) Visit `http://localhost:8000` and log in with your Spotify account. 
6) Play a song in your Spotify client of choice. The visualizer will take a moment to sync before initializing.

#### Hello World

The `Visualizer` class contains two class instances – `Sync` and `Sketch`. `Sync` keeps track of your currently playing Spotify track and provides an interface to determine the current active interval of each type (`tatums`, `segments`, `beats`, `bars`, and `sections`). `Sketch` is a small canvas utility that creates a `<canvas>` element, appends it to the DOM, sizes it to the window, and initializes a 2d context. It will automatically scale according to the device's `devicePixelRatio`, unless you specify otherwise. `Sketch` will automatically handle resizing & scaling of the `<canvas>` on window resize. 

`Sketch` also provides an animation loop. When extending the `Visualizer` class, be sure to include the method `paint()`, as this defaults to the loop. If you're familiar with `requestAnimationFrame()` you'd expect a high-resolution timestamp to be passed to the loop, but instead you receive an object with the following keys:
* `ctx` – Active 2D Context
* `width` – `<canvas>` Width (CSS)
* `height` – `<canvas>` Height (CSS) 
* `now` – High-Resolution Timestamp

Another method you'll want to include when extending `Visualizer` is `hooks()`. Within this method you'll be able to subscribe to interval change events (e.g. "on every beat, do { foo }").

Putting it all together:

```javascript
import Visualizer from './classes/visualizer'

class HelloWorld extends Visualizer {
  constructor () {
    super({
      volumeSmoothing: 100,
      hidpi: true
    })
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
  }
}
```
In the example above, notice within the animation loop we have `sync.volume` and `sync.getInterval()`. These are always in sync with your active track. When using `sync.getInterval()`, you receive the current active interval of your specified type. The object includes a `progress` key, mapped fromo `0` to `1` (e.g. `.425 === 42.5%`). You're also given `start` time, `elapsed` time, `duration`, and `index`. 

Last but not least, the configuration object.

```javascript
{
  volumeSmoothing: 100,
  hidpi: true
}
```

`volumeSmoothing` determines how reactive the visualizer is to changes in volume. Decrease the value for a more snappy, reactive effect. Increase the value for a smoother roll. `hidpi` renders the `<canvas>` according to the `devicePixelRatio`, if greater than 1.

Try not to rely on `volumeSmoothing` alone for visual beat detection; any single value is not going to have the desired effect across all songs. Experiment with setting this value dynamically using track features like `energy` and `danceability` for greater flexibility.

#### Getting Started

You'll find the front-end entry in `/client/index.js`. Included in the project is `example.js`, which you'll see when you first run the project and authenticate with Spotify. `template.js` is what I intended to be your starting point. 