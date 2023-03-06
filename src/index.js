const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Use the body-parser middleware to parse JSON requests
app.use(bodyParser.json());

//create a server object:
app.get("/", function (req, res) {
  res.write("Hello World!..."); //write a response to the client
  res.end(); //end the response
});

// Create a sample dataset
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: data.length + 1,
    name: `Item ${i + 1}`
  });
}

// Define the endpoint for the API
app.get("/items", (req, res) => {
  // Get the cursor from the request
  const cursor = +req.query.cursor;

  // Set the page size
  const pageSize = 10;

  // Set the default start position
  let start = 0;

  // If the cursor is provided, find the position in the dataset
  if (cursor) {
    const index = data.findIndex((item) => item.id === cursor);

    if (index !== -1) {
      start = index;
    }
  }

  // Get the items for the current page
  const items = data.slice(start, start + pageSize);

  // Set the next cursor
  let nextCursor = null;
  if (start + pageSize < data.length) {
    nextCursor = data[start + pageSize].id;
  }

  // Send the response
  res.json({
    items: items,
    cursor: nextCursor
  });
});

app.listen(8080, function () {
  console.log("server running on 8080");
}); //the server object listens on port 8080
