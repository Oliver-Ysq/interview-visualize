import { makeAutoObservable } from "mobx";
import { calendarFormatDate } from "../utils/util";
import { IInterviewListItem, ITime } from "./progress";
import ProgressStore from "./progress";
export interface CalendarItemInnerListItem {
	timeStamp: ITime;
	company: string;
	status: string;
}
export interface CalendarItem {
	date: string;
	innerList: CalendarItemInnerListItem[];
}

class CalendarStore {
	calendarList: CalendarItem[] = [];
	constructor() {
		makeAutoObservable(this);
	}
	updateCalendar(interviewList: IInterviewListItem[]) {
		interviewList.forEach((v) => {
			this.handleITime(v.timeList.written.time, v);
			this.handleITime(v.timeList.hr.time, v);
			v.timeList.interview.forEach((item) => {
				this.handleITime(item.time, v);
			});
		});
	}

	clearCalendar() {
		this.calendarList = [];
	}

	handleITime(time: ITime, v: IInterviewListItem) {
		// 存在笔试时间
		if (!!time) {
			let findIndex = this.calendarList.findIndex(
				(v) => v.date === calendarFormatDate(time)
			);
			if (findIndex < 0) {
				// 不存在该日期对象，新建
				this.calendarList.push({
					date: calendarFormatDate(time),
					innerList: [
						{
							timeStamp: time,
							company: v.companyName,
							status: ProgressStore.getNowState(v),
						},
					],
				});
			} else {
				// 存在该日期对象，直接push
				this.calendarList[findIndex].innerList.push({
					timeStamp: time,
					company: v.companyName,
					status: ProgressStore.getNowState(v),
				});
			}
		}
	}
}

export default new CalendarStore();
