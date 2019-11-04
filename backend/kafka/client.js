var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
	//console.log(`*******------5-------******`);
	//console.log('in make request');
	//console.log(queue_name);
	//console.log(msg_payload);
	//console.log(`*******------6-------******`);

	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		if(err)
			console.error(err);
		else{
			//console.log(`*******------7-------******`);

			console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;