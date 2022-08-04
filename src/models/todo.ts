export interface ITodo {
    text: string;
    complete: boolean;
    comments: string[]
}
export interface Comment {
    isOpen: boolean;
    index: number;
}