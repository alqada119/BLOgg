export interface responsefunctions{
    GET?:Function,
    POST?: Function
    PUT?: Function
    DELETE?: Function
}
export interface blog{
    postId:String,
    post:String,
    postuser:String,
    likes:Number
}