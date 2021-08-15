import { Card } from 'antd-mobile';
const MyCard = (props) => {

  return (
    <Card>
      <Card.Header
        title={props.companyName}
        // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        extra={<span>this is extra</span>}
      />
      <Card.Body>
        <div>This is content of `Card`</div>
      </Card.Body>
      <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
    </Card>
  )
}

export default MyCard
