import { makeAutoObservable } from "mobx";
interface IUserInfo {
	username: string;
	password: string;
}

class AuthStore {
	username = "";
	hasLogin = false;
	constructor() {
		makeAutoObservable(this);
	}
	setUp(params: IUserInfo) {
		const { username, password } = params;
		return new Promise(async (resolve, reject) => {
			try {
				const user = new AV.User();
				user.setUsername(username);
				user.setPassword(password);
				const res = await user.signUp();
				resolve(res);
				console.log(`注册成功。objectId：${res.id}`);
			} catch (err) {
				reject(err);
			}
		});
	}
	login(params: IUserInfo) {
		const { username, password } = params;
		const that = this;
		console.log(that);
		return new Promise(async (resolve, reject) => {
			const user = await AV.User.logIn(username, password);
			// 初始化信息
			that.hasLogin = true;
			that.username = user.attributes.username;

			resolve(user);
		});
	}
	logout() {
		// 退出登录
		AV.User.logOut();
		// 状态清空
		this.hasLogin = false;
		this.username = "";
	}
}

export default new AuthStore();
