import { DimensionSettingsState, PositionItem, ViewportStateItems, VirtualPositionItem } from "../interfaces";
/**
* Update items based on new scroll position
* If viewport wasn't changed fully simple recombination of positions
* Otherwise rebuild viewport items
*/
export declare function getUpdatedItemsByPosition(pos: number, items: ViewportStateItems, realCount: number, virtualSize: number, dimension: DimensionSettingsState): ViewportStateItems;
export declare function addMissingItems(firstItem: PositionItem, realCount: number, virtualSize: number, existingCollection: ViewportStateItems, dimension: DimensionSettingsState): ViewportStateItems;
declare function isActiveRange(pos: number, item: PositionItem | undefined): boolean;
declare function getFirstItem(s: ViewportStateItems): VirtualPositionItem | undefined;
declare function getLastItem(s: ViewportStateItems): VirtualPositionItem;
export { isActiveRange, getFirstItem, getLastItem };
