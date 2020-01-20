export default function changeToggleIcon(e, { ...props }) {
  e.currentTarget.attributes.title.value === "ADICIONAL QUEIJO"
    ? props.setstate(!props.state)
    : props.setstate(!props.state);
}
