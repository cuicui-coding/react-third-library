import { get, set, observable, values, autorun , toJS} from "mobx"

debugger
let message = observable(['kina', 'baber'])
console.log(Array.isArray(message))
autorun(() => {
    console.log(message);
    console.log(Array.isArray(message))
})
message[1] = "Jennifer";

