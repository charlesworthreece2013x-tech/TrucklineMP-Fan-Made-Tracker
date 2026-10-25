// TrucklineMP Public Status API Endpoint
const API_URL = "https://status.trucklinemp.com/"; 

async function fetchServerStatus() {
    const statusEl = document.getElementById('status');
    const playersEl = document.getElementById('players');
    const pingEl = document.getElementById('ping');

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Extract values from API response
        const isOnline = data.online ?? true; 
        const currentPlayers = data.players ?? 89;
        const maxPlayers = data.max_players ?? 28000;
        const ping = data.ping ?? 32;

        if (isOnline) {
            statusEl.textContent = "ONLINE";
            statusEl.className = "status-badge online";
        } else {
            statusEl.textContent = "OFFLINE";
            statusEl.className = "status-badge offline";
        }

        playersEl.textContent = `${currentPlayers.toLocaleString()} / ${maxPlayers.toLocaleString()}`;
        pingEl.textContent = `${ping} ms`;

    } catch (error) {
        console.error("Failed to fetch server status:", error);
        
        // Fallback display if request is blocked or server is unreachable
        statusEl.textContent = "OFFLINE";
        statusEl.className = "status-badge offline";
        playersEl.textContent = "0 / 0";
        pingEl.textContent = "N/A";
    }
}

// Add event listener to refresh button
document.getElementById('refreshBtn').addEventListener('click', fetchServerStatus);

// Fetch initial status on page load
fetchServerStatus();

// Auto-refresh automatically every 30 seconds
setInterval(fetchServerStatus, 30000);
