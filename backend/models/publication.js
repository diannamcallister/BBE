const mongoose = require('mongoose')

const Publication = mongoose.model('Publication', {
    doi: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    abstract: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
		title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    author: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    journal: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    date: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    concepts: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    summaryByUs: {
		type: String,
		trim: true
    },
    
})

module.exports = { Publication }
