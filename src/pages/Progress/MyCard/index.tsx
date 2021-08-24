import {
	Steps,
	Card,
	WingBlank,
	WhiteSpace,
	Button,
	List,
	Icon,
	Modal,
} from "antd-mobile";
import 垃圾 from "../../assets/垃圾.png";
import "./style.css";
import Store from "../../../store/index";
import { IInterviewListItem } from "../../../store/progress";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { observer } from "mobx-react";
import { colorMap, JobStatus } from "../../../utils/constant";
import { formatDate, getIconUrl } from "../../../utils/util";
const Step = Steps.Step;
const IconMap = {
	[JobStatus.FAIL]: "cross-circle",
	[JobStatus.ING]: "right",
	[JobStatus.SUCC]: "check-circle-o",
};

type IProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	setObjId: Dispatch<SetStateAction<string>>;
} & IInterviewListItem;

const MyCard = (item: IProps) => {
	const [showDetail, setShowDetail] = useState(false);
	const { progressStore, authStore } = Store;

	const showConfirmModal = () => {
		return new Promise((resolve) => {
			if (authStore.hasShowPassModal) resolve(true);
			else {
				Modal.alert(
					"提示",
					<div>
						<div>pass & fail 操作不可逆</div>
						<div>确认当前轮次面试已通过or失败吗？</div>
					</div>,
					[
						{ text: "取消", onPress: () => resolve(false) },
						{
							text: "确认",
							onPress: () => {
								resolve(true);
								authStore.setHasShowPassModal(true);
							},
						},
					]
				);
			}
		});
	};

	const show垃圾Modal = async () => {
		return new Promise((resolve) => {
			Modal.alert("提示", <div>确认要删除该投递吗？</div>, [
				{ text: "取消", onPress: () => resolve(false) },
				{
					text: "确认",
					onPress: () => {
						resolve(true);
					},
				},
			]);
		});
	};

	const onClickDetail = useCallback(() => {
		setShowDetail(!showDetail);
	}, [showDetail, setShowDetail]);
	const onClick垃圾 = async () => {
		const res = await show垃圾Modal();
		if (res) {
			progressStore.deleteInterviewListItem(item.objectId);
		}
	};
	const onClickPass = async () => {
		const res = await showConfirmModal();
		if (res) {
			let total =
				item.totalRounds +
				(item.needHRinterview ? 1 : 0) +
				(item.needWrittenExam ? 1 : 0);
			progressStore.pass(item.objectId, item.current, total, item.jobStatus);
		}
	};
	const onClickFail = async () => {
		const res = await showConfirmModal();
		if (res) progressStore.fail(item.objectId, item.jobStatus);
	};
	const onClickEdit = () => {
		if ([JobStatus.FAIL, JobStatus.SUCC].includes(item.jobStatus)) return;
		console.log(1);
		item.setObjId(item.objectId);
		item.setShowModal(true);
		setShowDetail(false);
	};

	const renderSteps = () => {
		return (
			<div className="steps-wrapper">
				<Steps size="large" current={item.current} direction="vertical">
					{item.needWrittenExam ? (
						<Step
							title="笔试"
							description={
								<div className="time-text">
									{item.timeList.written &&
										formatDate(item.timeList.written.time)}
								</div>
							}
						/>
					) : null}
					{item.totalRounds >= 1 ? (
						<Step
							title="一面"
							description={
								<div className="time-text">
									{item.timeList.interview[0] &&
										formatDate(item.timeList.interview[0].time)}
								</div>
							}
							key={"1面"}
						/>
					) : null}
					{item.totalRounds >= 2 ? (
						<Step
							title="二面"
							description={
								<div className="time-text">
									{item.timeList.interview[1] &&
										formatDate(item.timeList.interview[1].time)}
								</div>
							}
							key={"2面"}
						/>
					) : null}
					{item.totalRounds >= 3 ? (
						<Step
							title="三面"
							description={
								<div className="time-text">
									{item.timeList.interview[2] &&
										formatDate(item.timeList.interview[2].time)}
								</div>
							}
							key={"3面"}
						/>
					) : null}
					{item.totalRounds >= 4 ? (
						<Step
							title="四面"
							description={
								<div className="time-text">
									{item.timeList.interview[3] &&
										formatDate(item.timeList.interview[3].time)}
								</div>
							}
							key={"4面"}
						/>
					) : null}
					{item.totalRounds >= 5 ? (
						<Step
							title="五面"
							description={
								<div className="time-text">
									{item.timeList.interview[4] &&
										formatDate(item.timeList.interview[4].time)}
								</div>
							}
							key={"5面"}
						/>
					) : null}
					{item.totalRounds >= 6 ? (
						<Step
							title="六面"
							description={
								<div className="time-text">
									{item.timeList.interview[5] &&
										formatDate(item.timeList.interview[5].time)}
								</div>
							}
							key={"6面"}
						/>
					) : null}
					{item.needHRinterview ? (
						<Step
							title="HR面"
							description={
								<div className="time-text">
									{item.timeList.hr && formatDate(item.timeList.hr.time)}
								</div>
							}
						/>
					) : null}
				</Steps>
				{!!item.linking ? (
					<div className="linking">
						链接:{" "}
						<a target="_blank" rel="noreferrer" href={item.linking}>
							{item.linking}
						</a>{" "}
					</div>
				) : null}
				<div className="close-icon" onClick={onClickDetail}>
					收起详情
				</div>
			</div>
		);
	};

	return (
		<WingBlank size="lg">
			<WhiteSpace size="lg" />
			<Card>
				<Card.Header
					className="cardTitle"
					title={
						<div>
							<span style={{ fontWeight: "bold" }}>{item.companyName}</span>
							<span style={{ fontSize: 13, marginLeft: 4 }}>
								{item.positionName} -<span>{item.type}</span>
							</span>
						</div>
					}
					thumb={
						<img
							className="card-icon"
							alt="company-icon"
							src={getIconUrl(item.companyName)}
						></img>
					}
					extra={
						<img
							className="card-icon"
							alt="删除"
							src={垃圾}
							onClick={onClick垃圾}
						></img>
					}
				/>

				<Card.Body className="card-body">
					{!showDetail ? (
						<List>
							<List.Item
								onClick={onClickDetail}
								extra={<div>点击查看详情</div>}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Icon
										type={IconMap[item.jobStatus]}
										size="xxs"
										color={colorMap[item.jobStatus]}
										style={{ marginRight: 6 }}
									></Icon>
									{progressStore.getNowState(item)}{" "}
									<span className="status-text">{item.jobStatus}</span>
								</div>
							</List.Item>
						</List>
					) : (
						renderSteps()
					)}
					<WhiteSpace size="md" />
				</Card.Body>

				<Card.Footer
					content={
						<>
							<Button
								size="small"
								style={{ width: 80, float: "left" }}
								type="ghost"
								onClick={onClickEdit}
							>
								edit
							</Button>
							<Button
								size="small"
								style={{ width: 80, float: "right" }}
								type="primary"
								onClick={onClickPass}
							>
								pass
							</Button>
							<Button
								size="small"
								style={{
									width: 80,
									float: "right",
									marginRight: 8,
								}}
								type="warning"
								onClick={onClickFail}
							>
								fail
							</Button>
						</>
					}
				/>
			</Card>
			<WhiteSpace size="lg" />
		</WingBlank>
	);
};

export default observer(MyCard);
