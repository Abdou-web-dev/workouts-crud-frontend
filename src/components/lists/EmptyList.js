import empty from "../../assets/img/empty.png";

export function EmptyList() {
  return (
    <div>
      <span>You have no Workout !</span>
      <img src={empty} alt="" />
    </div>
  );
}
