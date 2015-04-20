var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database: 'Discussion_board'		
});

exports.mainpage = function(req, res) {



	connection.query('SELECT * FROM posts p JOIN departments d ON p.dept_id = d.dept_id ORDER BY post_date DESC', function(err, rows, fields) {
		res.render('mainpage', {rows: rows});
	});
};







exports.ajaxrequest = function(req, res) {
	var deptname = req.query.deptname;
	connection.query('SELECT * FROM departments WHERE dept_name = "' + deptname + '"', function(err, rows) {
		if(err) {
			console.log(err);
		}
		if(rows.length == 0) {
			res.json({data: true});
		} else {
			res.json({data: false});

		}
		res.end();
	})
	
}


exports.send = function(req, res) {


	var deptname = req.query.deptname;
	var posttitle= req.query.title;
	var postcontent = req.query.content;
	var postdate = req.query.datetime;

	connection.query('SELECT dept_id FROM departments WHERE dept_name = "' + deptname + '"', function(err, rows, fields) {
		if(err) {
			console.log(err);
		}

		var pc = '"' + postcontent + '"';
		var pt = '"' + posttitle + '"';
		var pd = '"' + postdate + '"';
		var deptid = rows[0].dept_id;


		connection.query('INSERT INTO posts (post_content, post_date, post_title, dept_id)' 
		+ 'VALUES(' + pc + ',' + pd + ',' + pt + ',' + deptid + ')', function() {

			connection.query('SELECT post_id FROM posts WHERE post_title ="' + posttitle + '"', function(err, rows, fields) {
				console.log(rows);
				if(err) {
					console.log(err);
				}
				res.send({
					data: rows[0]
				});

			});
		});
	});

	





}





