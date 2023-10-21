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

  const searchData = JSON.parse(window.localStorage.getItem("search_data"));
  const apiData = JSON.parse(window.localStorage.getItem("airbnb_data"));
if(document.getElementsByClassName("main") && document.getElementsByClassName("main").length>0){
  document.getElementById('location').innerText = (searchData && searchData.search)?searchData.search:'';
  document.getElementById('date').innerText = (searchData && searchData.date)?searchData.date:'';
  document.getElementById('guests').innerText =  (searchData && searchData.guest )?searchData.guest + ' guests':'';


  document.getElementsByClassName("search-btn")[0].addEventListener("click",()=>{
    window.location.href = 'index.html'
  })
}
  let locations = [];

  const addDataIntoHTMl = () => {
    const cardContainer = document.getElementById("search-card");
    // const heading = document.getElementById("search-list-length");
  const div = document.createElement("div");
    const heading  = `<p id="search-list-length" style="padding:0;margin-left: 65px;
    margin-top: 0;
    margin-bottom: 0;">${apiData.length}+ Stays in ${apiData[0].address}</p>`;
    div.innerHTML=heading;
    cardContainer.appendChild(div);

    apiData.forEach((result, index) => {
     
      const card = `          
      <div class="left-search-list">
     
      <hr style="width: 94%;">
      <div class="search-card">
       <div class="search-image">
          <img  src="${result.images[0]}" alt="${result.name}">
       </div>
       <div class="hotel-info">
          <div style="display: flex; justify-content: space-between; align-items:center;   margin-top: -20px;">
          <p>Entire home in ${result.address}</p>
              <div> <svg width="20" height="20" viewBox="0 0 22 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10.9934 3.64436C9.06065 1.48008 5.83773 0.897898 3.41618 2.87972C0.994636 4.86155 0.653715 8.17507 2.55537 10.519L10.9934 18.3334L19.4313 10.519C21.333 8.17507 21.0337 4.8407 18.5705 2.87972C16.1074 0.918745 12.9261 1.48008 10.9934 3.64436Z"
                  stroke="#374151" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
          </svg></div>
          </div>
          <h2 style="margin: 0; padding: 0;">${result.name}</h2>
          <hr style="    width: 25%;
          margin-left: 0;">
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; padding: 0; font-size: 13px;">
              <span>${result.persons} guests</span>
              <span>${result.type}</span>
              <span>${result.beds} Beds</span>
              <span>${result.bathrooms} bath</span>
              ${result.previewAmenities.reduce((p, c) => {
                return p +`.<span>${c}</span>`;
              }, "")}
          </div>
          <hr style="    width: 25%;
          margin-left: 0;">
          <div style="display: flex; justify-content: space-between; align-items:center;margin-top: -20px;">
          <p>
          <strong>${((result.rating || "") + "").slice(0, 3)}</strong>
      <img src="assets/star.png" alt="reviews">
      <span>(${result.reviewsCount} reviews)</span>
      </p>
          <div><strong>${
            result.price.priceItems[0].title.split(" x ")[0]
          }</strong>/night</div>
          </div>
       </div>
  </div>
</div>
`;
      const innerCard = document.createElement("div");
      innerCard.className = "card";
      innerCard.innerHTML = card;

      locations.push([result.name, result.lat, result.lng]);

      innerCard.onclick = () => {
        localStorage.setItem("airbnb_room_index", index);
        window.location.href = 'hotel-details.html'
      };
      if (cardContainer != null) {
        cardContainer.appendChild(innerCard);
      }
    });
  };

  addDataIntoHTMl();

  const map = L.map('map').setView([locations[0][1], locations[0][2]], 10);
  const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

  L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 50,
  }).addTo(map);

  for (var i = 0; i < locations.length; i++) {
      marker = new L.marker([locations[i][1], locations[i][2]])
          .bindPopup(locations[i][0])
          .addTo(map);
  }

  const getDistance = (source, destination) => {
      // return distance in meters
      var lon1 = toRadian(source[1]),
          lat1 = toRadian(source[0]),
          lon2 = toRadian(destination[1]),
          lat2 = toRadian(destination[0]);

      var deltaLat = lat2 - lat1;
      var deltaLon = lon2 - lon1;

      var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
      var c = 2 * Math.asin(Math.sqrt(a));
      var EARTH_RADIUS = 6371;
      return Math.round(c * EARTH_RADIUS * 1000);
  }

  const toRadian = (degree) => {
      return degree * Math.PI / 180;
  }

  const setDistance = () => {
      let i = 0;
      document.querySelectorAll('.distance').forEach((ele) => {
          var distance = getDistance([userLoc.latitude, userLoc.longitude], [locations[i][1], locations[i][2]]);
          ele.innerText = `Distance from you : ${distance} km`;
          i++;
      })
  }

  let userLoc = {};
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          userLoc.latitude = position.coords.latitude;
          userLoc.longitude = position.coords.longitude;
          setDistance();
      });
  } else {
      console.log('no-geolocation');
  }




  document.getElementById("logo").addEventListener("click",()=>{
    window.location.href = 'index.html'
  })
});
