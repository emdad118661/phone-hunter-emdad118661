const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    // load data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data.slice(0, 20)));

    // console.log(url);

    const displaySearchResult = data => {
        // console.log(data);
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        if (data.length == 0) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <div class="card-body text-danger">
                        <b>Sorry, No Phone Found, TRY AGAIN!!!</b>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        }
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
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Brand: ${phone.brand}<br>
                Phone Name: ${phone.name}<br>
                Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not Found'}</h5>
                <p class="card-text"><b>Fetures: </b><br>Storage: ${phone.mainFeatures.storage}<br>
                Display: ${phone.mainFeatures.displaySize}<br>
                Memory: ${phone.mainFeatures.memory}<br>
                Chip-set: ${phone.mainFeatures.chipSet}<br>
                <b>Sensors:</b><br> ${phone.mainFeatures.sensors}<br>
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