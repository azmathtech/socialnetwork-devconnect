const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

const api = {
  clientId: process.env.REACT_APP_GITHUB_API_KEY,
  clientSecret: process.env.REACT_APP_GITHUB_API_SECRET,
  count: 5,
  sorted: 'created: asc'
};

export const getGithub = username =>
  fetch(
    `https://api.github.com/users/${username}/repos?per_page=${api.count}&sort=${api.sorted}&client_id=${api.clientId}&client_secret=${api.clientSecret}`
  )
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));

module.exports = router;
