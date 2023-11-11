import React, { ReactEventHandler } from "react";
import './chessboard.css'
import Tile from "../tile/tile.tsx";

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxix = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface Piece {
    image :string,
    x : number,
    y : number
}

let pieces : Piece[] = [];

for(let p = 0; p < 2; p++) {
    const y = p === 0 ? 7 : 0;
    if(p === 0) {
        pieces.push({image : "assets/images/rook_b.png", x : 0, y})
        pieces.push({image : "assets/images/rook_b.png", x : 7, y})
        pieces.push({image : "assets/images/knight_b.png", x : 1, y})
        pieces.push({image : "assets/images/knight_b.png", x : 6, y})
        pieces.push({image : "assets/images/bishop_b.png", x : 2, y})
        pieces.push({image : "assets/images/bishop_b.png", x : 5, y})
        pieces.push({image : "assets/images/queen_b.png", x : 4, y})
        pieces.push({image : "assets/images/king_b.png", x : 3, y})
    }
    else {
        pieces.push({image : "assets/images/rook_w.png", x : 0, y})
        pieces.push({image : "assets/images/rook_w.png", x : 7, y})
        pieces.push({image : "assets/images/knight_w.png", x : 1, y})
        pieces.push({image : "assets/images/knight_w.png", x : 6, y})
        pieces.push({image : "assets/images/bishop_w.png", x : 2, y})
        pieces.push({image : "assets/images/bishop_w.png", x : 5, y})
        pieces.push({image : "assets/images/queen_w.png", x : 4, y})
        pieces.push({image : "assets/images/king_w.png", x : 3, y})
    }
}

for(let i = 0; i < 8; i++) {
    pieces.push({image : "assets/images/pawn_b.png", x : i, y : 6});
    pieces.push({image : "assets/images/pawn_w.png", x : i, y : 1});
}

let activePiece : HTMLElement | null = null;

function grabPiece(e : React.MouseEvent) {
    const element = e.target as HTMLElement;
    if(element.classList.contains("chesspiece")) {

        if(element.classList.contains("redtile")) {
            element.classList.remove("redtile")
            if(element.classList.contains("black")) {
                element.classList.add("blacktile");
                element.classList.remove("black");
            }

            if(element.classList.contains("white")) {
                element.classList.add("whitetile");
                element.classList.remove("white");
            }
        }
        else {
            element.classList.add("redtile");
            if(element.classList.contains("blacktile")) {
                element.classList.remove("blacktile");
                element.classList.add("black");
            }

            if(element.classList.contains("whitetile")) {
                element.classList.remove("whitetile");
                element.classList.add("white");
            }
        }
    }
    activePiece = element;
}

function movePiece(e : React.MouseEvent) {
    if(activePiece && activePiece.classList.contains("chesspiece")) {
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}

function dropPiece(e : React.MouseEvent) {
    if(activePiece) {
        activePiece = null;

    }
}

export default function Chessboard() {
    let board = [];
    for(let j = verticalAxix.length - 1; j >= 0; j--) {
        for(let i = 0; i < horizontalAxis.length; i++) {
            let image = "";
            pieces.forEach((p) => {
                if(p.x === i && p.y === j) {
                    image = p.image;
                }
            });
            board.push(<Tile key={`${j},${i}`} image={image} number={j + i + 2} />);
        }
    }
    return (
    <>
        <div id = "chessboard" 
        onMouseDown={(e) => grabPiece(e)}
        onMouseMove={(e) => movePiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        > {board} </div>
    </>
    )
}