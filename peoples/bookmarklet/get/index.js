const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });

    if(event.name && event.name != '' && event.key == 'akkess'){
        
        if(event.type == 'twitter'){
            var psql = "INSERT INTO peoples(name,description,twitt_url) VALUES('" + event.name + "','" + event.description + "','" + event.url + "')";
        }
        else if(event.type == 'linkedin'){
            var psql = "INSERT INTO peoples(name,description,linkedkin_url) VALUES('" + event.name + "','" + event.description + "','" + event.url + "')";
        }
        else if(event.type == 'blog'){
            var psql = "INSERT INTO peoples(name,description,blog_url) VALUES('" + event.name + "','" + event.description + "','" + event.url + "')";
        }     
        else if(event.type == 'mastodon'){
            var psql = "INSERT INTO peoples(name,description,mastodon_url) VALUES('" + event.name + "','" + event.description + "','" + event.url + "')";
        }  
        else if(event.type == 'github'){
            var psql = "INSERT INTO peoples(name,description,github_url) VALUES('" + event.name + "','" + event.description + "','" + event.url + "')";
        }          
        else if(event.type == 'url'){
            var psql = "INSERT INTO peoples(name,description,blog_url) VALUES('" + event.name + "','" + event.description + "','" + event.url + "')";    
        }
        connection.query(psql, function (error, presults, fields) {
      
            // Check Tag
            var tsql = "SELECT * FROM tags WHERE name = '" + event.tag + "'";
            connection.query(tsql, function (error, tresults, fields) {  
                
                var tag_id = tresults.id;
                
                // Insert Tag
                var ptsql = "INSERT INTO peoples_tags(people_id,tag_id) VALUES(" + results.insertId + "," + tag_id + ")";
                connection.query(ptsql, function (error, ptresults, fields) {    
                    
                  var response = {};
                  response['id'] = presults.insertId;
                  response['name'] = event.name;                
                    
                    callback( null, response );
                });
            
            });
        });
    }
    else{
        
      var response = {};
      response['id'] = 0;
      response['name'] = event.name;
      
      callback( null, event );
    }
});