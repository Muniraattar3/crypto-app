let originalData = [];

// Fetch using async/await
async function fetchData() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await res.json();
    originalData = data;
    renderTable(data);
  } catch (err) {
    console.error("Error fetching:", err);
  }
}

// Render data
function renderTable(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach(coin => {
    tableBody.innerHTML += `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}" width="24"/></td>
        <td>${coin.name}</td>
        <td>${coin.id}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.market_cap.toLocaleString()}</td>
        <td>${coin.price_change_percentage_24h?.toFixed(2)}%</td>
      </tr>
    `;
  });
}

// Search
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = originalData.filter(coin =>
    coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// Sort by market cap
document.getElementById("sort-marketcap-btn").addEventListener("click", () => {
  const sorted = [...originalData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sorted);
});

// Sort by % change
document.getElementById("sort-percentage-btn").addEventListener("click", () => {
  const sorted = [...originalData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sorted);
});

// Also try fetch with .then for demo (not used in UI)
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(res => res.json())
    .then(data => {
      console.log("Data fetched using .then:", data);
    })
    .catch(err => console.error("Error using .then:", err));
}

fetchData();
