import { makeAutoObservable } from "mobx"
import { JobStatus } from "../utils/constant"
import { getChineseNumber } from "../utils/util"
/**
 * jobStatus: JobStatus, // 投递状态
 * companyName: string; // 公司名
 * positionName: string;  // 职位名
 * current: number;  // 当前进行到的阶段（ 0 开始 ）
 * needWrittenExam: boolean; // 是否需要笔试
 * needHRinterview: boolean; // 是否需要HR面
 * totalRounds: number; // 除笔试、HR面外的轮数
 * tips?: string; // 备注
 * timeList: {  // time：时间   status：-1 等待； 0 失败； 1 成功；
    written: { time: string, status: number },
    interview: Array<{ time: string, status: number }>,
    hr: { time: string, status: number }
  }
 */

export interface IInterviewListItem {
  jobStatus: JobStatus,
  companyName: string;
  positionName: string;
  current: number;  // 当前进行到的阶段（ 0 开始 ）
  needWrittenExam: boolean; // 是否需要笔试
  needHRinterview: boolean; // 是否需要HR面
  totalRounds: number; // 除笔试、HR面外的轮数
  timeList: {
    written: { time: string, status: number },
    interview: Array<{ time: string, status: number }>,
    hr: { time: string, status: number }
  }
  tips?: string; // 备注
}
class ProgressStore {
  interviewList: IInterviewListItem[] = [
    {
      jobStatus: JobStatus.ING,
      companyName: '百度',
      positionName: '前端',
      totalRounds: 2,
      tips: '可以可以可以可以可以',
      current: 0,
      needWrittenExam: true,
      needHRinterview: true,
      timeList: {
        written: { time: "6.1", status: -1 },
        interview: [{ time: "6.2", status: -1 }, { time: "6.3", status: -1 }],
        hr: { time: "6.4", status: -1 }
      }
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  addInterviewListItem(params: IInterviewListItem) {
    this.interviewList.push(params)
  }
  deleteInterviewListItem(index: number) {
    this.interviewList.splice(index, 1)
  }
  getNowState(item: IInterviewListItem) {
    const { current } = item
    if (item.needWrittenExam) {
      if (current === 0) return '笔试'
      else {
        if (item.needHRinterview && current === item.totalRounds + 1) {
          return 'HR面'
        } else {
          return `${getChineseNumber(current)}面`
        }
      }
    } else {
      if (item.needHRinterview && current === item.totalRounds) {
        return 'HR面'
      } else {
        return `${getChineseNumber(current - 1)}面`
      }
    }
  }
}

export default ProgressStore
