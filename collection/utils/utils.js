export function range(size, startAt = 0) {
    const res = [];
    const end = startAt + size;
    for (let i = startAt; i < end; i++) {
        res.push(i);
    }
    return res;
}
export function findPositionInArray(el, compareFn) {
    return (function (arr) {
        let m = 0;
        let n = arr.length - 1;
        while (m <= n) {
            const k = (n + m) >> 1;
            const cmp = compareFn(el, arr[k]);
            if (cmp > 0) {
                m = k + 1;
            }
            else if (cmp < 0) {
                n = k - 1;
            }
            else {
                return k;
            }
        }
        return -m - 1;
    })(this);
}
export function pushSorted(arr, el, fn) {
    arr.splice(findPositionInArray.bind(arr)(el, fn), 0, el);
    return arr;
}
// (arr1[index1] < arr2[index2])
function simpleCompare(el1, el2) {
    return el1 < el2;
}
export function mergeSortedArray(arr1, arr2, compareFn = simpleCompare) {
    const merged = [];
    let index1 = 0;
    let index2 = 0;
    let current = 0;
    while (current < (arr1.length + arr2.length)) {
        let isArr1Depleted = index1 >= arr1.length;
        let isArr2Depleted = index2 >= arr2.length;
        if (!isArr1Depleted && (isArr2Depleted || compareFn(arr1[index1], arr2[index2]))) {
            merged[current] = arr1[index1];
            index1++;
        }
        else {
            merged[current] = arr2[index2];
            index2++;
        }
        current++;
    }
    return merged;
}
export function getScrollbarWidth(doc) {
    // Creating invisible container
    const outer = doc.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    doc.body.appendChild(outer);
    // Creating inner element and placing it in the container
    const inner = doc.createElement('div');
    outer.appendChild(inner);
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}
