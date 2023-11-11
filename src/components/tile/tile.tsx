import React from 'react'
import './tile.css'

interface Props {
    image? : string,
    number : number
}

export default function Tile({number, image} : Props) {
    if(number % 2 === 0 && image !== "") 
        return ( 
            <div className="tile blacktile">
                <div style={{backgroundImage : `url(${image})`}} className="chesspiece"></div>
            </div>
        )

    if(number % 2 === 1 && image !== "")
        return ( 
            <div className="tile whitetile">
                <div style={{backgroundImage : `url(${image})`}} className="chesspiece"></div>
            </div>
        )

    if(number % 2 === 0 && image === "") 
            return (
                <div className='tile blacktile'></div>
            )

    if(number % 2 === 1 && image === "") 
        return (
            <div className='tile whitetile'></div>
        )
}