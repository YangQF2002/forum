function getUserId(): number | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name == "user_id") {
      return parseInt(value, 10);
    }
  }
  return null;
}

export default getUserId;
