import { generateHeader } from "./generateAlphabetHeader";
export default function generateFakeDataObject(rowsNumber, colsNumber) {
    const result = {};
    const headers = {};
    const all = colsNumber * rowsNumber;
    for (let j = 0; j < all; j++) {
        let col = j % colsNumber;
        let row = j / colsNumber | 0;
        if (!result[row]) {
            result[row] = {};
        }
        result[row][col] = row + ':' + col;
        if (!headers[col]) {
            headers[col] = {
                name: generateHeader(col),
                prop: col.toString()
            };
        }
    }
    return {
        rows: result,
        headers: headers
    };
}
