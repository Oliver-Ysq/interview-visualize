import { observer } from "mobx-react";
import "./style.css";
import Store from "../../store/index";
import MyCard from "../../components/MyCard";
import 空 from "../../assets/空.png";
import { Icon, Modal } from "antd-mobile";
import { useCallback, useState } from "react";
import Form from "./Form";
interface IProps {
	selected: boolean;
}
const Progress = (props: IProps) => {
	const { selected } = props;
	const { progressStore, authStore } = Store;
	const { interviewList } = progressStore;
	const [showModal, setShowModal] = useState(false);
	const [objId, setObjId] = useState("");

	const onCloseModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	const onBack = () => {
		setShowModal(false);
		setObjId("");
	};

	const renderList = () => {
		return (
			<div className="progress-wrapper">
				{interviewList.length > 0 ? (
					interviewList.map((v) => {
						return (
							<div
								className="progress-wrapper"
								key={v.companyName + v.positionName}
							>
								<MyCard
									{...v}
									setShowModal={setShowModal}
									setObjId={setObjId}
								/>
							</div>
						);
					})
				) : (
					<img src={空} className="empty-icon" alt="empty~"></img>
				)}

				<Modal
					popup
					visible={showModal}
					onClose={onBack}
					animationType="slide-up"
					// maskClosable={false}
				>
					<div style={{ fontSize: 17, padding: 12 }}>
						完善投递信息
						<Icon
							type="cross-circle"
							style={{ float: "right" }}
							onClick={onBack}
						></Icon>
					</div>
					<Form onCloseModal={onCloseModal} objId={objId} setObjId={setObjId} />
				</Modal>

				{selected ? (
					<div
						className="add"
						onClick={() => {
							setShowModal(true);
						}}
					>
						{" "}
					</div>
				) : null}
			</div>
		);
	};

	return <>{authStore.hasLogin ? renderList() : "请先登录"}</>;
};
export default observer(Progress);
