/**
* Storing pre-calculated
* Dimension information and sizes
*/
import { ObservableMap } from '@stencil/store';
declare const rowsStore: ObservableMap<DimensionSettingsState>;
declare const colsStore: ObservableMap<DimensionSettingsState>;
declare function getCurrentState(type: DimensionType): DimensionSettingsState;
declare function setSettings(data: number, dimensionType: DimensionType): void;
declare function setRealSize(count: number, dimensionType: DimensionType): void;
declare function setDimensionSize(sizes: ViewSettingSizeProp, dimensionType: DimensionType): void;
export { rowsStore, colsStore, setDimensionSize, setRealSize, setSettings, getCurrentState };
