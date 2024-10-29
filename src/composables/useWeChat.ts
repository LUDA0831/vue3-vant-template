import * as wx from '@tybys/jweixin'

export type ShareConfig = Pick<wx.UpdateAppMessageShareDataOptions, 'title' | 'desc' | 'imgUrl'>

export function useWeChat() {
  const ready = async () => {
    return new Promise<void>((resolve) => {
      wx.ready(resolve)
    })
  }
  const init = async () => {
    // TODO 替换成自己的配置
    // const url = window.location.href.split('#')[0] // 获取当前url然后传递给后台获取授权和签名信息
    // const { data } = await useApi().pay.jsSdkConfig({ url })
    // if (!data)
    //   return

    // wx.config({ ...data })
    // return data
  }

  const share = async (data?: ShareConfig) => {
    if (!isWechat || import.meta.env.DEV)
      return
    const uri = window.location.href.replace(/\?code.*?STATE/g, '')
    await init()
    await ready()
    const shareData: wx.UpdateAppMessageShareDataOptions = {
      link: uri,
      title: 'vue3-vant-template',
      desc: 'vue3-vant-template',
      imgUrl: 'https://cn.vitejs.dev/logo.svg',
      ...data,
    }
    wx.updateAppMessageShareData(shareData)
  }

  const payment = async (data: wx.ChooseWXPayOptions) => {
    if (!isWechat) {
      return Promise.reject(new Error('请在微信中打开网页!'))
    }
    await init()
    await ready()
    return new Promise((resolve, reject) => {
      wx.chooseWXPay({
        timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
        paySign: data.paySign, // 支付签名
        success(res) {
          // 支付成功后的回调函数
          resolve(res)
        },
        fail(e) {
          reject(e)
        },
      })
    })
  }
  return { share, isWechat, payment }
}
