interface TableConfig {
    // url: string,
    // payload: {
    //     pageNumber: number,
    //     pageSize: number
    // },
    data: Data
    options: ('index' | 'pagination' | 'selectable') [],
    columns: ColumnHeader[]
}

interface Data {
    list: KeyValue[],
    pageNumber: number,
    pageSize: number,
    total: number
}

interface ColumnHeader {
    name: string, 
    key: string, 
    size?: number, 
    sort?: boolean
}

interface KeyValue {
    [key: string]: string
}

export type { TableConfig, KeyValue, ColumnHeader }