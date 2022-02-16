import "../../styles/chip.css";

interface ChipInfo {
  label: string;
}

export default function Chip(props: ChipInfo) {
  return (
    <>
      <span className="chip-container">{props.label}</span>
    </>
  );
}
