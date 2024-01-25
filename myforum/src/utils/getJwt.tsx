function getJWT(): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "JWT") {
      return value;
    }
  }
  return null;
}

export default getJWT;
