window.addEventListener("DOMContentLoaded", () => {
  const API_KEYS = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f3c4affad8msh5d4e8447d729eb4p19db17jsnbf48339c1833",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };
  if( document.getElementById("form")!=null){
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const searchValue = document.getElementById("location").value;
    const startDate = document.getElementById("check-in").value;
    const endDate = document.getElementById("check-out").value;
    const guest = document.getElementById("guests").value;

    if (searchValue && startDate && endDate && guest && startDate <= endDate) {
      window.location.href = "searchList.html";
      const endPoint =
        "https://airbnb13.p.rapidapi.com/search-location?location=" +
        searchValue +
        "&checkin=" +
        startDate +
        "&checkout=" +
        endDate +
        "&adults=" +
        guest +
        "&children=0&infants=0&pets=0&page=1&currency=INR";

      fetch(endPoint, API_KEYS)
        .then((e) => e.json())
        .then((result) => {
          if (result.error) {
            console.error(result);
            return;
          }

          let cIn = new Date(startDate);
          let cOut = new Date(endDate);
          let month;
          switch (cOut.getMonth()) {
            case 1:
              month = "Jan";
              break;
            case 2:
              month = "Feb";
              break;
            case 3:
              month = "March";
              break;
            case 4:
              month = "April";
              break;
            case 5:
              month = "May";
              break;
            case 6:
              month = "June";
              break;
            case 7:
              month = "July";
              break;
            case 8:
              month = "Aug";
              break;
            case 9:
              month = "Sep";
              break;
            case 10:
              month = "Oct";
              break;
            case 11:
              month = "Nov";
              break;
            default:
              month = "Dec";
          }

          const inTwoDigit = (num) => `0${num}`.slice(-2);

          let date =
            month +
            " " +
            inTwoDigit(cIn.getDate()) +
            " - " +
            inTwoDigit(cOut.getDate());

          window.localStorage.setItem(
            "search_data",
            JSON.stringify({
              date,
              search: searchValue,
              guest,
              checkin: startDate,
              checkout: endDate,
            })
          );

          window.localStorage.setItem(
            "airbnb_data",
            JSON.stringify(result.results)
          );
         
        })
      .then(err => console.error(err))
      return;
    }

    alert("Please fill all the search inputs.");
  });
}

});
