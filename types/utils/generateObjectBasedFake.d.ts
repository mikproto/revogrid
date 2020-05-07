import { ColumnDataSchema } from "../interfaces";
export default function generateFakeDataObject(rowsNumber: number, colsNumber: number): {
    rows: {
        [key: string]: {
            [key: string]: string;
        };
    };
    headers: {
        [key: string]: ColumnDataSchema;
    };
};
