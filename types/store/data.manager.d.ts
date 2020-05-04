import { ObservableMap } from '@stencil/store';
import DataProvider from './data.provider';
export default class DataSource {
    private store;
    readonly provider: DataProvider;
    constructor(store: ObservableMap<DataSourceState>);
    setData(data: DataType[]): void;
    setColumn(columns: ColumnData): void;
}
