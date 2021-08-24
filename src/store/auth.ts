import { makeAutoObservable } from "mobx";
interface IUserInfo {
	username: string;
	password: string;
}

class AuthStore {
	username = "";
	hasLogin = false;
	hasShowPassModal = false;
	hasShow垃圾Modal = false;
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
	setHasShowPassModal(hasShowPassModal: boolean) {
		this.hasShowPassModal = hasShowPassModal;
	}
	setHasShow垃圾Modal(flag: boolean) {
		this.hasShow垃圾Modal = flag;
	}
}

export default new AuthStore();
