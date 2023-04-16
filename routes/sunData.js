const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = express.Router();

const url = 'https://www.timeanddate.com/sun/sri-lanka/galle';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url);
        const $ = cheerio.load(response.data); 

        let sunData = {
            image: '',
            title: '',
            time: '',
            dayTime: ''
        };
        $('#qlook').each( (item, el) => {
            let dimage = $(el).find('img').attr('src');
            let image = `https:${dimage}`;
            let dtitle = $(el).find('div').text();
            let dtime = $(el).find('p[class="dn-mob"]').text().replace(/12 hours, 13 minutes/g,'');
            let ddaytime = $(el).find('p[class="dn-mob"]').text().replace(/06:03 – 18:17/g,'');

            sunData.image = image;
            sunData.title = dtitle;
            sunData.time = dtime;
            sunData.dayTime = ddaytime;
        })

        let extraSunData = [];
        $('body > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info > table > tbody > tr').each( (item, el) => {
            let title = $(el).find('th').text();
            let data = $(el).find('td').text();

            extraSunData.push({
                title,
                data
            });
        })

        await res.status(200).json({
            sunData,
            extraSunData
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;