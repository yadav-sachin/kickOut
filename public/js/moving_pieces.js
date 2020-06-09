let selectedCellID, selectedPieceColor;
function markValidCells($piece, $cell)
{
    let cellID = $cell.attr('id');
    let curr_i = parseInt(cellID[0]), curr_j = parseInt(cellID[2]);
    for ( let j = 0; j < curr_j; ++j)
    {
        let $c = $('#' + curr_i + '_' + j);
        $c.addClass('valid_move_cell');
    }
    selectedPieceColor = "black";
    for (let i = 0; i < curr_i; ++i)
    {
        let $c = $('#' + i + '_' + curr_j);
        $c.addClass('valid_move_cell');
    }
    if($piece.hasClass('blue_piece'))
    {
        selectedPieceColor = "blue";
        console.log("Blue Piece Seleced", curr_i);
        let temp_i = curr_i-1, temp_j = curr_j-1;
        while (temp_i > 0 && temp_j > 0)
        {
            let $c = $('#' + temp_i + '_' + temp_j);
            $c.addClass('valid_move_cell');
            --temp_i;
            --temp_j;
        }
    }
    if($piece.hasClass('red_piece'))
    {
        selectedPieceColor = "red";
        for (let i = 0; i < curr_i; ++i)
        {
            for (let j = 0; j < curr_j; ++j)
            {
                let $c = $('#' + i + '_' + j);
                $c.addClass('valid_move_cell');
            }
        }
    }
}

$(function(){
    //First click for selecting the piece to move
    // Creating the click event for a cell that contains a piece
    $('#board').on('click', '.game_piece',function (ev) {
        //if some token was already selected 
        $cell = $(this).parents('.cell');
        ev.stopPropagation();
        selectedCellID=$cell.attr('id');
        if ( $('.selected_game_piece').length ){
            $('.selected_game_piece').removeClass('selected_game_piece');
            $('.selected_cell').removeClass('selected_cell');
            $(".valid_move_cell").removeClass('valid_move_cell');
        }
        $(this).addClass('selected_game_piece');
        markValidCells($(this), $cell);
    });

    $('#board').on('click', '.valid_move_cell', function () {
        let from_i = parseInt(selectedCellID[0]), from_j = parseInt(selectedCellID[2]);
        let to_i = parseInt($(this).attr('id')[0]), to_j = parseInt($(this).attr('id')[2]);
        deleteGamePiece(from_i, from_j, selectedPieceColor);
        addGamePiece(to_i,  to_j, selectedPieceColor);
        $(".valid_move_cell").removeClass('valid_move_cell');
        $('.selected_piece').removeClass('selected_piece');
        // If the clicked cell is not an outside cell
    });

});