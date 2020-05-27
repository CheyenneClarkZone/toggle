window.module = (function() {
  const baseApi = "https://randomuser.me/api";

  async function getUsers(queryStringValue = "female") {
    const url = `${baseApi}/?gender=${queryStringValue}&results=10`;
    sessionStorage.setItem("gender", queryStringValue);
    // let defaultValue = sessionStorage.getItem('female');

    // will be run twice
    const resp = await fetch(url); // fetch data from API
    const data = await resp.json(); // Transform data

    const users = data.results;
    const finalUsers = handleResults(users);
    console.table(finalUsers);

    return data.results;
  }

  const handleResults = (data) => {
    return data.map((person) => {
      const { name, location, gender, email, dob } = person;
      const { title, first, last } = name;
      const { street, city, state, country, postcode } = location;
      const fullname = `${title} ${first} ${last}`;
      const locationString = `${street.number}, ${street.name}, ${city}, ${state}, ${country}, ${postcode}`;
      const resultObject = {
        fullname,
        location: locationString,
        gender,
        email,
        dob: dob.date,
      };
      return resultObject;
    });
  };

  const init = () => {
    let defaultValue = sessionStorage.getItem("gender");
    getUsers(defaultValue);
  };

  init();

  return {
    getUsers,
  };
})();
