page({
        onShareAppMessage(){
            return {
                title:'小程序测试',
                page: 'page/api-test/test-index/test-index'
            }
        },
        data:{
            cellist:[
                {title:'用户信息获取',url:'api-test/test-user/test-user',remark:'pages/api-test/test-user/test-user'}
            ]
        }
    }
);
