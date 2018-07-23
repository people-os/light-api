// Set DEBUG var here for compatibility with Windows shells
process.env.DEBUG = 'express:*,light-api:*'

const bodyParser = require('body-parser')
const express = require('express')
const _ = require('lodash')
const debug = require('debug')('light-api:server')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', [
		'Accept',
		'Authorization',
		'Content-Type',
		'Origin',
		'X-Requested-With'
	].join(', '))
	res.header('Access-Control-Allow-Methods', [
		'DELETE',
		'GET',
		'HEAD',
		'OPTIONS',
		'PATCH',
		'POST',
		'PUT'
	].join(', '))
	next()
})

const devices = [
	{
		id: 1,
		name: 'Balcony',
		active: true,
		brightness: 50
	},
	{
		id: 2,
		name: 'Bedroom 01',
		active: false,
		brightness: 70
	},
	{
		id: 3,
		name: 'Bedroom 02',
		active: false,
		brightness: 70
	},
	{
		id: 4,
		name: 'Entrance',
		active: true,
		brightness: 100
	},
	{
		id: 5,
		name: 'Kitchen',
		active: true,
		brightness: 100
	},
	{
		id: 6,
		name: 'Living Room',
		active: true,
		brightness: 40
	},
	{
		id: 7,
		name: 'Master Bedroom',
		active: false,
		brightness: 60
	},
	{
		id: 8,
		name: 'Storage',
		active: false,
		brightness: 100
	}
]

app.get('/api/v1/device', (req, res) => {
	res.json({
		data: devices
	})
})

app.get('/api/v1/device/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)

	if (_.isNaN(id)) {
		return res.status(400).json({
			errors: [
				{
					detail: `Device id is not a number: ${req.params.id}`
				}
			]
		})
	}

	const device = _.find(devices, {
		id
	})

	if (!device) {
		return res.status(404).json({
			errors: [
				{
					detail: `Could not find device with id ${id}`
				}
			]
		})
	}

	return res.json({
		data: device
	})
})

app.patch('/api/v1/device/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)

	if (_.isNaN(id)) {
		return res.status(400).json({
			errors: [
				{
					detail: `Device id is not a number: ${req.params.id}`
				}
			]
		})
	}

	const update = req.body

	if (!_.get(update, [ 'data' ])) {
		return res.status(400).json({
			errors: [
				{
					detail: 'No data provided for update'
				}
			]
		})
	}

	const device = _.find(devices, {
		id
	})

	if (!device) {
		return res.status(404).json({
			errors: [
				{
					detail: `Could not find device with id ${id}`
				}
			]
		})
	}

	_.merge(device, _.pick(update.data, [
		'name',
		'active',
		'brightness'
	]))

	return res.json({
		data: device
	})
})

app.listen(3000, () => {
	debug('API listening on port 3000!')
})
