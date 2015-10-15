var h = require('hyperscript')
var fs = require('fs');
var _ = require('underscore')

exports.url = '/'
exports.template = fs.readFileSync('views/main.html', 'utf-8')
exports.controller = [
  '$rootScope',
  '$scope',
  '$state', 
  '$parse', 
  '$q',
  'board',
  component
  ]

function component (board, $state, $scope, $rootScope, $parse, $q){  
        //this allows the user to create a table
        $scope.create= function(input){ 
          $rootScope.game = {};
          $rootScope.game.length = 10; 
          $rootScope.game.width = 10; 
          $rootScope.values =[];

          if(input === 'beginning'){
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
          	console.log('set up Game ', gameData)
            $scope.game = board.createTable(gameData).then(function(resp){
              $rootScope.game = resp;
              $rootScope.mines = resp.mines; 
              var test = Object.keys(resp.mines);
              defaultMines(resp.mines);
              $rootScope.totalMines = __filter(test, function(data){
                return $rootScope.mines[data] === -1; 
              })
              enableCells(resp);
              $rootScope.selectedCells = [];
              $state.go('game');
            })
            return;
        }

        var enableCells = function(gameData){
          var array = [];
            var test = Object.keys(gameData.classes);
            _each(test, function(cell){
              $rootScope.game.classes[cell] = false;
              var element = cell[8] + cell[9];
              var model = $parse(cell); 
              model.assign($scope, false);
            });
            return;
        }

        var defaultMines = function(gameData){
          var array = []; 
          var test = Object.keys(gameData); 
          _each(test, function(cell){
            var thisClass = 'isMine' + cell; 
            var model = $parse(thisClass); 
            model.assign($rootScope, false); 
          })

          return; 
        }
   }


