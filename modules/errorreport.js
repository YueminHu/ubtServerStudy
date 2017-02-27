var db = require('../db/report.model.js');

exports.increaseErrorSample = function(){
	var d=new Date();
	var dMinute=new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0);

	db.counterReport.update(
	  { 
	    timestamp_minute: dMinute,
	    type: "ERROR"
	  }, 
	  {
	    $inc: {num_samples: 1, total_nums: 1 }
	  }, 
	  {safe: true, upsert: true},
	  function(err, doc){
	    if (err) {
	      console.log(err);
	    }
	    console.log(doc);
  	  }
  	);
}
