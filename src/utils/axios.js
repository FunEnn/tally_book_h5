import axios from "axios";
import {
    Toast
} from "zarm";

const MODE =
    import.meta.env.MODE // 环境变量

//设置请求的基础路径                   
axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://127.0.0.1:7001'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 配置 post 请求，使用的请求体，这里默认设置成 application/json 的形式。
// interceptors 拦截器 拦截每一次请求
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.show('服务器异常！')
        return Promise.reject(res)
    }
    // //判断请求内容，如果非 200，则提示错误信息
    if (res.data.code !== 200) {
        if (res.data.msg) Toast.show(res.data.msg)
        //401 的话，就是没有登录的用户
        if (res.data.code === 401) {
            window.location.href = '/login'
        }
        // 则 return res.data
        return Promise.reject(res.data)
    }

    return res.data
})

export default axios