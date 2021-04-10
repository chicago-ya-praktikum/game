const {app} = require('./dist/bundle')

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Sokoban." });
  });
  
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
