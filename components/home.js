var h = require('hyperscript')
var fs = require('fs');
// var board = require('../factories/board')

//first component
/* it's looking for 
	{
		url
		template
		controller
	}
*/
exports.url = '/'
// exports.template = render().outerHTML
exports.template = fs.readFileSync('views/main.html', 'utf-8')
exports.controller = [
  '$rootScope',
  '$scope',
  '$state', 
  '$parse', 
  '$interval', 
  '$q',
  'board',
  component
  ]

function component (board, $state, $scope, $rootScope, $parse, $interval, $q){  
        //this allows the user to create a table
        $scope.create= function(input){ 
          $rootScope.game = {};
          $rootScope.game.length = 10; 
          $rootScope.game.width = 10; 
          $rootScope.values =[];

          if(input === 'beginning'){
          	console.log('beginning')
            $rootScope.game.level = 10; 
            setUpGame($rootScope.game);
          }
          else if(input === 'middle'){
            $rootScope.game.level = 6; 
            setUpGame($rootScope.game);
          }
          else if (input === 'end'){
            $rootScope.game.level = 2; 
            setUpGame($rootScope.game);
          }
        };

          var setUpGame = function(gameData){
            $scope.game = board.createTable(gameData).then(function(resp){
              $rootScope.game = resp;
              $rootScope.mines = resp.mines; 
              var test = Object.keys(resp.mines);
              // defaultMines(resp.mines);
              $rootScope.totalMines = _.filter(test, function(data){
                return $rootScope.mines[data] === -1; 
              })
              // enableCells(resp);
              $rootScope.selectedCells = [];
              // $state.go('game');
            })
            return;
        }
   }
// function render (){
// 	return h('h1', 'hello from home')
// }


