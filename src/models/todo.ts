export interface ITodo {
    text: string;
    complete: boolean;
    comments: string[]
    customData?:ICustomData
    fieldValue?:any
}
export interface Comment {
    isOpen: boolean;
    index: number;
}

export interface ICustomData{
    fieldName:string;
    fieldType:string;

}