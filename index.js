require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const weatherRoutes = require('./routes/weatherData');
const planetRoutes = require('./routes/planets');
const locationRoutes = require('./routes/weatherlocations');
const stormRoutes = require('./routes/stormRoutes');
const sunRoutes = require('./routes/sunData');
const moonRoutes = require('./routes/moonData');
const eclipsesRoutes = require('./routes/eclipses');
const seasonsRoutes = require('./routes/seasons');
const allergyRoutes = require('./routes/alleryTracker');
const airQualityRoutes = require('./routes/airQuality');

const app = express();

// Configuration
const PORT = process.env.PORT || 4000; 
const API_SERVICE_URL = "https://www.timeanddate.com/";
const API_SERVICE_URL_ACCU = "https://www.accuweather.com/";
const API_SERVICE_URL_WEATH = "https://weather.com/";

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/planets', planetRoutes);
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/storms', stormRoutes); //proxy done
app.use('/api/v1/sun', sunRoutes); //proxy done
app.use('/api/v1/moon', moonRoutes); //proxy done
app.use('/api/v1/eclipses', eclipsesRoutes); //proxy done but need to make controller
app.use('/api/v1/seasons', seasonsRoutes); //proxy done
app.use('/api/v1/allergies', allergyRoutes);
app.use('/api/v1/airquality', airQualityRoutes); //proxy done but need to make controller

// Proxy endpoints
app.use('/timesanddate', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/timesanddate`]: '',
    },
}));
app.use('/accuweather', createProxyMiddleware({
    target: API_SERVICE_URL_ACCU,
    changeOrigin: true,
    pathRewrite: {
        [`^/accuweather`]: '',
    },
}));
app.use('/weather', createProxyMiddleware({
    target: API_SERVICE_URL_WEATH,
    changeOrigin: true,
    pathRewrite: {
        [`^/weather`]: '',
    },
}));

// Start the Proxy
app.listen(PORT, () => {
    console.log(`Proxy Server is running at port ${PORT}`);
});