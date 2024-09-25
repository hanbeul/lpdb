
export async function getAllVisits() {
  const response = await fetch('http://api:8080/visits', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
