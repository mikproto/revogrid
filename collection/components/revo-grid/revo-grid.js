import { Component, Prop, h, Watch, Element } from '@stencil/core';
import { setData, setColumn } from '../../store/data.store';
import { setDimensionSize, setSettings } from '../../store/dimension.store';
import { setViewport } from '../../store/viewport.store';
const initialSettings = {
    defaultColumnSize: 80,
    defaultRowSize: 30,
    frameSize: 10,
    dimensions: undefined
};
export class RevoGrid {
    constructor() {
        this.dimensions = {};
        this.settings = initialSettings;
        // data is array of objects
        this.source = [];
        // if source provided as object header 'prop' will link to the object field
        this.columns = [];
    }
    onSettingsChange(newVal, oldVal) {
        if (!oldVal || newVal.frameSize !== oldVal.frameSize) {
            setViewport({ frameOffset: newVal.frameSize || 0 }, 'row');
            setViewport({ frameOffset: newVal.frameSize || 0 }, 'col');
        }
        if (!oldVal || newVal.defaultRowSize !== oldVal.defaultRowSize) {
            setSettings(this.settings.defaultRowSize, 'row');
        }
        if (!oldVal || newVal.defaultColumnSize !== oldVal.defaultColumnSize) {
            setSettings(this.settings.defaultColumnSize, 'col');
        }
    }
    dataChanged(newVal) {
        setData(newVal);
    }
    columnChanged(newVal) {
        setColumn(newVal);
    }
    async componentWillLoad() {
        this.onSettingsChange(this.settings);
        setDimensionSize(this.dimensions.row, 'row');
        setDimensionSize(this.dimensions.col, 'col');
        this.columnChanged(this.columns);
        this.dataChanged(this.source);
    }
    async componentDidLoad() {
        if (!('ResizeObserver' in window)) {
            // Loads polyfill asynchronously, only if required.
            const module = await import('@juggle/resize-observer');
            window.ResizeObserver = module.ResizeObserver;
        }
        this.resizeObserver = new ResizeObserver(async () => {
            setViewport({ virtualSize: this.element.clientHeight }, 'row');
            setViewport({ virtualSize: this.element.clientWidth }, 'col');
            await this.viewport.scrollX();
            await this.viewport.scrollY();
        });
        this.resizeObserver.observe(this.element);
    }
    componentDidUnload() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    render() {
        return h("revogr-viewport-scrollable", { class: 'viewport', ref: (el) => { this.viewport = el; } },
            h("revogr-header", { slot: 'header', class: 'header' }),
            h("revogr-data", { slot: 'content', class: 'viewport-layer' }));
    }
    static get is() { return "revo-grid"; }
    static get originalStyleUrls() { return {
        "$": ["revo-grid.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["revo-grid.css"]
    }; }
    static get properties() { return {
        "dimensions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Partial<MultiDimensionAction>",
                "resolved": "{ col?: ViewSettingSizeProp; row?: ViewSettingSizeProp; }",
                "references": {
                    "Partial": {
                        "location": "global"
                    },
                    "MultiDimensionAction": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "{}"
        },
        "settings": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "InputSettings",
                "resolved": "{ defaultColumnSize: number; defaultRowSize: number; frameSize: number; dimensions?: { col?: ViewSettingSizeProp; row?: ViewSettingSizeProp; }; }",
                "references": {
                    "InputSettings": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "initialSettings"
        },
        "source": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DataType[]",
                "resolved": "DataType[]",
                "references": {
                    "DataType": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "columns": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ColumnData",
                "resolved": "ColumnDataSchema[]",
                "references": {
                    "ColumnData": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "settings",
            "methodName": "onSettingsChange"
        }, {
            "propName": "source",
            "methodName": "dataChanged"
        }, {
            "propName": "columns",
            "methodName": "columnChanged"
        }]; }
}
