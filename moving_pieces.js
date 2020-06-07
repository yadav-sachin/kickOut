$(function(){

    let selectedCellID;
    //First click for selecting the piece to move
    // Creating the click event for a cell that contains a piece
    $('#board').on('click', '.contains_piece',function () {
        //if some token was already selected 
        if ( $('.selected_piece').length ){
            $('.selected_piece').removeClass('selected_piece');
            $(".valid_move_cell").removeClass('valid_move_cell');
        }
        $(this).addClass('selected_piece');
        selectedCellID = $(this).attr('id');
        let cellRow = parseInt(selectedCellID[0]), cellCol = parseInt(selectedCellID[2]);
        for (let i = 0; i <= cellRow; ++i)
            for (let j = 0; j <= cellCol; ++j)
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
        $(".valid_move_cell").removeClass('valid_move_cell');
        $('.selected_piece').removeClass('selected_piece');
        // If the clicked cell is not an outside cell
        if ($(this).hasClass('out_cell') == false) 
        {
            $(this).addClass('contains_piece');
            $('.contains_piece').html("&#9679;");
        }
    });

    $('body').click( function(){

    });
});