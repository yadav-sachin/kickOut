# kickOut

KickOut is a game which I theorised, on a 3D plane. However for simplicity, I have implented it in on 2D board.
Some Rules of the Game are as follows

- The player to delete the last token/piece from the board wins the game.
- There are three types of pieces:
  - **Black**: Moves like a Rook in the chess game. Only difference here is that it can move only left or up, to ensure the finite moves in the game.
  - **Blue**: Moves like a Queen in the chess game. Again only difference here is that it can move only left or up or left-up diagnol.
  - **Red**: Can move anywhere in the upper-left subarray.
- Along, with moving a piece, any piece has a possibility of being thrown out (removed) of the board in a move.

## Source File Structure:

```shell
./src/
├── app.js
├── config
│   ├── db.js
│   └── passport.js
├── controllers
│   ├── gameController.js
│   └── userController.js
├── middlewares
│   ├── isAuthenticated.js
│   └── redirectAuthenticated.js
├── models
│   ├── gameModel.js
│   └── userModel.js
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       ├── create_hint.js
│       ├── jquery.js
│       ├── manage_player_turn.js
│       ├── moving_pieces.js
│       ├── setup_board.js
│       └── win_predictor.js
├── routers
│   ├── gameRouter.js
│   ├── index.js
│   └── userRouter.js
├── socket.js
├── utils
│   └── mail.js
└── views
    ├── changePassword.hbs
    ├── createGame.hbs
    ├── dashboard.hbs
    ├── game.hbs
    ├── gamesList.hbs
    ├── login.hbs
    └── partials
        ├── bootstrapFooter.hbs
        ├── bootstrapHeader.hbs
        ├── logs.hbs
        └── userHeader.hbs
```

### Workflow of the Project:
- 