    const beat = this.sync.getInterval('beat')
    const radius = this.sync.volume * (height/2)
    const bounce = interpolateBasis([0, radius / 2, 0])(beat.progress)
    const sides = 5
    const outerRadius = radius + bounce
    const innerRadius = radius - bounce
    const cx = width/2
    const cy = height/2
    const rotation = now / 10
    const { vertices } = star(sides, outerRadius, innerRadius, cx, cy, rotation)
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = interpolateBasis([0, 500, 0])(beat.progress)
    ctx.strokeStyle = interpolate(this.lastColor, this.nextColor)(beat.progress)
    drawShape(ctx, vertices).stroke()