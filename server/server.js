const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
app.get('/', (req, resp)=>{
	resp.render('index.html');
});
app.listen(port,()=>{console.log(`Server start on port ${port}`)});
