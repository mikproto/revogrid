export declare class RevoGrid {
    private resizeObserver;
    private viewport;
    element: HTMLElement;
    dimensions: Partial<MultiDimensionAction>;
    settings: InputSettings;
    onSettingsChange(newVal: InputSettings, oldVal?: Partial<InputSettings>): void;
    source: DataType[];
    dataChanged(newVal: DataType[]): void;
    columns: ColumnData;
    columnChanged(newVal: ColumnData): void;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    componentDidUnload(): void;
    render(): any;
}
