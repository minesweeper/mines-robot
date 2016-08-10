export default (cell1, cell2) => {
  const [cell1Row, cell1Col] = cell1;
  const [cell2Row, cell2Col] = cell2;
  let areNeighbours = false;

  if (cell1Row === cell2Row) {
    const columnDifference = Math.abs((cell1Col + 1) - (cell2Col + 1));
    if (columnDifference === 1) { areNeighbours = true; }
  }
  if (cell1Col === cell2Col) {
    const rowDifference = Math.abs((cell1Row + 1) - (cell2Row + 1));
    if (rowDifference === 1) { areNeighbours = true; }
  }
  return areNeighbours;
};
