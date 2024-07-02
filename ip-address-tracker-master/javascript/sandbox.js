const ipForm = document.querySelector('form');
const infoBox = document.querySelector('.info-box');

const updateUI = (data) => {
  const ipDetails = data.ipDetails;

  infoBox.innerHTML = `
    
      <div class="ip-box">
        <span class="vertical"></span>
        <div class="ip-info">
          <p>IP Address</p>
          <span>${ipDetails.ip}</span>
        </div>
      </div>

      <div class="location-box">
      <span class="vertical"></span>
      <div class="location-info">
        <p>Location</p>
        <span>${ipDetails.location.city},<span>${ipDetails.location.region}</span></span>
        <p>${ipDetails.location.postalCode}</p>
      </div>
    </div>

      <div class="timezone-box">
        <span class="vertical"></span>
        <div class="timezone-info">
          <p>Timezone</p>
          <span>UTC ${ipDetails.location.timezone}</span> <!-- add offset value dynamically using the API -->
        </div>
      </div>

      <div class="isp-box">
        <!-- <span class="vertical"></span> -->
        <div class="isp-info">
          <p>ISP</p>
          <span>${ipDetails.isp}</span>
        </div>
      </div>

    `

  const map = L.map('map').setView([`${ipDetails.location.lat}`, `${ipDetails.location.lng}`], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [40, 60]
  });

  const marker = L.marker([`${ipDetails.location.lat}`, `${ipDetails.location.lng}`], { icon: customIcon }).addTo(map);

}

const updateip = async (ip) => {
  const ipDetails = await getLocation(ip);
  return {
    ipDetails: ipDetails
  };

}

ipForm.addEventListener('submit', e => {
  e.preventDefault();
  const ip = ipForm.search.value.trim();
  ipForm.reset();

  updateip(ip).then(data => updateUI(data))
    .catch(err => console.log(err));
});



