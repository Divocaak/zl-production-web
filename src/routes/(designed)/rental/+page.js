// src/routes/+page.js
export async function load({ fetch }) {
  const res = await fetch('/rental.json');
  const equipment = await res.json();

  return { equipment };
}