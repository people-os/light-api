/* globals describe, it */
const chai = require('chai')
const fetch = require('node-fetch')

const {
	expect
} = chai

require('../index.js')

describe('GET /api/v1/device', () => {
	it('should return an array of devices', (done) => {
		fetch('http://localhost:3000/api/v1/device')
			.then((response) => {
				return response.json()
			})
			.then(({
				data
			}) => {
				expect(data).to.be.an('array')
				done()
			})
	})
})

describe('GET /api/v1/device:id', () => {
	it('should return a single device', (done) => {
		fetch('http://localhost:3000/api/v1/device/1')
			.then((response) => {
				return response.json()
			})
			.then(({
				data
			}) => {
				expect(data).to.be.an('object')
				expect(data).to.include({
					id: 1,
					name: 'Balcony',
					active: true,
					brightness: 50
				})
				done()
			})
	})

	it('should fail if the id is not numeric', (done) => {
		fetch('http://localhost:3000/api/v1/device/foobar')
			.then((response) => {
				expect(response.status).to.equal(400)
				done()
			})
	})

	it('should fail if the device is not found', (done) => {
		fetch('http://localhost:3000/api/v1/device/12345')
			.then((response) => {
				expect(response.status).to.equal(404)
				done()
			})
	})
})

describe('PATCH /api/v1/device:id', () => {
	it('should update a single device', (done) => {
		fetch('http://localhost:3000/api/v1/device/3', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				data: {
					brightness: 30
				}
			})
		})
			.then(() => {
				return fetch('http://localhost:3000/api/v1/device/3')
			})
			.then((response) => {
				return response.json()
			})
			.then(({
				data
			}) => {
				expect(data).to.be.an('object')
				expect(data).to.include({
					brightness: 30
				})
				done()
			})
	})

	it('should fail if the id is not numeric', (done) => {
		fetch('http://localhost:3000/api/v1/device/foobar', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				data: {
					brightness: 30
				}
			})
		})
			.then((response) => {
				expect(response.status).to.equal(400)
				done()
			})
	})

	it('should fail if the device is not found', (done) => {
		fetch('http://localhost:3000/api/v1/device/12345', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				data: {
					brightness: 30
				}
			})
		})
			.then((response) => {
				expect(response.status).to.equal(404)
				done()
			})
	})

	it('should fail if an update is not provided', (done) => {
		fetch('http://localhost:3000/api/v1/device/3', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((response) => {
				expect(response.status).to.equal(400)
				done()
			})
	})
})
