export interface IData {
    name: string,
    checked: boolean
}

export interface ICategories {
    name: string,
    items: IData[]
}

export var data : ICategories[] = [] ;