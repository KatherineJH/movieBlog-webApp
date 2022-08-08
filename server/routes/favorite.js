const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
const { auth } = require("../middleware/auth");

// < ------------- Routes for Favorite ----------------> //

router.post('/favoriteNumber', (req, res) => {

    //get favorite number from mongoDB 
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // send favorite number to client-side
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })
  
  })
  
  router.post('/favorited', (req, res) => {
  
    // find DB if the movie is in the list
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // send favorite number to client-side
            let result = false;
            if (info.length !== 0) {
                result = true
            }
            res.status(200).json({ success: true, favorited: result })
        })
  })
  
  router.post('/addToFavorite', (req, res) => {
  
    const favorite = new Favorite(req.body)
  
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
  
  })
  
  router.post('/getFavoredMovie', (req, res) => {
  
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
  
  })
  
  router.post('/removeFromFavorite', (req, res) => {
  
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })
  
  })

module.exports = router;