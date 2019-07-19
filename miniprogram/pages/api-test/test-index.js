Page({
    onShareAppMessage(){
        return {
            title:'小程序用户测试',
            page: 'page/api-test/test-user/test-user'
        }
    },
    data:{
        cellList: [
            {title: '用户信息获取',url:'test-user/test-user',remark:'pages/api-test/test-user/test-user'},
            {title: '模板消息',url:'test-user/test-user',remark:'pages/api-test/test-user/test-user'}
        ]
    }
})
