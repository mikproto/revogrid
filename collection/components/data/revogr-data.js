import { Component, Element, h } from '@stencil/core';
import { rowsStore as viewportRows, colsStore as viewportCols } from '../../store/viewport.store';
import dataStore from '../../store/data.store';
export class RevogrData {
    render() {
        const rowsEls = [];
        for (let row of viewportRows.get('items')) {
            const cells = [];
            for (let col of viewportCols.get('items')) {
                cells.push(h("div", { class: 'data-cell', style: { width: `${col.size}px`, transform: `translateX(${col.start}px)` } }, dataStore.provider.data(row.itemIndex, col.itemIndex)));
            }
            rowsEls.push(h("div", { class: 'row', style: { height: `${row.size}px`, transform: `translateY(${row.start}px)` } }, cells));
        }
        return rowsEls;
    }
    static get is() { return "revogr-data"; }
    static get elementRef() { return "element"; }
}
