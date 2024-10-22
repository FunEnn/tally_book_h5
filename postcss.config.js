import postcssPxtorem from "postcss-pxtorem";

export default {
    "plugins": [
        postcssPxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
        })
    ]
}