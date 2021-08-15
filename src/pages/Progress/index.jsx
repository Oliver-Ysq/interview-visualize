import { observer } from "mobx-react"
import Store from "../../store/index"
import MyCard from "../../components/MyCard/index.tsx"

const Progress = () => {
  const { progressStore } = Store
  const { interviewList } = progressStore
  const addInterviewListItem = () => {
    progressStore.addInterviewListItem()
  }

  return (
    <div>
      {interviewList.map(v => {
        return (
          <div key={v.companyName + v.positionName}>
            <MyCard params={v} />
            {/* <button onClick={addInterviewListItem}>btn</button> */}
          </div>
        )
      })}
    </div>
  )
}
export default observer(Progress)
