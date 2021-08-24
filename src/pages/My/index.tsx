import {
	Card,
	WingBlank,
	WhiteSpace,
	Result,
	Icon,
	Modal,
	Button,
	Toast,
	List,
} from "antd-mobile";
import { observer } from "mobx-react";
import Store from "../../store";
import "./style.css";
interface IProps {
	selected: boolean;
}
const My = (props: IProps) => {
	const { authStore, progressStore } = Store;
	const myImg = (src: string) => (
		<img src={src} className="spe am-icon am-icon-md" alt="" />
	);

	/**
	 * 点击注册弹窗中的 “提交注册”
	 * @param username
	 * @param password
	 * @returns
	 */
	const onClickSetup = (username: string, password: string) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log(username, password);
			Toast.loading("Setting up...", 0, () => {});
			try {
				const res = await authStore.setUp({ username, password });
				console.log(res);
				Toast.hide();
				Toast.success("注册成功", 1, async () => {
					// leancloud登录
					await authStore.login({ username, password });

					// 更新interviewList数据
					progressStore.getInterviewList();

					resolve();
				});
			} catch (err) {
				Toast.hide();
				Toast.fail("用户名重复或其他错误，请重新尝试", 1, () => {
					reject();
				});
			}
		});
	};

	/**
	 * 点击登录弹窗中的 “登录”
	 * @param username
	 * @param password
	 * @returns
	 */
	const onClickLogin = (username: string, password: string) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log(username, password);
			try {
				Toast.loading("登录中...", 0, () => {});

				const res = await authStore.login({ username, password });
				console.log(res);
				Toast.hide();
				Toast.success("登录成功", 1);

				// 更新interviewList数据
				progressStore.getInterviewList();
				resolve();
			} catch (err) {
				Toast.hide();
				Toast.fail("用户信息错误，请重试", 1);
				reject();
			}
		});
	};

	/**
	 * 点击登出
	 */
	const onClickLogout = () => {
		authStore.logout();
		progressStore.clearList();
	};

	/**
	 * 点击设置
	 */
	const onClickSettings = () => {
		console.log("settings");
	};

	/**
	 * 点击注册按钮
	 */
	const onClickSetupBtn = () => {
		let setupModal = Modal.prompt(
			<div>
				注册
				<span style={{ float: "right" }} onClick={() => setupModal.close()}>
					🔙
				</span>
			</div>,
			"请输入账号和密码",
			[
				{ text: "取消" },
				{
					text: "提交注册",
					onPress: (username, password) => onClickSetup(username, password),
				},
			],
			"login-password",
			undefined,
			["请输入账号", "输入密码"]
		);
	};

	/**
	 * 点击登录按钮
	 */
	const onClickLoginBtn = () => {
		let loginModal = Modal.prompt(
			<div>
				登录
				<span style={{ float: "right" }} onClick={() => loginModal.close()}>
					🔙
				</span>
			</div>,
			"请输入账号和密码",
			[
				{ text: "取消" },
				{
					text: "登录",
					onPress: (username, password) => onClickLogin(username, password),
				},
			],
			"login-password",
			undefined,
			["请输入账号", "输入密码"]
		);
	};

	return (
		<div>
			<WingBlank size="lg">
				<WhiteSpace size="lg" />
				{authStore.hasLogin ? (
					<Card>
						<Card.Header
							className="card-head"
							title={<div className="name">{authStore.username}</div>}
							thumb={<div className="head" />}
							extra={
								<div className="position" onClick={onClickLogout}>
									退出 <Icon type="right" />
								</div>
							}
						/>
						<Card.Body>
							<div>统计信息</div>
							<Result
								img={myImg(
									"https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg"
								)}
								message={`面试中：3家`}
							/>
							<Result
								img={
									<Icon
										type="check-circle"
										className="spe"
										style={{ fill: "#1F90E6" }}
									/>
								}
								message={`面试成功：2家`}
							/>
							<Result
								img={
									<Icon
										type="cross-circle-o"
										className="spe"
										style={{ fill: "#F13642" }}
									/>
								}
								message={`面试失败：1家`}
							/>
						</Card.Body>
						<Card.Footer
							content={
								<List.Item
									onClick={onClickSettings}
									thumb={<div className="settings"></div>}
								>
									设置
								</List.Item>
							}
						/>
					</Card>
				) : (
					<Card className="fake-card">
						<Card.Header
							className="card-head"
							title={<div className="name">{"请先登录！"}</div>}
							thumb={<div className="head fake-head"></div>}
						/>
						<Card.Body>
							<Button type="ghost" className="my-btn" onClick={onClickSetupBtn}>
								setup
							</Button>
							<Button
								type="primary"
								className="my-btn"
								onClick={onClickLoginBtn}
							>
								login
							</Button>
						</Card.Body>
					</Card>
				)}

				<WhiteSpace size="lg" />
			</WingBlank>
		</div>
	);
};
export default observer(My);
