import { ITime } from "./../store/progress";
import BAIDU from "../assets/company/百度.png";
import ALIBABA from "../assets/company/阿里.png";
import BYTE_DANCE from "../assets/company/bytedance.png";
import TENCENT from "../assets/company/tencent.png";
import COMPANY from "../assets/company/company.png";
/**
 * 阿拉伯数字 => 汉字
 * @param num
 * @returns
 */
export const getChineseNumber = (num: number) => {
	const map = ["零", "一", "二", "三", "四", "五", "六"];
	return map[num];
};

const pad = (n: number) => (n < 10 ? `0${n}` : n);
/**
 * 格式化日期
 * @param date
 * @returns string
 */
export function formatDate(date: ITime) {
	if (date === undefined) return "";
	/* eslint no-confusing-arrow: 0 */
	const dateStr = `[${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)}]`;
	const timeStr = `${pad(date.getHours())}时${pad(date.getMinutes())}分`;
	return `${dateStr} ${timeStr}`;
}

export function calendarFormatDate(date: ITime) {
	if (!date) return "";
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)}`;
}

/**
 * 根据公司名返回图标
 * @param companyName
 */
export function getIconUrl(companyName: string) {
	if (/百度|baidu|凤巢|度小满/gi.test(companyName)) {
		return BAIDU;
	}
	if (/阿里|蚂蚁|菜鸟|高德|饿了么|ali/gi.test(companyName)) {
		return ALIBABA;
	}
	if (/字节|byteance|抖音|头条/gi.test(companyName)) {
		return BYTE_DANCE;
	}
	if (/腾讯|tencent|qq|wx|微信|pcg|cdg|csig|ieg/gi.test(companyName)) {
		return TENCENT;
	}
	return COMPANY;
}
