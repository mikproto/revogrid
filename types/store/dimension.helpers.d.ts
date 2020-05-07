import { DimensionSettingsState, ViewSettingSizeProp } from "../interfaces";
/**
* Pre-calculation dimension sizes and sizes for each cell
*/
export declare function calculateDimensionData(state: DimensionSettingsState, newSizes: ViewSettingSizeProp): Partial<DimensionSettingsState>;
