const express = require("express");
const app = express();
const bodyparser=require("body-parser");
const request=require("request");
const https =require("https");

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res){
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last,
        }
      }
    ]
  };
  const jsondata = JSON.stringify(data);
  url= 'https://us8.api.mailchimp.com/3.0/lists/5ad6caccbe';
  const options = {
    method: "post",
    auth: "pavan:116864532f8bf979844af85103f2c54c-us8"
  }
  const request= https.request(url,options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+ "/success.html");
    }
    //if (response.error_count===1)
    //{
      //res.sendFile(__dirname+"/failure.html");
    //}
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();




});
app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(3000,function(){
  console.log("server is running in port 3000");
});






//116864532f8bf979844af85103f2c54c-us8    -apiid
//5ad6caccbe.   -audienceid
