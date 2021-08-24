import 空 from "../../assets/空.png";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Calendar as C } from "react-h5-calendar";
import Store from "../../store";
import { calendarFormatDate } from "../../utils/util";
import CalendarItem from "./CalendarItem";
import "./style.css";
import { List } from "antd-mobile";
interface IProps {
	selected: boolean;
}
const Calendar = (props: IProps) => {
	const { calendarStore, progressStore } = Store;
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [currentDate, setCurrentDate] = useState("");
	const onDateClick = (e: any) => {
		const dateStr = calendarFormatDate(e.$d);
		setCurrentDate(dateStr);
		const index = calendarStore.calendarList.findIndex((v) => {
			return dateStr === v.date && v.innerList.length > 0;
		});
		setCurrentIndex(index);
	};

	useEffect(() => {
		calendarStore.updateCalendar(progressStore.interviewList);
		onDateClick({ $d: new Date() });
		return () => {
			calendarStore.clearCalendar();
		};
	}, [props.selected, progressStore.interviewList, calendarStore]);
	return (
		<div style={{ paddingBottom: 10 }}>
			<C
				onDateClick={onDateClick}
				markDates={calendarStore.calendarList}
				markType="circle"
			></C>
			<List.Item
				style={{ margin: 12, borderRadius: 5, border: "1px solid #ddd" }}
				extra={currentDate}
			>
				<div style={{ fontSize: 15 }}>当前选择日期</div>
			</List.Item>
			<div>
				{currentIndex >= 0 ? (
					calendarStore.calendarList[currentIndex].innerList.map((v) => {
						return (
							<CalendarItem
								key={v.timeStamp + ""}
								companyName={v.company}
								status={v.status}
								time={v.timeStamp}
							></CalendarItem>
						);
					})
				) : (
					<div className="empty">
						<img className="empty-image" alt="空" src={空}></img>
						<div style={{ marginTop: 6 }}>无安排</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default observer(Calendar);
