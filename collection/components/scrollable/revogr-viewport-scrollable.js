import { Component, h, Method } from '@stencil/core';
import { getScrollbarWidth } from '../../utils/utils';
import { setViewPortCoordinate } from '../../store/viewport.store';
import { rowsStore as rowDimension, colsStore as colDimension } from '../../store/dimension.store';
export class RevogrViewportScrollable {
    constructor() {
        this.scrollSize = 0;
        this.preventArtificialScroll = false;
        this.scrollVirtY = () => {
            if (this.preventArtificialScroll) {
                this.preventArtificialScroll = false;
                return;
            }
            const target = this.verticalVirtScroll;
            const top = (target === null || target === void 0 ? void 0 : target.scrollTop) || 0;
            setViewPortCoordinate(top, 'row');
            if (this.verticalScroll) {
                this.preventArtificialScroll = true;
                this.verticalScroll.scrollTop = top;
            }
        };
    }
    async scrollX(x) {
        var _a;
        if (x) {
            this.horizontalScroll.scrollLeft = x;
        }
        setViewPortCoordinate(x || ((_a = this.horizontalScroll) === null || _a === void 0 ? void 0 : _a.scrollLeft) || 0, 'col');
    }
    async scrollY(y) {
        var _a;
        if (this.preventArtificialScroll) {
            this.preventArtificialScroll = false;
            return;
        }
        const top = y || ((_a = this.verticalScroll) === null || _a === void 0 ? void 0 : _a.scrollTop) || 0;
        setViewPortCoordinate(top, 'row');
        if (this.verticalVirtScroll) {
            this.preventArtificialScroll = true;
            this.verticalVirtScroll.scrollTop = top;
        }
    }
    componentWillLoad() {
        this.scrollSize = getScrollbarWidth(document);
        let oldValY = rowDimension.get('realSize');
        let oldValX = colDimension.get('realSize');
        this.scrollX();
        this.scrollY();
        rowDimension.onChange('realSize', (newVal) => {
            if (newVal < oldValY) {
                this.verticalScroll.scrollLeft += newVal - oldValY;
            }
            oldValY = newVal;
        });
        colDimension.onChange('realSize', (newVal) => {
            if (newVal < oldValX) {
                this.horizontalScroll.scrollLeft += newVal - oldValX;
            }
            oldValX = newVal;
        });
    }
    componentDidRender() {
        // has vertical scroll
        if (this.verticalVirtScroll.scrollHeight > this.verticalVirtScroll.clientHeight) {
            const scrollSize = this.scrollSize || 20;
            this.verticalVirtScroll.style.top = `${this.header.clientHeight}px`;
            this.verticalVirtScroll.style.width = `${scrollSize}px`;
            this.verticalScroll.style.marginRight = `${scrollSize}px`;
        }
        else {
            this.verticalVirtScroll.style.width = '0';
            this.verticalScroll.style.marginRight = '0';
        }
        // has horizontal scroll
        if (this.horizontalScroll.scrollWidth > this.horizontalScroll.clientWidth) {
            this.verticalVirtScroll.style.bottom = `${this.scrollSize}px`;
        }
        else {
            this.verticalVirtScroll.style.bottom = '0';
        }
    }
    render() {
        return [
            h("div", { class: 'vertical-scroll', ref: (el) => { this.verticalVirtScroll = el; }, onScroll: () => this.scrollVirtY() },
                h("div", { style: { height: `${rowDimension.get('realSize')}px` } })),
            h("div", { class: 'horizontal-wrapper', ref: (el) => { this.horizontalScroll = el; }, onScroll: () => this.scrollX() },
                h("div", { class: 'inner-content-table' },
                    h("div", { class: 'header-wrapper', ref: (el) => { this.header = el; } },
                        h("slot", { name: 'header' })),
                    h("div", { class: 'vertical-wrapper' },
                        h("div", { class: 'vertical-inner', ref: (el) => { this.verticalScroll = el; }, onScroll: () => this.scrollY() },
                            h("div", { style: { height: `${rowDimension.get('realSize')}px`, width: `${colDimension.get('realSize')}px` } },
                                h("slot", { name: 'content' }))))))
        ];
    }
    static get is() { return "revogr-viewport-scrollable"; }
    static get methods() { return {
        "scrollX": {
            "complexType": {
                "signature": "(x?: number) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "scrollY": {
            "complexType": {
                "signature": "(y?: number) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
