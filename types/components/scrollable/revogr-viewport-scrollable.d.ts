export declare class RevogrViewportScrollable {
    private verticalScroll;
    private horizontalScroll;
    private verticalVirtScroll;
    private header;
    private scrollSize;
    private preventArtificialScroll;
    scrollX(x?: number): Promise<void>;
    scrollY(y?: number): Promise<void>;
    private scrollVirtY;
    componentWillLoad(): void;
    componentDidRender(): void;
    render(): any[];
}
