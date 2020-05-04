export function generateFakeData(rowsNumber, colsNumber) {
    const result = [];
    const rowData = [];
    for (let j = 0; j < colsNumber; j++) {
        rowData.push(j.toString());
    }
    for (let i = 0; i < rowsNumber; i++) {
        result.push(rowData);
    }
    return result;
}
