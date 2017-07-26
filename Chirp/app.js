var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.get('/',function(req, res){
    res.sendfile('./public/index.html');
});

app.listen(3000,function(){
    console.log('Listen on 3000');
});
