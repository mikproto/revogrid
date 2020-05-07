import { ObservableMap } from '@stencil/store';
import { VNode } from '../stencil-public-runtime';
import { DataSourceState } from "../interfaces";
export default class DataProvider {
    private store;
    private dataProvider?;
    private columnProvider?;
    constructor(store: ObservableMap<DataSourceState>);
    data(r: number, c: number): string | VNode;
    header(c: number): string;
}
