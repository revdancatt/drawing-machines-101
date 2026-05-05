// Give us access to the file system
const fs = require('node:fs')

// Create the head of the SVG
const head = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="210mm"
   height="297mm"
   viewBox="0 0 210 297"
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
     style="fill:none;stroke:#000000;stroke-width:0.2mm"
   >

`

// Create the tail of the SVG
const tail = `
  </g>
</svg>`

// Set up some values
const step = 2
let y = 30

// And the empty body
let body = ''

// Now draw a whole bunch of lines down the page
while (y <= 267) {
  if (Math.random() < 0.333) {
    body += `  <path d="M 60,${y} 150,${y}" />\n`
  }
  // Don't forget to increase y or else we'll never
  // get above 267 and we'll be stuck in this loop forever
  y = y + step
}

// Join them together into the 'svg'
const svg = head + body + tail + '\n'

// Write the file out
fs.writeFileSync('my-design.svg', svg, 'utf8')

// Let us know we've finished.
console.log('Saved my-design.svg')
