import { observer } from "mobx-react"
import "./style.css"
import Store from "../../store/index"
import MyCard from "../../components/MyCard"
import 空 from "../../assets/空.png"
// import { IInterviewListItem } from "../../store/progress"

const Progress = () => {
  const { progressStore } = Store
  const { interviewList } = progressStore
  // const addInterviewListItem = (item: IInterviewListItem) => {
  //   progressStore.addInterviewListItem(item)
  // }

  return (
    <div className="progress-wrapper">
      {interviewList.length > 0 ?
        interviewList.map((v, index) => {
          return (
            <div className="progress-wrapper" key={v.companyName + v.positionName}>
              <MyCard {...v} index={index} />
            </div>
          )
        }) :
        <img src={空} className="empty-icon" alt="empty~"></img>}
    </div>
  )
}
export default observer(Progress)
