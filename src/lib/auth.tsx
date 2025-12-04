export async function setupAuthToken() {
  const existingToken = localStorage.getItem("token");
  if (existingToken) return existingToken;

  const res = await fetch("https://zia.chorcha.net/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "01000012345",
      password: "1234",
    }),
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data.token;
}
