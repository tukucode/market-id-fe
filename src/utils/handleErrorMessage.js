export default function handleErrorMessage(message) {
  if (typeof message === "object" && message !== null) {
    const { errors } = message;
    const newErrorMessage = Object.values(errors);
    const messages = newErrorMessage.flat();
    const firstError = messages[0];

    return firstError;
  } else return message;
}
