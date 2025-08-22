/* Aqui el error acttivaria la simulacion de fallos que se solicita,
 de manera que si llegase a pasar luego a produccion ya se tienen establecidas las posibles respuestas  */
 
export async function fetchWithErrors(url, options = {}, { error = true, timeoutMs = 5000 } = {}) {
  if (!error) return await fetch(url, options);

  const numRandom = Math.random();

  if (numRandom < 0.15) {
    return new Response(null, { status: 500, statusText: "Internal Server Error" });
  }

  if (numRandom < 0.20) {
    return new Response(null, { status: 429, statusText: "Rate Limit" });
  }

  if (numRandom < 0.30) {
    throw new Error("Connection Lost");
  }

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Network Timeout")), timeoutMs)
  );

  return Promise.race([fetch(url, options), timeout]);
}
