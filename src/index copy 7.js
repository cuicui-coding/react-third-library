import { get, set, observable, values, autorun } from "mobx"

const twitterUrls = observable.object({
    "John": "twitter.com/johnny"
})

autorun(() => {
    console.log(get(twitterUrls, "Sara")) // get 可以追踪尚未存在的属性
})

autorun(() => {
    console.log("All urls: " + values(twitterUrls).join(", "))
})

set(twitterUrls, { "Sara" : "twitter.com/horsejs"})


