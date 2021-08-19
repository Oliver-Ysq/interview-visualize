import './App.css';
import { TabBar } from 'antd-mobile';
import { useEffect, useState } from 'react';
import My from "./pages/My"
import Progress from "./pages/Progress"

function App() {
  useEffect(() => {
    AV.init({
      appId: "ARk4ru0KKxgLll16jveu4cIC-gzGzoHsz",
      appKey: "CVTzWFxaGjKXDHVCyMQeDqnn",
      serverURL: "https://ark4ru0k.lc-cn-n1-shared.com"
    });

  }, [])
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="App">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="面试进度"
          key="progress"
          icon={<div className="progressicon" />}
          selectedIcon={<div className="progressicon-selected" />}
          selected={selectedTab === 0}
          onPress={() => {
            setSelectedTab(0)
          }}
          data-seed="logId"
        >
          <Progress selected={selectedTab === 0} />
        </TabBar.Item>
        <TabBar.Item
          title="我的"
          key="my"
          icon={<div className="myicon" />}
          selectedIcon={<div className="myicon-selected" />
          }
          selected={selectedTab === 1}
          onPress={() => {
            setSelectedTab(1)
          }}
          data-seed="logId"
        >
          <My selected={selectedTab === 1} />
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

export default App;
