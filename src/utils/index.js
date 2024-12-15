import axios from './axios'
import {
    baseUrl
} from 'config'
const MODE =
    import.meta.env.MODE // 环境变量

export const get = axios.get

export const post = axios.post

export const typeMap = {
    1: {
        icon: 'canyin'
    },
    2: {
        icon: 'fushi'
    },
    3: {
        icon: 'jiaotong'
    },
    4: {
        icon: 'riyong'
    },
    5: {
        icon: 'gouwu'
    },
    6: {
        icon: 'xuexi'
    },
    7: {
        icon: 'yiliao'
    },
    8: {
        icon: 'lvxing'
    },
    9: {
        icon: 'renqing'
    },
    10: {
        icon: 'qita'
    },
    11: {
        icon: 'gongzi'
    },
    12: {
        icon: 'jiangjin'
    },
    13: {
        icon: 'zhuanzhang'
    },
    14: {
        icon: 'licai'
    },
    15: {
        icon: 'tuikuang'
    },
    16: {
        icon: 'qita'
    }
}

export const REFRESH_STATE = {
    normal: 0, // 普通
    pull: 1, // 下拉刷新（未满足刷新条件）
    drop: 2, // 释放立即刷新（满足刷新条件）
    loading: 3, // 加载中
    success: 4, // 加载成功
    failure: 5, // 加载失败
};

export const LOAD_STATE = {
    normal: 0, // 普通
    abort: 1, // 中止
    loading: 2, // 加载中
    success: 3, // 加载成功
    failure: 4, // 加载失败
    complete: 5, // 加载完成（无新数据）
};

export const imgUrlTrans = (url) => {
    if (url && url.startsWith('http')) {
        return url
    } else {
        url = `${MODE == 'development' ? 'localhost:7001' : baseUrl}${url}`
        return url
    }
}

// 防抖
export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 节流
export const throttle = (func, delay) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
        if (!lastRan) {
            func.apply(this, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= delay) {
                    func.apply(this, args)
                    lastRan = Date.now()
                }
            }, delay - (Date.now() - lastRan))
        }
    }
}