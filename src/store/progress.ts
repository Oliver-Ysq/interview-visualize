import { makeAutoObservable } from "mobx";
import { JobStatus } from "../utils/constant";
import { getChineseNumber } from "../utils/util";

type ITime = Date | string | undefined | null;
/**
 * user?: string; // 用户标识
 * objectId?: string;   // 唯一标识
 * jobStatus: JobStatus, // 投递状态
 * companyName: string; // 公司名
 * positionName: string;  // 职位名
 * current: number;  // 当前进行到的阶段（ 0 开始 ）
 * needWrittenExam: boolean; // 是否需要笔试
 * needHRinterview: boolean; // 是否需要HR面
 * totalRounds: number; // 除笔试、HR面外的轮数
 * tips?: string; // 备注
 * linking?: string; // 投递链接
 * type: Type; // 投递类型
 * timeList: {  // time：时间   status：-1 等待； 0 失败； 1 成功；
    written: { time: string | Date, status?: number },
    interview: Array<{ time: string | Date, status?: number }>,
    hr: { time: string | Date, status?: number }
  }
 */
export interface IInterviewListItem {
    user?: string; // 用户标识
    objectId?: string;
    jobStatus: JobStatus;
    companyName: string;
    positionName: string;
    current: number; // 当前进行到的阶段（ 0 开始 ）
    needWrittenExam: boolean; // 是否需要笔试
    needHRinterview: boolean; // 是否需要HR面
    totalRounds: number; // 除笔试、HR面外的轮数
    type: string;
    timeList: {
        written: { time: ITime; status?: number };
        interview: Array<{ time: ITime; status?: number }>;
        hr: { time: ITime; status?: number };
    };
    linking?: string; // 投递链接
}
class ProgressStore {
    interviewList: IInterviewListItem[] = [
        // {
        //     jobStatus: JobStatus.ING,
        //     companyName: "百度",
        //     positionName: "前端",
        //     type: Type.ADVANCE,
        //     totalRounds: 2,
        //     current: 0,
        //     needWrittenExam: true,
        //     needHRinterview: true,
        //     linking: "https://baidu.com/asdhflasjdfljasldjfasdfjasldjfkl",
        //     timeList: {
        //         written: { time: "6.1", status: -1 },
        //         interview: [
        //             { time: "6.2", status: -1 },
        //             { time: "6.3", status: -1 },
        //         ],
        //         hr: { time: "6.4", status: -1 },
        //     },
        // },
    ];
    constructor() {
        makeAutoObservable(this);
    }
    async getInterviewList() {
        const query = new AV.Query("InterviewList");
        query.equalTo("user", AV.User.current().id);
        const res = await query.find();
        console.log(res);
        this.interviewList = res.map(
            (i: { attributes: IInterviewListItem; id: string }) => {
                i.attributes.objectId = i.id;
                return i.attributes;
            }
        );
        console.log(this.interviewList);
    }
    async addInterviewListItem(params: IInterviewListItem) {
        const {
            jobStatus,
            companyName,
            positionName,
            current,
            needHRinterview,
            needWrittenExam,
            totalRounds,
            type,
            linking,
            timeList,
        } = params;
        const InterviewList = AV.Object.extend("InterviewList");
        const newItem = new InterviewList();
        newItem.set("user", AV.User.current().id);
        newItem.set("jobStatus", jobStatus);
        newItem.set("companyName", companyName);
        newItem.set("positionName", positionName);
        newItem.set("current", current);
        newItem.set("needWrittenExam", needWrittenExam);
        newItem.set("needHRinterview", needHRinterview);
        newItem.set("totalRounds", totalRounds);
        newItem.set("type", type);
        newItem.set("linking", linking);
        newItem.set("timeList", timeList);
        await newItem.save();
        this.getInterviewList();
    }
    async deleteInterviewListItem(objectId: string) {
        const del = AV.Object.createWithoutData("InterviewList", objectId);
        await del.destroy();
        this.getInterviewList();
    }
    getNowState(item: IInterviewListItem) {
        const { current } = item;
        if (item.needWrittenExam) {
            if (current === 0) return "笔试";
            else {
                if (item.needHRinterview && current === item.totalRounds + 1) {
                    return "HR面";
                } else {
                    return `${getChineseNumber(current)}面`;
                }
            }
        } else {
            if (item.needHRinterview && current === item.totalRounds) {
                return "HR面";
            } else {
                return `${getChineseNumber(current - 1)}面`;
            }
        }
    }
    clearList() {
        this.interviewList = [];
    }
}

export default new ProgressStore();
