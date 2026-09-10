/**
 * Baltimore AQI Sensor Network - Embeddable Interactive Widget Logic
 */

let aqiData = null;
let leafletMap = null;
let siteMarkers = [];
let timeSeriesChart = null;
let selectedSite = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('bmore_aqi_embed.json');
        aqiData = await response.json();

        initMap();
        initTimeSeriesChart();
        populateSiteSelect();
    } catch (err) {
        console.error("Failed to load AQI embed data:", err);
    }
});

function getVulnColor(cat) {
    if (cat === 'High') return '#EF4444';     // Red
    if (cat === 'Moderate') return '#F59E0B'; // Orange / Yellow
    if (cat === 'Low') return '#10B981';      // Emerald Green
    return '#6366F1';
}

function initMap() {
    leafletMap = L.map('map', {
        center: [39.2904, -76.6122],
        zoom: 11,
        zoomControl: true
    });

    // Carto's OpenStreetMap-based Dark Matter basemap, rendered via MapLibre GL
    // (same vector basemap style used by the Cupertino trees map).
    const basemapLayer = L.maplibreGL({
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(leafletMap);

    // The GL layer can finish initializing before its vector style has
    // loaded, which sometimes leaves it painted but without ever kicking
    // off the actual tile requests. Forcing a resize once the style is
    // ready reliably triggers that first tile load.
    const glMap = basemapLayer.getMaplibreMap();
    if (glMap.isStyleLoaded()) {
        glMap.resize();
    } else {
        glMap.once('load', () => glMap.resize());
    }

    renderMapMarkers();
}

function renderMapMarkers() {
    if (!aqiData || !aqiData.sites) return;

    aqiData.sites.forEach(site => {
        const color = getVulnColor(site.social_vuln_category);
        
        const marker = L.circleMarker([site.latitude, site.longitude], {
            radius: 9,
            fillColor: color,
            color: '#FFFFFF',
            weight: 1.5,
            opacity: 0.9,
            fillOpacity: 0.85
        }).addTo(leafletMap);

        const popupContent = `
            <div style="font-family: Inter, sans-serif;">
                <strong style="color:#FFF; font-size:0.9rem;">${site.site_name || site.site}</strong>
                <div style="font-size:0.8rem; color:#94A3B8; margin-top:4px;">
                    Social Vulnerability: <strong style="color:${color};">${site.social_vuln_category || 'Unclassified'}</strong><br/>
                    Avg PM₂.₅: ${site.pm25_mean ? site.pm25_mean.toFixed(2) + ' µg/m³' : 'N/A'}
                </div>
            </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => selectSite(site));

        siteMarkers.push(marker);
    });

    if (aqiData.sites.length > 0) {
        selectSite(aqiData.sites[0]);
    }

    // Zoom/pan out so all monitoring sites are visible at once.
    const bounds = L.latLngBounds(aqiData.sites.map(site => [site.latitude, site.longitude]));
    leafletMap.fitBounds(bounds, { padding: [40, 40] });
}

function selectSite(site) {
    selectedSite = site;
    document.getElementById('sensor-name').innerText = site.site_name || site.site;
    
    const vulnCat = site.social_vuln_category || 'Unclassified';
    const vulnColor = getVulnColor(vulnCat);
    document.getElementById('sensor-type').innerHTML = `${site.land_use_type || 'Urban Monitoring Station'} • <span style="color:${vulnColor}; font-weight:600;">${vulnCat} Social Vuln.</span>`;
    
    document.getElementById('val-pm25').innerText = site.pm25_mean ? site.pm25_mean.toFixed(1) : '--';
    document.getElementById('val-pm10').innerText = site.pm10_mean ? site.pm10_mean.toFixed(1) : '--';
    document.getElementById('val-temp').innerText = site.temp_mean ? site.temp_mean.toFixed(1) + '°C' : '--';
    document.getElementById('val-ozone').innerText = site.ozone_mean ? (site.ozone_mean * 1000).toFixed(1) : '--';

    const select = document.getElementById('site-select');
    if (select) select.value = site.site;

    updateChart();
}

function populateSiteSelect() {
    const select = document.getElementById('site-select');
    select.innerHTML = '<option value="network">Network-wide Mean</option>';
    aqiData.sites.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.site;
        opt.textContent = s.site_name || s.site;
        select.appendChild(opt);
    });

    select.addEventListener('change', () => {
        const found = aqiData.sites.find(s => s.site === select.value);
        if (found) selectSite(found);
        else updateChart();
    });
}

function initTimeSeriesChart() {
    const ctx = document.getElementById('timeSeriesCanvas').getContext('2d');

    timeSeriesChart = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.95)', titleColor: '#FFF', bodyColor: '#F8FAFC' }
            },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', maxTicksLimit: 8 } },
                y: { 
                    grid: { color: 'rgba(255,255,255,0.05)' }, 
                    ticks: { color: '#94A3B8' },
                    title: { display: true, text: 'Concentration (µg/m³)', color: '#94A3B8' }
                }
            }
        }
    });

    document.getElementById('param-select').addEventListener('change', updateChart);
    updateChart();
}

function updateChart() {
    if (!aqiData || !timeSeriesChart) return;

    const param = document.getElementById('param-select').value;
    const siteVal = document.getElementById('site-select').value;

    let labels = aqiData.daily_params.map(d => d.timestamp_day.split('T')[0]);
    let dataPoints = [];
    let labelText = 'Corrected PM2.5';
    let lineColor = '#6366F1';

    if (siteVal === 'network') {
        dataPoints = aqiData.daily_params.map(d => d[param] || null);
    } else {
        dataPoints = aqiData.daily_site_pm25.map(d => d[siteVal] || null);
    }

    if (param === 'pm25_corrected_avg') { labelText = 'Corrected PM₂.₅ (µg/m³)'; lineColor = '#6366F1'; }
    else if (param === 'pm10_corrected_avg') { labelText = 'Corrected PM₁₀ (µg/m³)'; lineColor = '#06B6D4'; }
    else if (param === 'pm1_corrected_avg') { labelText = 'Corrected PM₁ (µg/m³)'; lineColor = '#10B981'; }
    else if (param === 'bme_temp_c_avg') { labelText = 'Temperature (°C)'; lineColor = '#F59E0B'; }

    timeSeriesChart.data.labels = labels;
    timeSeriesChart.data.datasets = [{
        label: labelText,
        data: dataPoints,
        borderColor: lineColor,
        backgroundColor: lineColor + '15',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0
    }];

    timeSeriesChart.options.scales.y.title.text = labelText;
    timeSeriesChart.update();
}
