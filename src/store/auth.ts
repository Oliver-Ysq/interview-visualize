import { makeAutoObservable } from "mobx"
interface IUserInfo {
  username: string,
  password: string,
}

class AuthStore {
  username = ''
  hasLogin = false
  constructor() {
    makeAutoObservable(this)
  }
  setUp(params: IUserInfo) {
    const { username, password } = params
    return new Promise((resolve, reject) => {
      const user = new AV.User()
      user.setUsername(username);
      user.setPassword(password);
      user.signUp()
        .then((user: any) => {
          resolve(user)
          console.log(`注册成功。objectId：${user.id}`);
        })
        .catch((error: any) => { reject(error) });
    })
  }
  login(params: IUserInfo) {
    const { username, password } = params
    const that = this
    console.log(that)
    return new Promise((resolve, reject) => {
      AV.User.logIn(username, password)
        .then((user: any) => {
          // 登录成功
          const { attributes: { username } } = user

          that.hasLogin = true
          that.username = username

          resolve(user)
        })
        .catch((error: any) => {
          // 登录失败（可能是密码错误）
          reject(error)
        });
    })
  }
  // resetPwd(params: IResetPwd) {
  //   const { code, password } = params
  //   return new Promise((resolve, reject) => {
  //     AV.User.resetPasswordBySmsCode(code, password).then((res: any) => {
  //       // 密码重置成功
  //       resolve(res)
  //     }, (error: any) => {
  //       // 验证码不正确
  //       reject(error)
  //     });
  //   })
  // }
  logout() {
    // 退出登录
    AV.User.logOut()
    // 状态清空 
    this.hasLogin = false
    this.username = ''

  }

  // 发送验证码
  // sendCode(phoneNumber: string) {
  //   AV.Cloud.requestSmsCode('+86' + phoneNumber)
  //     .then((res: any) => console.log(res))
  //     .catch((err: any) => console.log(err))
  // }
}

export default AuthStore
