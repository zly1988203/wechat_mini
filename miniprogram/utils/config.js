var serverUtil = {
    testUrl: 'http://10.1.21.250:8084',
    devUrl: 'https://www.easy-mock.com/mock/5cda5548e6f3ff49f1a13913/TSP_passenger_api',
    releaseUrl: '',
    token: 'YzQxN0VMTnFwZHh3UFlwRFoxdG1mZDFNc3dTdTRsdWhscE9XR0RVUS9WYUpmWE09',
    timestamp: new Date().getTime(),
    appId: '100005',
    APP_KEY: 'TAjN^AHp^7smQ2bhMoL&1DRK*mAKTA1no9zsepR4ATSxMwchksl3Uv1f5#o&hRx5',
    clientType: '4',
    appVersion: '1.1',
    deviceId: '1',
    wechatLogin: '1', //用于区分微信乘客端和APP端
    loginType: '2',
    adDomain: 'osp2.zhongjiaochuxing.com'
}

const urlList = {
    // 刷新token
    refreshTokeUrl: serverUtil.devUrl + '/refreshToke',//token
    // 登录和首页轮播
    loginUrl: serverUtil.devUrl + '/wxappLogin',//登录
    advertPicListUrl: serverUtil.devUrl + '/advertPicList',//轮播列表
    getOpenAreas: serverUtil.devUrl + '/busline/optimized/getOpenAreas',
    getRegionLineArea: serverUtil.devUrl + '/innerCity/optimize/getRegionLineArea',
    serverUtil:serverUtil
}
const apiTestHost= 'https://miniprogram.local.olayueche.com';
const apiTestAppId = 'wxd50b46e68d1958be';
const apiTestUrl= {
    apiTestHost,
    apiTestAppId,
    openIdUrl:`${apiTestHost}/wechat/mini/user/${apiTestAppId}/openid`,
    userLoginUrl:`${apiTestHost}/wechat/mini/user/${apiTestAppId}/login`,
    userInfoUrl:`${apiTestHost}/wechat/mini/user/${apiTestAppId}/info`,
    userPhoneUrl:`${apiTestHost}/wechat/mini/user/${apiTestAppId}/phone`
}

module.exports = {urlList,apiTestUrl};
