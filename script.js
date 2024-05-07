const row = document.getElementById("row");
const cities =
  fetch(`http://api.geonames.org/searchJSON?country=IN&featureClass=P&maxRows=1000&username=example123
`);
cities
  .then((dat) => dat.json())
  .then((ans) => {
    try {
      const tamilNaduCities = ans.geonames.filter(
        (city) => city.adminName1 === "Tamil Nadu"
      );
      tamilNaduCities.map((ele) => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-sm-6", "col-md-4","col-lg-3");
        const div = document.createElement("div");
        div.classList.add("p-3", "m-2", "card", "text-center");
        div.innerHTML = `${ele.name}`;
        div.addEventListener("click", () => {
          const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${ele.lat}&lon=${ele.lng}&appid=a585dbb3be691ba6b8b1e484387ddc6d`;
          const res1 = fetch(weatherApi);
          res1
            .then((data1) => data1.json())
            .then((result1) => {
              let celsius = (result1.main.temp - 273.15).toFixed(2);
              alert(
                `The temperature of ${ele.name} is ${celsius}\u00B0 Celsius`
              );
            });
        });
        col.appendChild(div);
        row.append(col);
      });
    } catch (error) {
      console.log(error);
    }
  });
