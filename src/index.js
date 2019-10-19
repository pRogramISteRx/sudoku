module.exports = function solveSudoku(matrix) {
  // your solution
  let emptyPositions = [];
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  
  function checkRow(matrix, row, value) {
    for (let i = 0; i < matrix[row].length; i++) {
      if (matrix[row][i] === value) {
        return false;
      }
    }
    return true;
  }

  function checkColumn(matrix, column, value) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][column] === value) {
        return false;
      }
    }
    return true;
  }

  function check3x3Square(matrix, column, row, value) {
    let columnCorner = 0;
    let rowCorner = 0;
    let squareSize = 3;

    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        if (matrix[i][j] ===  value) {
          return false;
        }
      }
    }
    return true;
  }

  function checkValue(matrix, column, row, value) {
    if(checkRow(matrix, row, value) && checkColumn(matrix, column, value) 
    && check3x3Square(matrix, column, row, value)) {
      return true;
    } else {
      return false;
    }
  }

  let limit = 9;
    let column, row, value, found;

    for (let i = 0; i < emptyPositions.length;) {
      row = emptyPositions[i][0];
      column = emptyPositions[i][1];
      value = matrix[row][column] + 1;
      found = false;

      while (!found && value <= limit) {
        if (checkValue(matrix, column, row, value)) {
          found = true;
          matrix[row][column] = value;
          i++;
        } else {
          value++;
        }
      }

      if (!found) {
        matrix[row][column] = 0;
        i--;
      }
    }

    return matrix;
  
}
