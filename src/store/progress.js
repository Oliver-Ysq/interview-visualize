import { makeAutoObservable } from "mobx"

class ProgressStore {
  interviewList = [{ companyName: '百度', positionName: '前端', roundNumber: 3, tips: '可以' }]
  constructor() {
    makeAutoObservable(this)
  }
  addInterviewListItem(params) {
    // const { companyName, positionName, roundNumber, tips } = params
    this.interviewList.push(params)
  }
}

export default ProgressStore
