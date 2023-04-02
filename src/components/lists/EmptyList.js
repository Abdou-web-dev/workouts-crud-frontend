import empty from "../../assets/img/empty.png";
import "./lists.scss";

export function EmptyList() {
  return (
    <div className="empty-list-container">
      <span>You have no Workout !</span>
      <img src={empty} alt="" />
    </div>
  );
}
