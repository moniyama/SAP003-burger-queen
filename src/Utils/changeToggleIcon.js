export default function changeToggleIcon(e, { ...props }) {
  e.currentTarget.attributes.title.value === "cheese"
    ? props.setstate(!props.state)
    : props.setstate(!props.state);
}
