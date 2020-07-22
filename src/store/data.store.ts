/**
* Storing initial data and column information
*/

import {createStore, ObservableMap} from '@stencil/store';
import size from 'lodash/size';

import {setViewport} from './viewport.store';
import {setRealSize} from './dimension.store';
import {ColumnData, DataSourceState, DataType} from "../interfaces";
import {setStore} from "./helpers";

const store: ObservableMap<DataSourceState> = createStore({
  data: [],
  columns: []
});

function setColumn(data: ColumnData): void {
  const cols: number = size(data);
  setStore(store, { columns: data });

  setViewport({ realCount: cols }, 'col');
  setRealSize(cols, 'col' );
}
function setData(data: DataType[]): void {
  const rows: number = size(data);
  setStore(store, { data });

  setViewport({ realCount: rows }, 'row');
  setRealSize(rows, 'row' );
}

export {setColumn, setData};
export default store;
