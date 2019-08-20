function request(url, data = {}, method = 'POST') {
    return new Promise((resolve,reject) => {
        wx.rquest({
        url: url,
        data: data,
        method: method,
        header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type':'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        success: function(res) {
           if(res.code){}
        },
        fail: function(e) {
          reject(e)
        }
      })
    })
}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime,
    request: request
}