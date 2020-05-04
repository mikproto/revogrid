/**
* Storing initial data and column information
*/
import DataSource from './data.manager';
declare const dataStore: DataSource;
declare function setColumn(data: ColumnData): void;
declare function setData(data: DataType[]): void;
export { setColumn, setData };
export default dataStore;
