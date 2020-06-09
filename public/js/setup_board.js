let currPlayer = 1;
let numRows = 5;
let numCols = 5;
//This setups the board grid
let piece_dimension = 60;
data = []
for (let i = 1; i <= numRows; ++i) {
    col_data = [];
    for (let j = 1; j <= numCols; ++j) {
        col_data.push({
            black: 0,
            blue: 0,
            red: 0
        });
    }
    data.push(col_data);
}
data[4][1].blue = 1;
data[4][1].black = 1;
data[4][1].red = 1;

function placeGamePiece(data, i, j, clr, $cell) {

    if (data[i - 1][j - 1][clr] > 0) {
        $cell.append(
            `<div class="${clr}_piece game_piece">
            <svg width="${piece_dimension}" height="${piece_dimension}">
            <circle cx="${piece_dimension / 2}" cy="${piece_dimension / 2}" r="${piece_dimension / 2.5}" fill="${clr}" />
            <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="${piece_dimension / 1.5}px" font-family="Arial" dy=".3em">${data[i - 1][j - 1][clr]}</text>
            </svg>
        </div>`
        );
    }
}

function setPieces() {
    for (let i = 1; i <= numRows; ++i)
        for (let j = 1; j <= numCols; ++j) {
            $cell = $('#' + i + '_' + j);
            $cell.empty();
            placeGamePiece(data, i, j, "black", $cell);
            placeGamePiece(data, i, j, "blue", $cell);
            placeGamePiece(data, i, j, "red", $cell);
        }
}

$(function () {
    //removing the top and left borders for removal
    for (let j = 1; j <= numCols; ++j)
        $('#1_' + j).addClass('top_cell');
    for (let i = 1; i <= numRows; ++i)
        $('#' + i + '_1').addClass('left_cell');
    $('#board > .cell.contains_piece').html("&#9679;");
    //Then set the pieces on the board
    setPieces();
});

function deleteGamePiece(i, j, selectedPieceColor)
{
    data[i-1][j-1][selectedPieceColor] -=1;
}

function addGamePiece(i, j, selectedPieceColor)
{
    if (i > 0 && j > 0)
    data[i-1][j-1][selectedPieceColor] +=1;
    setPieces();
}

