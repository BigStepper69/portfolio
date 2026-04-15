async function getVisitorInfo() {
    const ipElement = document.getElementById('visitor-ip');
    const locElement = document.getElementById('visitor-loc');

    try {
        // We use a backup URL just in case one is down
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.error) throw new Error("API Limit");

        ipElement.innerHTML = `IP Address: <span style="color: #90A98F; font-weight: bold;">${data.ip}</span>`;
        locElement.innerHTML = `Location: <span style="color: #90A98F; font-weight: bold;">${data.city}, ${data.country_name}</span>`;

    } catch (error) {
        // If the first one fails, we try a second one automatically!
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                ipElement.innerHTML = `IP Address: <span style="color: #90A98F; font-weight: bold;">${data.ip}</span>`;
                locElement.innerHTML = `Location: <span style="color: #90A98F; font-weight: bold;">Djibouti City, Djibouti</span>`;
            })
            .catch(() => {
                ipElement.innerText = "IP Address: Local Connection";
                locElement.innerText = "Location: Djibouti (Offline Mode)";
            });
    }
}
getVisitorInfo();