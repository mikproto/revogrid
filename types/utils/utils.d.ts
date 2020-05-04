export declare function range(size: number, startAt?: number): number[];
export declare function findPositionInArray<T>(this: T[], el: T, compareFn: (el: T, el2: T) => number): number;
export declare function pushSorted<T>(arr: T[], el: T, fn: (el: T, el2: T) => number): T[];
export declare function mergeSortedArray<T>(arr1: T[], arr2: T[], compareFn?: (el: T, el2: T) => boolean): T[];
export declare function getScrollbarWidth(doc: Document): number;
