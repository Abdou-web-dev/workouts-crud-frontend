import "./spinner_styles.scss";

export function PrettySpinner() {
  return (
    <div className={"lds-roller"}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
