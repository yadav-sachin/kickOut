function predictWinner(data, currPlayer, numRows, numCols) {

    return new Promise((resolve, reject) => {
        let max_G = Math.max(numRows, numCols);
        max_G *= max_G;
        let black_grundy = new Array(numRows), red_grundy = new Array(numRows), blue_grundy = new Array(numRows);
        for (let i = 0; i < numRows; ++i) {
            black_grundy[i] = new Array(numCols);
            red_grundy[i] = new Array(numCols);
            blue_grundy[i] = new Array(numCols);
        }
        //calculating black grundy
        for (let i = 0; i < numRows; ++i)
            for (let j = 0; j < numCols; ++j) {
                let is_present = [true];
                for (let i = 1; i <= max_G; ++i)
                    is_present.push(false);
                for (let x = 0; x < i; ++x)
                    is_present[black_grundy[x][j]] = true;
                for (let y = 0; j < j; ++y)
                    is_present[black_grundy[i][y]] = true;
                for (let m = 1; m <= max_G; ++m)
                    if (is_present[m] == false) {
                        black_grundy[i][j] = m;
                        break;
                    }
            }

        //calculating blue grundy
        for (let i = 0; i < numRows; ++i)
            for (let j = 0; j < numCols; ++j) {
                let is_present = [true];
                for (let i = 1; i <= max_G; ++i)
                    is_present.push(false);
                for (let x = 0; x < i; ++x)
                    is_present[blue_grundy[x][j]] = true;
                for (let y = 0; j < j; ++y)
                    is_present[blue_grundy[i][y]] = true;
                let x = i - 1, y = j - 1;
                while (x > 0 && y > 0) {
                    is_present[blue_grundy[x][y]] = true;
                    --x, --y;
                }
                for (let m = 1; m <= max_G; ++m)
                    if (is_present[m] == false) {
                        blue_grundy[i][j] = m;
                        break;
                    }
            }

        //calculating red_grundy
        for (let i = 0; i < numRows; ++i)
            for (let j = 0; j < numCols; ++j) {
                let is_present = [true];
                for (let i = 1; i <= max_G; ++i)
                    is_present.push(false);
                for (let x = 0; x < i; ++x)
                    for (let y = 0; y < j; ++y)
                        is_present[red_grundy[x][y]] = true;
                for (let m = 1; m <= max_G; ++m)
                    if (is_present[m] == false) {
                        red_grundy[i][j] = m;
                        break;
                    }
            }

        let nim_sum = 0;
        for (let i = 0; i < numRows; ++i) {
            for (let j = 0; j < numCols; ++j) {
                if (data[i][j].blue > 0)
                    nim_sum ^= blue_grundy[i][j];
                if (data[i][j].black > 0)
                    nim_sum ^= black_grundy[i][j];
                if (data[i][j].red > 0)
                    nim_sum ^= red_grundy[i][j];
            }
        }
        console.log("For current Player " + currPlayer + " I give NimSum of " + nim_sum);
        if (nim_sum != 0)
            resolve(currPlayer);
        else {
            if (currPlayer == 1)
                resolve(2);
            else
                resolve(1);
        }
    });
}   