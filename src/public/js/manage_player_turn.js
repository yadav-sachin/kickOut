function togglePlayerTurn(){
    $('.player_' + currPlayer + '_turn').removeClass('active_player');
    if (currPlayer == 1)
        currPlayer = 2;
    else currPlayer = 1;
    $('.player_' + currPlayer + '_turn').addClass('active_player');
}

function showPredictedWinner(winner)
{
    $('.predicted_winner').removeClass('predicted_winner');
    $('.player_'+winner+'_win').addClass('predicted_winner');
}