import React from 'react'
import './tile.css'

interface Props {
    image? : string,
    id : number,
    color : string,
    rootColor : string,
    type : string
}

export default function Tile({image, id, color, rootColor} : Props) {
    color += "tile";
    if(image !== "") 
        return ( 
            <div className={`tile ${color} ${rootColor}`}>
                <div style={{backgroundImage : `url(${image})`}} className={`chesspiece ${color}`} id={id.toString()}></div>
            </div>
        )
    if(image === "") 
            return (
                <div className={`tile ${color} ${rootColor}`} id={id.toString()}></div>
            )

}