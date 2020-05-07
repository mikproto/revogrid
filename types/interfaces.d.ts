export declare type DimensionType = 'col' | 'row';
export interface MultiDimensionAction {
    col: ViewSettingSizeProp;
    row: ViewSettingSizeProp;
}
export declare type ColumnDataSchemaModel = {
    prop: ColumnProp;
    model: DataType;
};
export interface ColumnDataSchema {
    prop: ColumnProp;
    name?: DataFormat;
    cellTemplate?: Function;
}
export declare type ColumnProp = string | number;
export declare type DataFormat = string;
export declare type CellTemplateFunc<T> = (h: (sel: string, data?: object, text?: string) => T, props: ColumnDataSchemaModel) => T;
export declare type ColumnData = ColumnDataSchema[];
export declare type DataType = {
    [key: string]: DataFormat;
};
export interface DataSourceState {
    data: DataType[];
    columns: ColumnDataSchema[];
}
export interface ViewportStateItems {
    items: VirtualPositionItem[];
    itemIndexes: number[];
}
export interface ViewportState extends ViewportStateItems {
    realCount: number;
    frameOffset: number;
    virtualSize: number;
}
export declare type ViewSettingSizeProp = {
    [index: string]: number;
};
export interface VirtualPositionItem extends PositionItem {
    size: number;
}
export interface PositionItem {
    itemIndex: number;
    start: number;
    end: number;
}
export interface DimensionSettingsState {
    indexes: number[];
    positionIndexes: number[];
    positionIndexToCoordinate: {
        [position: number]: PositionItem;
    };
    itemIndexToCoordinate: {
        [position: number]: PositionItem;
    };
    sizes: ViewSettingSizeProp;
    realSize: number;
    originItemSize: number;
}
export declare type InputSettings = {
    defaultColumnSize: number;
    defaultRowSize: number;
    frameSize: number;
    dimensions?: {
        col?: ViewSettingSizeProp;
        row?: ViewSettingSizeProp;
    };
};
