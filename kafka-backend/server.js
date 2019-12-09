var connection =  new require('./kafka/Connection');
const config = require('./config');

//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var ItemService = require('./services/items.js');
var LoginService = require('./services/login.js');
var MessagingService = require('./services/ordersmessaging.js');
var OrdersService = require('./services/orders.js');
var MenuService = require('./services/menu.js');
var passportService = require('./services/passport.js');

var SignupService = require('./services/signup.js');
var ProfileService = require('./services/profile.js');
var SectionService = require('./services/sections.js');

var RestaurantService = require('./services/restaurants.js');


const mongoose = require('mongoose'); 
mongoose.connect(config.URL, { useNewUrlParser: true, poolSize: 500,useUnifiedTopology: true },(err,res)=>{
    if(err){
      console.log(`MongoDB Connection Failed::: ${err}`);
    }else{
      console.log(`Mongo connected!${res}`);
    }
  });



function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("items",ItemService)
handleTopicRequest("login",LoginService)
handleTopicRequest("messaging",MessagingService)
handleTopicRequest("orders",OrdersService)
handleTopicRequest("signup",SignupService)
handleTopicRequest("profile",ProfileService)
handleTopicRequest("restaurants",RestaurantService)
handleTopicRequest("sections",SectionService)
handleTopicRequest("menu",MenuService)
handleTopicRequest("passport", passportService);
//handleTopicRequest("post_book",Books)
