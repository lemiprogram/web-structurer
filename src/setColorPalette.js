import React from 'react'

export default function setColorPalette(root,colors){
    Object.entries(colors).forEAch(color=>root.style.setProperty(color[0],color[1]))
}
