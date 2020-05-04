import { setStore } from './helpers';
import DataProvider from './data.provider';
export default class DataSource {
    constructor(store) {
        this.store = store;
        this.provider = new DataProvider(this.store);
    }
    setData(data) {
        setStore(this.store, { data });
    }
    setColumn(columns) {
        setStore(this.store, { columns });
    }
}
