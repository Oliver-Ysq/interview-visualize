import {
	Button,
	DatePicker,
	InputItem,
	List,
	Picker,
	Switch,
} from "antd-mobile";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Store from "../../../store";
import { JobStatus, Type } from "../../../utils/constant";
import { getChineseNumber } from "../../../utils/util";
import "./style.css";
interface IForm {
	onCloseModal: () => void;
	objId: string;
	setObjId: Dispatch<SetStateAction<string>>;
}
const Form = (props: IForm) => {
	const [companyName, setcompanyName] = useState("");
	const [positionName, setpositionName] = useState("");
	const [type, setType] = useState<string[] | undefined>();
	const [totalRounds, settotalRounds] = useState("2");
	const [needWritten, setNeedWritten] = useState(true);
	const [needHR, setNeedHR] = useState(true);
	const [linking, setLinking] = useState("");
	const [writtenTime, setWrittenTime] = useState<Date | undefined>();
	const [interviewTime, setInterviewTime] = useState<
		Array<Date | undefined> | []
	>([]);
	const [hrTime, setHrTime] = useState<Date | undefined>();

	const { progressStore } = Store;
	const { onCloseModal, objId, setObjId } = props;

	useEffect(() => {
		if (objId === "") return;
		const item = progressStore.interviewList.find((i) => i.objectId === objId);
		if (item) {
			setcompanyName(item.companyName);
			setpositionName(item.positionName);
			setType([item.type]);
			settotalRounds(String(item.totalRounds));
			setNeedHR(item.needHRinterview);
			setNeedWritten(item.needWrittenExam);
			setLinking(item.linking || "");
			setWrittenTime(item.timeList.written.time);
			setHrTime(item.timeList.hr.time);
			setInterviewTime(item.timeList.interview.map((i) => i.time));
		}
	}, [objId, progressStore.interviewList]);

	const updateInterviewTime = (date: Date, index: number) => {
		interviewTime[index] = date;
		console.log([...interviewTime]);
		setInterviewTime([...interviewTime]);
	};

	const typePicker = [
		{ value: Type.ADVANCE, label: Type.ADVANCE },
		{ value: Type.FORMAL, label: Type.FORMAL },
		{ value: Type.SPRING, label: Type.SPRING },
		{ value: Type.TEST, label: Type.TEST },
	];

	const handleSubmit = () => {
		if (props.objId === "") {
			// 新增item
			progressStore.addInterviewListItem({
				objectId: "",
				jobStatus: JobStatus.ING,
				companyName,
				positionName,
				type: !!type ? type[0] : Type.FORMAL,
				totalRounds: parseInt(totalRounds),
				needWrittenExam: needWritten,
				needHRinterview: needHR,
				current: 0,
				timeList: {
					written: { time: !writtenTime ? undefined : writtenTime },
					interview: interviewTime.map((v) => {
						return { time: v };
					}),
					hr: { time: !hrTime ? undefined : hrTime },
				},
			});
		} else {
			// 修改item
			progressStore.updateInterviewListItem({
				objectId: objId,
				companyName,
				positionName,
				type: !!type ? type[0] : Type.FORMAL,
				totalRounds: parseInt(totalRounds),
				needWrittenExam: needWritten,
				needHRinterview: needHR,
				timeList: {
					written: { time: !writtenTime ? undefined : writtenTime },
					interview: interviewTime.map((v) => {
						return { time: v };
					}),
					hr: { time: !hrTime ? undefined : hrTime },
				},
			});
		}
		onCloseModal();
		setObjId("");
	};

	const renderInput = (number: number) => {
		const res = [];
		for (let index = 0; index < number; index++) {
			res.push(
				<DatePicker
					value={interviewTime[index]}
					onChange={(date) => updateInterviewTime(date, index)}
					key={index}
				>
					<List.Item arrow="horizontal">
						{getChineseNumber(index + 1)}面时间
					</List.Item>
				</DatePicker>
			);
		}
		return res;
	};

	return (
		<List className="form-wrapper">
			<InputItem
				value={companyName}
				onChange={(e) => {
					setcompanyName(e);
				}}
				type="text"
				clear={true}
				placeholder="请输入公司名"
			>
				* 公司
			</InputItem>
			<InputItem
				value={positionName}
				onChange={(e) => {
					setpositionName(e);
				}}
				type="text"
				clear={true}
				placeholder="请输入职位名称"
			>
				* 职位
			</InputItem>
			<Picker
				data={typePicker}
				value={type}
				onChange={(e) => setType(e as string[])}
				cols={1}
				className="forss"
			>
				<List.Item arrow="horizontal">* 选择投递类型</List.Item>
			</Picker>
			<List.Item
				extra={
					<Switch
						checked={needWritten}
						onChange={(e) => setNeedWritten(e)}
						platform="ios"
					/>
				}
			>
				* 是否需要笔试
			</List.Item>
			<List.Item
				extra={
					<Switch
						checked={needHR}
						onChange={(e) => setNeedHR(e)}
						platform="ios"
					/>
				}
			>
				* 是否需要HR面
			</List.Item>
			<InputItem
				value={totalRounds}
				onChange={(e) => {
					settotalRounds(e);
				}}
				maxLength={1}
				type="number"
				clear={true}
				placeholder="请输入除笔试、HR面外的轮数"
			>
				* 正式轮数
			</InputItem>
			<List.Item>
				<div className="reminder">*** 以下内容选填 ***</div>{" "}
			</List.Item>
			{needWritten ? (
				<DatePicker
					value={writtenTime}
					onChange={(date) => {
						setWrittenTime(date);
						console.log(date);
					}}
				>
					<List.Item arrow="horizontal"> 笔试时间</List.Item>
				</DatePicker>
			) : null}
			{renderInput(parseInt(totalRounds))}
			{needHR ? (
				<DatePicker value={hrTime} onChange={(date) => setHrTime(date)}>
					<List.Item arrow="horizontal"> hr面时间</List.Item>
				</DatePicker>
			) : null}
			<InputItem
				value={linking}
				onChange={(e) => {
					setLinking(e);
				}}
				type="text"
				clear={true}
				placeholder="请输入投递链接"
			>
				投递链接
			</InputItem>
			<Button onClick={handleSubmit}>提交</Button>
		</List>
	);
};
export default Form;
