var app = angular.module('chirpApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.controller('mainController',function($scope){
    $scope.posts = [
		{
			imageUrl: './img/1.png',
			title: 'asasd',
			address: 'asdadasdsd'
		},
		{
			imageUrl: './img/1.png',
			title: 'asasd',
			address: 'asdadasdsd'
		},
		{
			imageUrl: './img/1.png',
			title: 'asasd',
			address: 'asdadasdsd'
		},
		{
			imageUrl: './img/1.png',
			title: 'asasd',
			address: 'asdadasdsd'
		},
		{
			imageUrl: './img/1.png',
			title: 'asasd',
			address: 'asdadasdsd'
		},
	];
    $scope.newPost = {created_by:'',text:'',created_at:''};

    $scope.post = function(){
        $scope.newPost.created_at = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {created_by:'',text:'',created_at:''};
    }
});

app.controller('authController',function($scope){
    $scope.user = {username:'', password: ''};
    $scope.error_message = '';

    $scope.login = function(){
        $scope.error_message = 'Login request for' + $scope.user.username;
    };
    $scope.register = function(){
        $scope.error_message = 'Register request for' + $scope.user.username;
    };
});

