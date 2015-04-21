
$('#create-button').click(function() {
	var deptname = document.getElementById("deptname").value.trim();
	var title = document.getElementById("title-input").value.trim();
	var content = document.getElementById("content-input").value.trim();

	var data = {
	    	title: title,
            content: content,
           	datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
           	deptname: deptname
	    };


	$.ajax({
	    url: "/send",
	    'data': data,
	    type: 'GET',
	    success: function(data) {

	    	document.getElementById("title-input").value = '';
	    	document.getElementById("content-input").value = '' ;
	    	window.location.href = "/post?post_id=" + data.data.post_id;
	    },
	    error: function(err) {
	    	console.log(JSON.stringify(err));
	    }

	});

});



function onSubmit(evt) {
    evt.returnValue = validateForm(this);

    if (evt.returnValue == false && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
} //onSubmit()

function validateForm(form) {
    var requiredFields = ['name', 'title'];
    var formValid = true;

    for(var i = 0; i < requiredFields.length; i++) {
        formValid &= validateRequiredField(form.elements[requiredFields[i]]);
    }
    return formValid;
} //validateForm()


function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if(valid) {
        field.className = "form-control";
    }
    else {
        field.className = "form-control invalid-field";
    }
    return valid;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// ANGULAR!!!

var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('CommentsController', function($scope, $http) {

        $scope.postid = {
            postid: ''
        };
        $scope.postid.postid = getParameterByName('post_id');
        $scope.refreshComments = function() {
            $.ajax({
                url: '/get/replies',
                data: {
                    data:  $scope.postid
                },
                type: 'GET'
            }).success(function(data) {
                $scope.$apply(function() {
                  $scope.comments = data;
                  if(data.length == 0) {
                    $scope.isEmpty = true;
                  } else {
                     $scope.isEmpty = false;
                  }
                });
                 
            });
        };
        $scope.refreshComments();

        $scope.newComments = {
            title: '',
            postid: '',
            comment: '',
            name: '',
            datetime: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        $scope.newComments.postid = getParameterByName('post_id');


        $scope.addComments = function() {
            $http.post("/send/replies", {data :$scope.newComments}).success(function(responseData) {
                $scope.newComments = {
                    title: '',
                    name: '',
                    comment: '',
                    ratings: null

                };
                $scope.refreshComments();
            });
    
        };
});




$(document).ready(function() {

	$("#goBtn").click(function() {
		
		var deptname = document.getElementById("deptname").value.trim();

        

		$.ajax({
		    url: "/ajaxrequest",
		    data: {
		    	deptname: deptname
		    },
		    type: 'GET',
		    dataType: 'json',
		    success: function(data) {
		    	noDept(data.data);

		    }

		});



		var noDept = function(data) {
			if(data) {
				$('#deptalert').slideDown(400, function() {
		            window.setTimeout(function() {
		                $('#deptalert').slideUp();
		            }, 2500)
	        	});
			} else {
				document.getElementById("deptForm").style.display = 'none';
				document.getElementById("allDiscusions").style.display = 'block';

			}

		};	
	});

	document.getElementById("comment-form").addEventListener("submit", onSubmit);

});