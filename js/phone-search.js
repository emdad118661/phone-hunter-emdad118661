const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data.slice(0, 20)));

    // console.log(url);

    const displaySearchResult = data => {
        // console.log(data);
        const searchResult = document.getElementById('search-result');
        data.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Brand: ${phone.brand}<br>
                    Phone Name: ${phone.phone_name}</h5>
                    <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

const loadPhoneDetail = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Brand: ${phone.brand}<br>
                Phone Name: ${phone.name}<br>
                Release Date: ${phone.releaseDate}</h5>
                <p class="card-text"><b>Fetures: </b><br>Storage: ${phone.mainFeatures.storage}<br>
                Display: ${phone.mainFeatures.displaySize}<br>
                Memory: ${phone.mainFeatures.memory}<br>
                Chip-set: ${phone.mainFeatures.chipSet}<br>
                Sensors: ${phone.mainFeatures.sensors}<br>
                <b>Others:</b><br> 
                WLAN: ${phone.others.WLAN}<br>
                Bluetooth: ${phone.others.Bluetooth}<br>
                GPS: ${phone.others.GPS}<br>
                NFC: ${phone.others.NFC}<br>
                Radio: ${phone.others.Radio}<br>
                USB: ${phone.others.USB}<br></p>
            </div>
    `;
    phoneDetails.appendChild(div);
}