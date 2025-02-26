export function validateChat(message:string){
    if(message.length < 50|| message === ""|| message === " "){
        return false
    }else{
        return true

    }
}