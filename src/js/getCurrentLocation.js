export async function getCurrentLocation() {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    console.log(error.response);
    return false;
  }
}
