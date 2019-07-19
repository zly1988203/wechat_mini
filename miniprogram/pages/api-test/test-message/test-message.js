Page({
    data: {
        loading: ''
    },
    sender: function () {
        console.log('click sender ...')
        this.setData({loading: 'loading'})



        const that = this;
        setTimeout(function () {
            that.setData({loading: ''})
        }, 3000);
    }
})
