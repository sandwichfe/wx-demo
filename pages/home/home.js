import list from './data/index';
Page({
    data: {
        list,
    },
    onLoad(options) {
         const { path, q } = options;
        console.log(path);
        if (q) {
            const str = this.getQueryByUrl(decodeURIComponent(q));
            console.log(str, str.page);
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }
      },
    clickHandle(e) {
        let { name, path = '' } = e.detail.item;
        // add
        if(name == 'Button'){
          // wx.requestSubscribeMessage({
          //   tmplIds: ['5oP0dFBcEpixmI6tahxCiC1CKvlG2eWXIs0jDO6lu-Y'],
          //   success (res) { }
          // })
          wx.login({
            //成功放回
            success:(res)=>{
              console.log(res);
              let code=res.code
              let appid = '22';
              let srt = '11';
              wx.request({
                url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${srt}&js_code=${code}&grant_type=authorization_code`,
                success:(res)=>{
                  console.log(res);
                  userInfo.openid=res.data.openid
                  //获取到你的openid
                  console.log(userInfo.openid);
                }
              })
          
            }
          })



        }
        // end
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },
    onShareAppMessage() {
        return {
            title: 'TDesign UI',
            path: '/pages/home/home',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
});
