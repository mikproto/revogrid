import { h } from '@stencil/core';
class DataProviderObject {
    constructor(store) {
        this.store = store;
    }
    data(r, c) {
        const { prop, model } = this.rowDataModel(r, c);
        return model[prop] || '';
    }
    rowDataModel(r, c) {
        var _a;
        const prop = (_a = this.store.get('columns')[c]) === null || _a === void 0 ? void 0 : _a.prop;
        const model = this.store.get('data')[r] || {};
        return {
            prop, model
        };
    }
}
class HeaderProviderObject {
    constructor(store) {
        this.store = store;
    }
    data(c) {
        var _a;
        return ((_a = this.store.get('columns')[c]) === null || _a === void 0 ? void 0 : _a.name) || '';
    }
    template(c) {
        return this.store.get('columns')[c].cellTemplate;
    }
}
export default class DataProvider {
    constructor(store) {
        this.store = store;
        this.columnProvider = new HeaderProviderObject(this.store);
        this.dataProvider = new DataProviderObject(this.store);
    }
    data(r, c) {
        const tpl = this.columnProvider.template(c);
        if (tpl) {
            return tpl(h, this.dataProvider.rowDataModel(r, c));
        }
        return this.dataProvider.data(r, c);
    }
    header(c) {
        return this.columnProvider.data(c);
    }
}
