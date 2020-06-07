$(function () {

    numRows = 5;
    numCols = 5;
    //removing the top and left borders for removal
    $('#board > .cell:nth-child(-n+' + numCols).css('border-top', 'none');
    $('#board > .cell:nth-child(' + numRows + 'n+1').css('border-left', 'none');
    $('#board > .cell.contains_piece').html("&#9679;");
});


