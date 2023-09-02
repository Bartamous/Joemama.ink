const API_URL = "https://api.coingecko.com/api/v3";

axios.get(`${API_URL}/simple/price?ids=ethereum,bitcoin,monero&vs_currencies=aud`)
	.then(response => {
		const ethPrice = response.data.ethereum.aud;
		const btcPrice = response.data.bitcoin.aud;
		const xmrPrice = response.data.monero.aud;

		document.getElementById("eth-price").textContent = ethPrice.toFixed(2);
		document.getElementById("btc-price").textContent = btcPrice.toFixed(2);
		document.getElementById("xmr-price").textContent = xmrPrice.toFixed(2);
	})
	.catch(error => {
		console.error(error);
	});

	fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=AUD&ids=ethereum')
  .then(response => response.json())
  .then(data => {
    const labels = [];
    const ethData = [];
    for (let i = 0; i < data.length; i++) {
      const coinData = data[i];
      const timestamp = new Date(coinData.last_updated).toLocaleTimeString('en-US');
      labels.push(timestamp);
      if (coinData.symbol === 'eth') {
        ethData.push(coinData.low);
        ethData.push(coinData.open);
        ethData.push(coinData.close);
        ethData.push(coinData.high);
      }
    }

    // Draw candlestick chart using Chart.js
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'candlestick',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'ETH/AUD',
            data: [
              {t: labels[0], o: ethData[1], h: ethData[3], l: ethData[0], c: ethData[2]},
            ],
            borderColor: 'rgba(255, 99, 132, 1)',
            risingBorderColor: 'rgba(0, 255, 0, 1)',
            fallingBorderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              format: 'h:mm a',
              tooltipFormat: 'h:mm a',
            },
            ticks: {
              maxTicksLimit: 6,
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false,
            },
          }],
        },
      },
    });
  });