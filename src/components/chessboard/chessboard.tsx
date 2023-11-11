import React, { useEffect, useState } from "react";
import './chessboard.css'
import Tile from "../tile/tile.tsx";

interface Piece {
    image :string,
    x : number,
    y : number,
    type : string, // pawn, bishop,..., blank,
    color : string, // current color
    rootcolor : string
}
let initalBoardState : Piece[] = [];
const initPiece : Piece = {image : "", x : -1, y : -1, type : "blank", color : "", rootcolor : ""};
let piece1 : Piece = initPiece;
let piece2 : Piece = initPiece;

for(let p = 0; p < 2; p++) {
    const type = p === 0 ? "w" : "b";
    const x = p === 0 ? 7 : 0;
    const color1 = p === 0 ? "white" : "black";
    const color2 = p === 0 ? "black" : "white";

    initalBoardState.push({image : `assets/images/rook_${type}.png`, x, y : 0, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/rook_${type}.png`, x, y : 7, type : `${type}`, color : color1, rootcolor : color1});
    initalBoardState.push({image : `assets/images/knight_${type}.png`, x, y : 1, type : `${type}`, color : color1, rootcolor : color1});
    initalBoardState.push({image : `assets/images/knight_${type}.png`, x, y : 6, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/bishop_${type}.png`, x, y : 2, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/bishop_${type}.png`, x, y : 5, type : `${type}`, color : color1, rootcolor : color1});
    initalBoardState.push({image : `assets/images/queen_${type}.png`, x, y : 4, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/king_${type}.png`, x, y : 3, type : `${type}`, color : color1, rootcolor : color1});
}

for(let i = 0; i < 8; i++) {
    const color1 = (i % 2) === 0 ? "black" : "white";
    const color2 = (i % 2) === 1 ? "black" : "white";
    initalBoardState.push({image : "assets/images/pawn_b.png", x : 1, y : i, type : "b", color : color1, rootcolor : color1});
    initalBoardState.push({image : "assets/images/pawn_w.png", x : 6, y : i, type : "w", color : color2, rootcolor : color2});
}

for(let i = 2; i < 6; i++) {
    let color = (i % 2) === 0 ? "white" : "black";
    for(let j = 0; j < 8; j++) {
        initalBoardState.push({image : "", x : i, y : j, type : "blank", color : color, rootcolor : color});
        if(color === "white") color = "black";
        else color = "white";
    }
}

let pieces = initalBoardState;
let turn = "w"; // Ben trang choi truoc

export default function Chessboard() {
    const b_pawn = [[2, 0], [1, 0]]; 
    const w_pawn = [[-2, 0], [-1, 0]]; 
    const b_rook = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const w_rook = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const b_knight = [[2, 1], [2, -1], [1, 2], [1, -2], [-2, -1], [-2, 1], [-1, -2], [-1, 2]];
    const w_knight = [[2, 1], [2, -1], [1, 2], [1, -2], [-2, -1], [-2, 1], [-1, -2], [-1, 2]];
    const b_bishop = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    const w_bishop = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    const b_queen = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    const w_queen = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    const b_king = [[1, 0], [1, 1], [1, -1], [0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
    const w_king = [[1, 0], [1, 1], [1, -1], [0, 1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    function checkRoad(piece : Piece) {
        const x = piece.x;
        const y = piece.y;
        if(x < 0 || y < 0 || x > 7 || y > 7) return "wrong"
        let res = "continue";
        pieces.forEach((p) => {
            if(p.x === x && p.y === y) {
                if(p.image !== "" && p.type !== turn) res = "end";
                if(p.image !== "" && p.type === turn) res = "wrong";
            }
        });
        return res;
    }

    function getArray(p : Piece) {
        const image = p.image;
        if(image === "assets/images/pawn_b.png") {
            let res = [];
            if(p.x === 1) res = b_pawn;
            else res = [[1, 0]];
            return res;
        }
        if(image === "assets/images/pawn_w.png") {
            if(p.x === 6) return w_pawn;
            else return [[-1, 0]]; 
        }

        if(image === "assets/images/rook_b.png") return b_rook;
        if(image === "assets/images/rook_w.png") return w_rook;

        if(image === "assets/images/knight_b.png") return b_knight;
        if(image === "assets/images/knight_w.png") return w_knight;

        if(image === "assets/images/bishop_b.png") return b_bishop;
        if(image === "assets/images/bishop_w.png") return w_bishop;

        if(image === "assets/images/queen_b.png") return b_queen;
        if(image === "assets/images/queen_w.png") return w_queen;

        if(image === "assets/images/king_b.png") return b_king;
        if(image === "assets/images/king_w.png") return w_king;
    }

    
    function rerenderBoard() {
        let initBoard = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let image = "";
                let type = "";
                let color = "";
                let rootcolor = "";
                pieces.forEach((p) => {
                    if(p.x === i && p.y === j) {
                        image = p.image;
                        type = p.type;
                        color = p.color;
                        //color += "tile";
                        rootcolor = p.rootcolor;
                    }
                });
                initBoard.push(<Tile key={`${i},${j}`} image={image} id={i * 8 + j} color={color} rootColor={rootcolor} type={type} />);
            }
        }
        setBoard(initBoard);
    }


    function grabPiece(e : React.MouseEvent) {
        const element = e.target as HTMLElement;
        console.log(element.classList.toString());
        //if(piece1 === initPiece && element.classList.contains("chesspiece") === false) return;
        //console.log(element.id.toString());

        //console.log(pieces);
        if(element.classList.contains("chesspiece")) {
            if(element.classList.contains("redtile") === false) {
                console.log("red");
                let redPiece = [];
                let p : Piece;
                pieces.map((piece) => {
                    if((piece.x * 8 + piece.y) === parseInt(element.id)) {
                        p = {image : piece.image, x : piece.x, y : piece.y, type : piece.type, color : piece.color, rootcolor : piece.rootcolor};
                    }
                    return piece;
                });
                if(p.type !== turn) {
                    piece1 = initPiece;
                    piece2 = initPiece;

                    initalBoardState = pieces;
                    pieces = initalBoardState.map((piece) => {
                        const newPiece = {
                            ...piece,
                            color : `${piece.rootcolor}`,
                        };
                        return newPiece;
                    });
                    rerenderBoard();
                    
                    return;
                }
                if(piece1 !== initPiece && (piece1.x !== p.x || piece1.y !== p.y)) {
                    piece1 = initPiece;
                    piece2 = initPiece;

                    initalBoardState = pieces;
                    pieces = initalBoardState.map((piece) => {
                        const newPiece = {
                            ...piece,
                            color : `${piece.rootcolor}`,
                        };
                        return newPiece;
                    });
                    rerenderBoard();

                    return;
                }
                piece1 = {image : p.image, x : p.x, y : p.y, type : p.type, color : "red", rootcolor : p.rootcolor};
                console.log(piece1);
                redPiece.push(p);
                let a = getArray(p);
                for(let i = 0; i < a?.length; i++) {
                    const x = a[i][0] + p.x;
                    const y = a[i][1] + p.y;
                    //console.log(piece1);
                    let p2 : Piece = {image : "", x : x, y : y, type : "blank"};
                    pieces.map((piece) => {
                        if(piece.x === x && piece.y === y) {
                            p2 = {image : piece.image, x : piece.x, y : piece.y, type : piece.type};
                        }
                    })
                    //console.log(piece1);
                    if(checkRoad(p2) !== "wrong") redPiece.push(p2); 
                }
                initalBoardState = pieces;
                pieces = initalBoardState.map((piece) => {
                    let newPiece = piece;
                    redPiece.map((rpiece) => {
                        if(newPiece.x === rpiece.x && newPiece.y === rpiece.y) {
                            newPiece = {
                                ...piece,
                                color : "red",
                            }
                        }
                        return rpiece;
                    })
                    //console.log(newPiece);
                    return newPiece;
                });
                initalBoardState = pieces;
                //console.log(initalBoardState);
                //rerenderBoard();
                //console.log("finish");
            }
        }  

        if(element.classList.contains("redtile") === true) {
            //console.log(piece1);
            //console.log(piece2);
            let p : Piece;
            initalBoardState.map((piece) => {
                if((piece.x * 8 + piece.y) === parseInt(element.id)) {
                    //console.log(element.id);
                    p = {image : piece.image, x : piece.x, y : piece.y, type : piece.type, color : piece.color, rootcolor : piece.rootcolor};
                }
            })
            piece2 = {image : p.image, x : p.x, y : p.y, type : p.type, color : "red", rootcolor : p.rootcolor};
            //console.log(piece1);
            console.log(piece2);
            initalBoardState = pieces;
            pieces = initalBoardState.map((piece) => {
                const newPiece = {
                    ...piece,
                    color : `${piece.rootcolor}`,
                };
                return newPiece;
            });
            //console.log(initalBoardState);
            //rerenderBoard();
        }

        //console.log(piece1);
        //console.log(piece2);
        if(piece1 !== initPiece && piece2 !== initPiece) {
            console.log("run");
            //console.log(piece1);
            //console.log(piece2);
            if(piece1.x === piece2.x && piece1.y === piece2.y) {
                piece1 = initPiece;
                piece2 = initPiece;
                console.log("same");
            } 
            else {
                //console.log(piece1);
                //console.log(piece2);
                initalBoardState = pieces;
                pieces = initalBoardState.map((piece) => {
                    let newPiece = piece;
                    if(piece.x === piece1.x && piece.y === piece1.y) {
                        newPiece.image = "";
                        newPiece.type = "blank";
                        console.log(`${piece.x}, ${piece.y}`);
                    }
                    if(piece.x === piece2.x && piece.y === piece2.y) {
                        newPiece.image = piece1.image;
                        newPiece.type = piece1.type;
                        console.log(`${piece.x}, ${piece.y}`);
                        console.log(newPiece);
                    }
                    return newPiece;
                });
                //console.log(initalBoardState.length);
                piece1 = initPiece;
                piece2 = initPiece;
                if(turn === "w") turn = "b";
                else turn = "w";
                //rerenderBoard();
            }
        }

        //console.log(piece1);
        //console.log(piece2);
        rerenderBoard();
        //console.log(pieces);
    }

    const [board, setBoard] = useState(function loadBoard() {
        let initBoard = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let image = "";
                let type = "";
                let color = "";
                let rootcolor = "";
                pieces.forEach((p) => {
                    if(p.x === i && p.y === j) {
                        image = p.image;
                        type = p.type;
                        color = p.color;
                        //color += "tile";
                        rootcolor = p.rootcolor;
                    }
                });
                initBoard.push(<Tile key={`${i},${j}`} image={image} id={i * 8 + j} color={color} rootColor={color} type={type} />);
            }
        }
        return initBoard;
    });
    return (
    <>
        <div id = "chessboard" 
        onMouseDown={(e) => grabPiece(e)}
        //onMouseMove={(e) => movePiece(e)}
        //onMouseUp={(e) => dropPiece(e)}
        > {board} </div>
    </>
    )
}