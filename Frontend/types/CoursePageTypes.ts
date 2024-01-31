export interface ICourseData {
    _id: string;
    title: string;
    thumbnail: string;
    categoryName: string;
    createdAt: string;
    price : number;
}

export interface IFilterOption {
    optionName : string,
    optionQueryCode : any
}

export interface IFilterResponse {
    filterName : string;
    filterOptionList : IFilterOption[]
}
