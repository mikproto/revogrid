/**
* Store is responsible for visible
* Viewport information for each dimension
* Redraw items during scrolling
*/
import { ObservableMap } from '@stencil/store';
import { DimensionType, ViewportState, ViewSettingSizeProp } from "../interfaces";
declare const rowsStore: ObservableMap<ViewportState>;
declare const colsStore: ObservableMap<ViewportState>;
declare function setViewport(data: Partial<ViewportState>, dimensionType: DimensionType): void;
declare function setViewPortCoordinate(position: number, dimensionType: DimensionType): void;
declare function setViewPortDimension(sizes: ViewSettingSizeProp, dimensionType: DimensionType): void;
export { setViewport, setViewPortCoordinate, setViewPortDimension, rowsStore, colsStore };
