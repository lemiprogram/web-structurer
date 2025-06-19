import React from 'react'

export default function setColorPalette(root,colors){
    if(!colors){
        return
    }
    Object.entries(colors).forEach(color=>root.style.setProperty(color[0],color[1]))
}
