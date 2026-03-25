function setup () {
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

  // Build the SVG
  let body = ''
  body += '  <path d="M 30,30 60,30 60,60 30,60 30,30" />\n'
  body += '  <path d="M 70,30 100,30 100,60 70,60 70,30" />\n'
  body += '  <path d="M 110,30 140,30 140,60 110,60 110,30" />\n'

  // We have to save it as a .txt file, then rename it to .svg ourselves
  saveStrings((head + body + tail).split('\n'), 'my-design.txt')
}
