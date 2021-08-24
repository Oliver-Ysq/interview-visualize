import { ITime } from "./../store/progress";
/**
 * 阿拉伯数字 => 汉字
 * @param num 
 * @returns 
 */
export const getChineseNumber = (num: number) => {
	const map = ["零", "一", "二", "三", "四", "五", "六"];
	return map[num];
};
/**
 * 格式化日期
 * @param date 
 * @returns string
 */
export function formatDate(date: ITime) {
	if (date === undefined) return "";
	/* eslint no-confusing-arrow: 0 */
	const pad = (n: number) => (n < 10 ? `0${n}` : n);
	const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)}`;
	const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
	return `${dateStr} ${timeStr}`;
}
