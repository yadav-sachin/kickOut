$(function(){

    let selectedCellID;
    //First click for selecting the piece to move
    // Creating the click event for a cell that contains a piece
    $('#board').on('click', '.contains_piece',function () {
        $(this).addClass('selected_piece');
        selectedCellID = $(this).attr('id');
        let cellRow = parseInt(selectedCellID[0]), cellCol = parseInt(selectedCellID[2]);
        for (let i = 1; i <= cellRow; ++i)
            for (let j = 1; j <= cellCol; ++j)
            {
                if (i == cellRow && j == cellCol) continue;
                let $cell = $('#' + i + '_' + j);
                $cell.addClass('valid_move_cell');
            }
    });

    $('#board').on('click', '.valid_move_cell', function () {
        console.log("A valid cell was clicked");
        $('#' + selectedCellID).removeClass('contains_piece');
        $('#' + selectedCellID).html("");
        $(this).addClass('contains_piece');
        $(".valid_move_cell").removeClass('valid_move_cell');
        $('.selected_piece').removeClass('selected_piece');
        $('.contains_piece').html("&#9679;");
    });


});