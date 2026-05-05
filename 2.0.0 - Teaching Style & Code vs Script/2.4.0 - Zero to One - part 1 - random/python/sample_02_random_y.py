import random

head = '''<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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

'''

tail = '''
  </g>
</svg>
'''

step = 2.0
y = 30.0

body = ''

while y <= 267:
  body += f'  <path d="M 60,{y} 150,{y}" />\n'
  y = y + (step * random.random()) + 0.5

svg = head + body + tail

with open('my-design.svg', 'w', encoding='utf-8') as f:
    f.write(svg)

print('Saved my-design.svg')
