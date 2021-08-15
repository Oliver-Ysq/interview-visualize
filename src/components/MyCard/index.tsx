import { Steps, Card, WingBlank, WhiteSpace, Button, List, Icon } from 'antd-mobile';
import BAIDU from "../../assets/百度.png"
import 垃圾 from "../../assets/垃圾.png"
import "./style.css"
import Store from "../../store/index"
import { IInterviewListItem } from '../../store/progress';
import { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { colorMap, JobStatus } from '../../utils/constant';
const Step = Steps.Step;
const IconMap = {
  [JobStatus.FAIL]: 'cross-circle',
  [JobStatus.ING]: 'right',
  [JobStatus.SUCC]: 'check-circle-o'
}

const MyCard = (item: IInterviewListItem & { index: number }) => {

  const [showDetail, setShowDetail] = useState(false)
  const { progressStore } = Store

  const onClickDetail = useCallback(() => {
    setShowDetail(!showDetail)
  }, [showDetail, setShowDetail])
  const onClick垃圾 = () => {
    progressStore.deleteInterviewListItem(item.index)
  }

  const renderSteps = () => {
    return (
      <div className="steps-wrapper">
        <Steps size="large" current={item.current} direction='vertical'>
          {item.needWrittenExam ?
            <Step title="笔试" description={item.timeList.written && item.timeList.written.time} />
            : null
          }
          {item.totalRounds >= 1 ? <Step title="一面"
            description={item.timeList.interview[0] && item.timeList.interview[0].time}
            key={'1面'} /> : null}
          {item.totalRounds >= 2 ? <Step title="二面"
            description={item.timeList.interview[1] && item.timeList.interview[1].time}
            key={'2面'} /> : null}
          {item.totalRounds >= 3 ? <Step title="三面"
            description={item.timeList.interview[2] && item.timeList.interview[2].time}
            key={'3面'} /> : null}
          {item.totalRounds >= 4 ? <Step title="四面"
            description={item.timeList.interview[3] && item.timeList.interview[3].time}
            key={'4面'} /> : null}
          {item.totalRounds >= 5 ? <Step title="五面"
            description={item.timeList.interview[4] && item.timeList.interview[4].time}
            key={'5面'} /> : null}
          {item.totalRounds >= 6 ? <Step title="六面"
            description={item.timeList.interview[5] && item.timeList.interview[5].time}
            key={'6面'} /> : null}
          {item.needHRinterview ?
            <Step title="HR面" description={item.timeList.hr.time} />
            : null
          }
        </Steps>
        <div className="close-icon" onClick={onClickDetail}>收起详情</div>
      </div>
    )
  }

  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header
          title={<div>{item.companyName} - {item.positionName}</div>}
          thumb={<img className="card-icon" alt="company-icon" src={BAIDU}></img>}
          extra={<img className="card-icon" alt="删除" src={垃圾} onClick={onClick垃圾}></img>}
        />

        <Card.Body className="card-body">
          {!showDetail ?
            <List >
              <List.Item onClick={onClickDetail} extra={<div >点击查看详情</div>} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon type={IconMap[item.jobStatus]} size="xxs" color={colorMap[item.jobStatus]} style={{ marginRight: 6 }}></Icon>
                  {progressStore.getNowState(item)} <span className="status-text">{item.jobStatus}</span>
                </div>
              </List.Item>
            </List>
            : renderSteps()}
          <WhiteSpace size="md" />
        </Card.Body>

        <Card.Footer
          content={<>
            <Button size="small" style={{ width: 80, float: 'left' }} type="ghost">edit</Button>
            <Button size="small" style={{ width: 80, float: "right" }} type="primary">pass</Button>
            <Button size="small" style={{ width: 80, float: "right", marginRight: 8 }} type="warning">fail</Button></>}
        // extra={ }
        />
      </Card>
      <WhiteSpace size="lg" />
    </WingBlank>
  )
}

export default observer(MyCard)
