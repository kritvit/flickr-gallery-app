
const express = require('express');
const router = express.Router();
const Flickr = require('flickr-sdk');
const dotenv = require('dotenv');
const model = require('./model');

dotenv.config();

const { FLICKR_API_KEY } = process.env;

router.get('/search/:query/:page/:take', async (req, res, next) => {

  try {

    // https://www.npmjs.com/package/flickr-sdk
    const flickr = new Flickr(FLICKR_API_KEY);

    const params = {
      "text": req.params.query,
      "page": req.params.page,
      "per_page": req.params.take
    };

    const flickrRes = await flickr.photos.search(params);

    // Modael data before sending response
    const searchResponse = new model.SearchResponse(flickrRes.body);

    res.status(200).json(searchResponse);

  } catch (error) {

    return next(error)

  }

});

module.exports = router;
