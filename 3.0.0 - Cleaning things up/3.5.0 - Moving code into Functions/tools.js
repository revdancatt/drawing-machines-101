const downloadSVG = (pageWidth, pageHeight, allLines, filename) => {
  const mySVG = createSVG(pageWidth, pageHeight, allLines)
  const element = document.createElement('a')
  element.setAttribute('download', `${filename}.svg`)
  element.style.display = 'none'
  document.body.appendChild(element)
  //  Blob code via gec @3Dgec https://twitter.com/3Dgec/status/1226018489862967297
  element.setAttribute('href', window.URL.createObjectURL(new Blob([mySVG], {
    type: 'text/plain;charset=utf-8'
  })))

  element.click()
  document.body.removeChild(element)
}

const downloadGCODE = (pageWidth, pageHeight, allLines, filename) => {
  const myGCODE = createGCODE(pageWidth, pageHeight, allLines)
  const element = document.createElement('a')
  element.setAttribute('download', `${filename}.gcode`)
  element.style.display = 'none'
  document.body.appendChild(element)
  //  Blob code via gec @3Dgec https://twitter.com/3Dgec/status/1226018489862967297
  element.setAttribute('href', window.URL.createObjectURL(new Blob([myGCODE], {
    type: 'text/plain;charset=utf-8'
  })))

  element.click()
  document.body.removeChild(element)
}

const createSVG = (pageWidth, pageHeight, allLines) => {
  // Creates the head part of the SVG
  const head = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="${pageWidth}mm"
   height="${pageHeight}mm"
   viewBox="0 0 ${pageWidth} ${pageHeight}"
   version="1.1"
   id="svg1"
   inkscape:version="1.4.2 (ebf0e940, 2025-05-08)"
   sodipodi:docname="test.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">

  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     style="fill:none;stroke:none"
   >

`
  // Creates the tail part of the SVG
  const tail = `
  </g>
</svg>`

  let body = ''

  // Loop through all the lines
  for (let i = 0; i < allLines.length; i += 1) {
    // Grab the line
    const line = allLines[i]
    // Grab the points
    const points = line.points

    //   Make a new path
    let path = '<path style="'
    if (line.stroke == true) {
      path += 'stroke:#000000;stroke-width:0.2mm;'
    }
    if (line.fill == true) {
      path += 'fill:#FFFFFF;'
    }
    path += '" d="M '
    // Loop through all the points
    for (let j = 0; j < points.length; j++) {
      const point = points[j]
      path += `${point.x},${point.y} `
    }
    path += '" />\n'

    // Add the path to the body
    body += path
  }

  // return it as a simple string
  return head + body + tail
}

const createGCODE = (pageWidth, pageHeight, allLines) => {
  const head = `G10 L2 P1 X0 Y0 Z0
G10 L2 P6 X0 Y0 Z0
G90
G54
G1 Z15 F3000

( ## Install Black G2-0.7 )
( Park Height: 13.5 )
( AccelX:1000 )
( AccelY:1000 )
( AccelZ:1000 )
G53 G0 X0 Y0
G53 G1 Z13.5 F3000
M0
( CLEAR )
G53 G1 Z15 F3000

`
  // Creates the tail part of the SVG
  const tail = `
G53 G0 X0 Y0
M5
M2`

  let body = ''

  // Loop through all the lines
  for (let i = 0; i < allLines.length; i += 1) {
    // Grab the line
    const line = allLines[i]
    // Grab the points
    const points = line.points

    // Make a new path
    let path = `G0 X${points[0].x} Y${pageHeight - points[0].y}\n`
    path += 'G1 Z8 F3000\n'

    // Loop through all the points
    for (let j = 1; j < points.length; j++) {
      const point = points[j]
      path += `G1 X${point.x} Y${pageHeight - point.y} F3000\n`
    }
    path += 'G1 Z15 F3000\n\n'

    // Add the path to the body
    body += path
  }
  // Put it all together into the target textarea
  return head + body + tail
}

const drawCanvas = (pageWidth, pageHeight, allLines) => {
  const scaleMod = 10
  const canvas = document.getElementById('preview')
  canvas.width = pageWidth * scaleMod
  canvas.height = pageHeight * scaleMod

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#f6f6f6'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.lineWidth = canvas.width / 500
  ctx.strokeStyle = 'black'
  ctx.fillStyle = '#ffeeee'

  // Loop through all the lines
  for (let i = 0; i < allLines.length; i += 1) {
    // Grab the line
    const line = allLines[i]
    // Grab the points
    const points = line.points

    ctx.beginPath()
    ctx.moveTo(points[0].x * scaleMod, points[0].y * scaleMod)

    // Loop through all the rest of the points
    for (let j = 1; j < points.length; j++) {
      const point = points[j]
      ctx.lineTo(point.x * scaleMod, point.y * scaleMod)
    }
    if (line.fill == true) ctx.fill()
    if (line.stroke == true) ctx.stroke()
  }
}

const addMargins = (pageWidth, pageHeight, allLines, marginSize) => {
  return allLines
}
