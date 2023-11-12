import React, { useState } from "react";
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
let currentPiece : Piece = initPiece;
let road : Piece[] = [];

for(let p = 0; p < 2; p++) {
    const type = p === 0 ? "b" : "w";
    const x = p === 0 ? 0 : 7;
    const color1 = p === 0 ? "black" : "white";
    const color2 = p === 0 ? "white" : "black";

    initalBoardState.push({image : `assets/images/rook_${type}.png`, x, y : 0, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/knight_${type}.png`, x, y : 1, type : `${type}`, color : color1, rootcolor : color1});
    initalBoardState.push({image : `assets/images/bishop_${type}.png`, x, y : 2, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/king_${type}.png`, x, y : 3, type : `${type}`, color : color1, rootcolor : color1});
    initalBoardState.push({image : `assets/images/queen_${type}.png`, x, y : 4, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/bishop_${type}.png`, x, y : 5, type : `${type}`, color : color1, rootcolor : color1});
    initalBoardState.push({image : `assets/images/knight_${type}.png`, x, y : 6, type : `${type}`, color : color2, rootcolor : color2});
    initalBoardState.push({image : `assets/images/rook_${type}.png`, x, y : 7, type : `${type}`, color : color1, rootcolor : color1});

    if(p === 0) {
        for(let i = 0; i < 8; i++) {
            const color = (i % 2) === 0 ? "black" : "white";
            initalBoardState.push({image : "assets/images/pawn_b.png", x : 1, y : i, type : "b", color : color, rootcolor : color});
        }
        
        for(let i = 2; i < 6; i++) {
            let color = (i % 2) === 0 ? "white" : "black";
            for(let j = 0; j < 8; j++) {
                initalBoardState.push({image : "", x : i, y : j, type : "blank", color : color, rootcolor : color});
                if(color === "white") color = "black";
                else color = "white";
            }
        }

        for(let i = 0; i < 8; i++) {
            const color = (i % 2) === 1 ? "black" : "white";
            initalBoardState.push({image : "assets/images/pawn_w.png", x : 6, y : i, type : "w", color : color, rootcolor : color});
        }
    }
}

let pieces = initalBoardState;
console.log(pieces);
let turn = "w"; // Quân trắng chơi trước

export default function Chessboard() {
    function checkRoad(x : number, y : number, type : string) {
        if(x < 0 || y < 0 || x > 7 || y > 7) return "wrong";
        if(pieces[getId(x, y)].type === "blank") return "continue";
        if(pieces[getId(x, y)].type === type) return "wrong";
        if(pieces[getId(x, y)].type !== "blank" && pieces[getId(x, y)].type !== type) return "end";
    }

    function getId(x : number, y : number) {
        return (x * 8 + y);
    }
    function loadRoad() {
        const image = currentPiece.image;
        const x = currentPiece.x;
        const y = currentPiece.y;
        const type = currentPiece.type;
        if(image === "assets/images/pawn_b.png") {
            if(x === 1) road.push(pieces[getId(x + 2, y)]);
            if(x < 7) {
                if(pieces[getId(x + 1, y)].type === "blank") road.push(pieces[getId(x + 1, y)]);
                if(y > 0) if(pieces[getId(x + 1, y - 1)].type === "w") road.push(pieces[getId(x + 1, y - 1)]);
                if(y < 7) if(pieces[getId(x + 1, y + 1)].type === "w") road.push(pieces[getId(x + 1, y + 1)]);
            }
            return;
        }

        if(image === "assets/images/pawn_w.png") {
            if(x === 6) road.push(pieces[getId(x - 2, y)]);
            if(x > 0) {
                if(pieces[getId(x - 1, y)].type === "blank") road.push(pieces[getId(x - 1, y)]);
                if(y > 0) if(pieces[getId(x - 1, y - 1)].type === "b") road.push(pieces[getId(x - 1, y - 1)]);
                if(y < 7) if(pieces[getId(x - 1, y + 1)].type === "b") road.push(pieces[getId(x - 1, y + 1)]);
            }
            return;
        }

        if(image === "assets/images/knight_b.png" ||image === "assets/images/knight_w.png") {
            if(x < 6) {
                if(y > 0) if(pieces[getId(x + 2, y - 1)].type !== type) road.push(pieces[getId(x + 2, y - 1)]);
                if(y < 7) if(pieces[getId(x + 2, y + 1)].type !== type) road.push(pieces[getId(x + 2, y + 1)]);
            }
            if(x < 7) {
                if(y > 1) if(pieces[getId(x + 1, y - 2)].type !== type) road.push(pieces[getId(x + 1, y - 2)]);
                if(y < 6) if(pieces[getId(x + 1, y + 2)].type !== type) road.push(pieces[getId(x + 1, y + 2)]);
            }
            if(x > 1) {
                if(y > 0) if(pieces[getId(x - 2, y - 1)].type !== type) road.push(pieces[getId(x - 2, y - 1)]);
                if(y < 7) if(pieces[getId(x - 2, y + 1)].type !== type) road.push(pieces[getId(x - 2, y + 1)]);
            }
            if(x > 0) {
                if(y > 1) if(pieces[getId(x - 1, y - 2)].type !== type) road.push(pieces[getId(x - 1, y - 2)]);
                if(y < 6) if(pieces[getId(x - 1, y + 2)].type !== type) road.push(pieces[getId(x - 1, y + 2)]);
            }
        }

        if(image === "assets/images/bishop_b.png" || image === "assets/images/queen_b.png" || image === "assets/images/bishop_w.png" || image === "assets/images/queen_w.png") {
            let x1 = x + 1;
            let y1 = y - 1;
            // đi sang trái và xuống dưới
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                x1 += 1;
                y1 -= 1;
            }

            // đi sang phải và xuông dưới
            x1 = x + 1;
            y1 = y + 1;
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                x1 += 1;
                y1 += 1;
            }

            // đi sang trái và lên trên
            x1 = x - 1;
            y1 = y - 1;
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                x1 -= 1;
                y1 -= 1;
            }

            // đi sang phải và lên trên
            x1 = x - 1;
            y1 = y + 1;
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                x1 -= 1;
                y1 += 1;
            }
        }
        if(image === "assets/images/rook_b.png" || image === "assets/images/queen_b.png" || image === "assets/images/rook_w.png" || image === "assets/images/queen_w.png") {
            let x1 = x + 1;
            let y1 = y;
            // đi xuống dưới
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                x1 += 1;
            }

            // đi lên trên
            x1 = x - 1;
            y1 = y;
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                x1 -= 1;
            }

            // đi sang trái
            x1 = x;
            y1 = y - 1;
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                y1 -= 1;
            }

            // đi sang phải
            x1 = x;
            y1 = y + 1;
            while(true) {
                const val = checkRoad(x1, y1, type);
                if(val === "wrong") break;
                road.push(pieces[getId(x1, y1)]);
                if(val === "end") break;
                y1 += 1;
            }
        }
        if(image === "assets/images/king_b.png" || image === "assets/images/king_w.png") {
            if(checkRoad(x + 1, y, type) !== "wrong") road.push(pieces[getId(x + 1, y)]);
            if(checkRoad(x - 1, y, type) !== "wrong") road.push(pieces[getId(x - 1, y)]);
            if(checkRoad(x, y + 1, type) !== "wrong") road.push(pieces[getId(x, y + 1)]);
            if(checkRoad(x, y - 1, type) !== "wrong") road.push(pieces[getId(x, y - 1)]);
            if(checkRoad(x + 1, y + 1, type) !== "wrong") road.push(pieces[getId(x + 1, y + 1)]);
            if(checkRoad(x + 1, y - 1, type) !== "wrong") road.push(pieces[getId(x + 1, y - 1)]);
            if(checkRoad(x - 1, y + 1, type) !== "wrong") road.push(pieces[getId(x - 1, y + 1)]);
            if(checkRoad(x - 1, y - 1, type) !== "wrong") road.push(pieces[getId(x - 1, y - 1)]);
        }
    }

    
    function rerenderBoard() {
        let initBoard = [];
        pieces.map((p) => {
            initBoard.push(<Tile key={`${p.x},${p.y}`} image={p.image} id={p.x * 8 + p.y} color={p.color} rootColor={p.rootcolor} type={p.type} />);
            return p;
        });
        setBoard(initBoard);
    }


    function backToNormal() {
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
                road = [];
                currentPiece = pieces[parseInt(element.id)];
                if(currentPiece.type !== turn) {
                    backToNormal();
                    return;
                }
                if(piece1 !== initPiece && (piece1.x !== currentPiece.x || piece1.y !== currentPiece.y)) {
                    backToNormal();
                    return;
                }
                piece1 = {image : currentPiece.image, x : currentPiece.x, y : currentPiece.y, type : currentPiece.type, color : "red", rootcolor : currentPiece.rootcolor};
                console.log(piece1);
                road.push(currentPiece);
                loadRoad();
                console.log(road.length);
                road.map((piece) => {
                    pieces[getId(piece.x, piece.y)].color = "red";
                    return piece;
                });
                rerenderBoard();
                /*
                let a = getArray(currentPiece);
                for(let i = 0; i < a?.length; i++) {
                    const x = a[i][0] + p.x;
                    const y = a[i][1] + p.y;
                    //console.log(piece1);
                    let p2 : Piece = {image : "", x : x, y : y, type : "blank"};
                    pieces.map((piece) => {
                        if(piece.x === x && piece.y === y) {
                            p2 = {image : piece.image, x : piece.x, y : piece.y, type : piece.type};
                        }
                        return piece;
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
                */

                //console.log(initalBoardState);
                //rerenderBoard();
                //console.log("finish");
            }
        }  

        if(element.classList.contains("redtile") === true) {
            //console.log(piece1);
            //console.log(piece2);
            currentPiece = pieces[parseInt(element.id)];
            piece2 = {image : currentPiece.image, x : currentPiece.x, y : currentPiece.y, type : currentPiece.type, color : "red", rootcolor : currentPiece.rootcolor};
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
                        newPiece.color = newPiece.rootcolor;
                        console.log(`${piece.x}, ${piece.y}`);
                    }
                    if(piece.x === piece2.x && piece.y === piece2.y) {
                        newPiece.image = piece1.image;
                        newPiece.type = piece1.type;
                        newPiece.color = newPiece.rootcolor;
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
        pieces.map((p) => {
            initBoard.push(<Tile key={`${p.x},${p.y}`} image={p.image} id={p.x * 8 + p.y} color={p.color} rootColor={p.rootcolor} type={p.type} />);
            return p;
        })
        return initBoard;
    });
    return (
    <>
        <div id = "chessboard" onMouseDown={(e) => grabPiece(e)}> {board} </div>
    </>
    )
}