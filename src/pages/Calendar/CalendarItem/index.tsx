import { Card, List } from "antd-mobile";
import React from "react";
import { ITime } from "../../../store/progress";
import { formatDate, getIconUrl } from "../../../utils/util";
import "./style.css";
interface IProps {
	companyName: string;
	status: string;
	time: ITime;
}
const CalendarItem = (props: IProps) => {
	const { companyName, status, time } = props;
	return (
		<Card className="mycard">
			<Card.Header
				thumb={getIconUrl(companyName)}
				thumbStyle={{ width: 24, marginRight: 12 }}
				title={<div style={{ fontSize: 15 }}>{companyName}</div>}
				extra={<div style={{ fontSize: 14 }}>{status}</div>}
			></Card.Header>
			<Card.Body>
				<List.Item extra={<>{formatDate(time)}</>}>面试时间</List.Item>
			</Card.Body>
		</Card>
	);
};
export default CalendarItem;
