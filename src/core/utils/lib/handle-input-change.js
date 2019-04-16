export function handleInputChange(that, event) {
  const value =
    event.target.type === 'text' ||
    event.target.type === 'number' ||
    event.target.type === 'password' ||
    event.target.type === 'select-one'
      ? event.target.value
      : event.target.checked;
  that.setState({
    [[event.target.name]]: value,
    [`${[event.target.name]}Error`]: false
  });
}
