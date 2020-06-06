$(function () {

    numRows = 5;
    numCols = 5;
    //removing the top and left borders for removal
    $('#board > .cell:nth-child(-n+' + numCols).css('border-top', 'none');
    $('#board > .cell:nth-child(' + numRows + 'n+1').css('border-left', 'none');

    $('#board > .cell.contains_piece').click(function () {
        $(this).css('background-color', 'orange');
        let cellID = $(this).attr('id');
        let cellRow = parseInt(cellID[0]), cellCol = parseInt(cellID[2]);
        for (let i = 1; i <= cellRow; ++i)
            for (let j = 1; j <= cellCol; ++j)
            {
                if (i == cellRow && j == cellCol) continue;
                let $cell = $('#' + i + '_' + j);
                $cell.css('background-color', 'yellow');
                $cell.toggleClass('valid_move_cell');
            }
    });

});


