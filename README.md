# Light API

> A proxy API for a home automation light control system

## Usage

Clone this repository, and then install dependencies using `npm install`. You
can then start the server using `npm start`.
The server will bind to port 3000. All device data is stored in memory and only
persists as long as the server is running. If the server is restarted, any
changes will be lost.

## Documentation

All endpoints return JSON and will have one of the following top level keys:

- `data` - The response data for the request
- `errors` - An array of error objects

### Get all devices

```
GET /api/v1/device
```

**Example:**

```js
fetch('http://localhost:3000/api/v1/device')
	.then((response) => {
		console.log(response.data)
	})
```

### Get a single device

```
GET /api/v1/device/:id
```

**Example:**

```js
fetch('http://localhost:3000/api/v1/device/3')
	.then((response) => {
		console.log(response.data)
	})
```

### Update a single device

```
PATCH /api/v1/device/:id
```

**Example:**

```js
fetch('/api/v1/device/3', {
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
  .then(response => response.json())
```

