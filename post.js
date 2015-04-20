var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database: 'Discussion_board'		
});


exports.list = function(req, res) {
	connection.query('SELECT * FROM posts p JOIN departments d ON d.dept_id = p.dept_id WHERE post_id =' + req.query.post_id, function(err, post, fields) {
		res.render('post', {post: post[0]});

	});

};


exports.getreplies = function(req, res) { 

	connection.query('SELECT * FROM replies WHERE post_id =' + req.query.data.postid + ' ORDER BY reply_date DESC ', function(err, rows, fields) {
		if(err) {
			console.log(err);
		}
		res.send(rows);
	}); 
};
	
	
	
// }

exports.sendreplies = function(req, res) {
	
	connection.query('SELECT dept_id FROM posts WHERE post_id =' + req.body.data.postid, function(err, rows, fields) {
		var replycont = req.body.data.comment;
		var replytitle = req.body.data.title;
		var	datetime = req.body.data.datetime;
		var postid = req.body.data.postid;
		var author = req.body.data.name;

		connection.query('INSERT INTO replies(reply_content, reply_title, reply_date, post_id, reply_by ,reply_votes)'
			+ 'VALUE("' +  replycont + '","' + replycont + '","' + datetime + '",' + postid + ',"' + author + '",'  + 0 + ')', function(err) {
				if(err) {
					console.log(err);
				}
				res.end();

			});
	});
	
	
}