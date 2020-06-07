$(function () {

    numRows = 5;
    numCols = 5;
    //removing the top and left borders for removal
    for (let j = 1; j <= numCols; ++j)
        $('#1_'+ j).addClass('top_cell');
    for (let i = 1; i <= numRows; ++i)
        $('#'+ i + '_1').addClass('left_cell');
    $('#board > .cell.contains_piece').html("&#9679;");

    exports ={
        numRows,
        numCols
    };
});

