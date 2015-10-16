var h = require('hyperscript');
var fs = require('fs');
var _ = require('underscore');

exports.url = '/';
exports.template = fs.readFileSync('views/main.html', 'utf-8');
exports.controller = [
  '$scope',
  '$state', 
  '$parse', 
  '$q',
  'board',
  'game',
  component
  ]

function component ($scope, $state, $parse, $q, board, game){  

		    $scope.value = true; 

        $scope.changeLevel = function (){
          $scope.value = true;
        }
        //this allows the user to create a table
        $scope.create = function(input){ 
   		  $scope.value = false; 
          $scope.game = {};
          $scope.game.length = 10; 
          $scope.game.width = 10; 
          $scope.values =[];

          if(input === 'beginning'){
            $scope.game.level = 10; 
            setUpGame($scope.game);
          }
          else if(input === 'middle'){
            $scope.game.level = 6; 
            setUpGame($scope.game);
          }
          else if (input === 'end'){
            $scope.game.level = 2; 
            setUpGame($scope.game);
          }
        };

        var setUpGame = function(gameData){
              $scope.game = board.createTable(gameData).then(function(resp){
              $scope.game = resp;
              $scope.mines = resp.mines; 
              var test = Object.keys(resp.mines);
              defaultMines(resp.mines);
              $scope.totalMines = _.filter(test, function(data){
                return $scope.mines[data] === -1; 
              })
              enableCells(resp);
              $scope.selectedCells = [];
              var game = $scope.game;
            })
            return;
        }

         //this allows the user to clear all cells
        $scope.clearAll= function(someObject){
          enableCells(someObject);
          defaultMines(someObject.mines);
          $scope.mines = [];
          $scope.selectedCells = []
          $scope.mines = board.setMines(someObject);
        };

        //This will occur when a cell button is clicked 
        $scope.selectCell=function(location){
          var gameData = $scope.game;

          disableCell(location);
          if(gameData.mines[location] !== -1){
            game.determineMines(location, gameData.mines).then(function(value){
              $scope.mines[location] = value.length;
              if(value.length === 0){
                itsZero(location); 
               }
            })
          }
          else{
            revealMine(location);
            alert("Game Over");
            disableAllCells($scope.game);
          }
          
 
        };

        var revealNeighbors = function(location){
          var gameData = $scope.game;
          var safeNeighbors = []; 
          game.determineMines(location, gameData.mines).then(function(value){
            if(!_.isUndefined(gameData.mines[location])){
              $scope.mines[location] = value.length; 
              falseCell(location);
              checkGameStatus(location);
              if(value.length === 0){
                safeNeighbors.push(location);
              }
            }       
            return safeNeighbors;
          }).then(function(value){
            if(!_.isUndefined(value[0])){
              itsZero(value[0]);
            }
          })
        }

        var itsZero = function(location){
          var neighbors= game.getNeighbors(Number(location[0]), location[1]);
            _.each(neighbors, function(data){
              if($scope.game.classes['isActive' + data] === false){
                revealNeighbors(data);
              }
              
            })   
        }

        var disableAllCells= function(gameData){
          $scope.selectedCells = []
          var test = Object.keys(gameData.classes);
          _.each(test, function (value){
            var location = value[8] + value[9];
            falseCell(location);
          })
        }

        var disableCell=function(location){
          var thisClass= "isActive" + location;
          var value = $scope.game.classes[thisClass];
          var model = $parse(thisClass);
          model.assign($scope, !(value)); 
          $scope.game.classes[thisClass] = !value;
          checkGameStatus(location);
        };

        var falseCell = function (location){
          var thisClass= "isActive" + location;
          if($scope.game.mines[location] === -1){
            revealMine(location);
          }
          var value = $scope.game.classes[thisClass];
          var model = $parse(thisClass);
          model.assign($scope, true); 
          $scope.game.classes[thisClass] = true;
        }

        var checkGameStatus = function(location){
          if($scope.mines[location] != -1){
            $scope.selectedCells.push(location); 
              $scope.selectedCells = _.uniq($scope.selectedCells);
              var selected = $scope.selectedCells.length; 
              var total = selected + $scope.totalMines.length; 
              if(total === 100){
                alert("You have survived!")
                $scope.selectedCells = [];
                disableAllCells($scope.game)

              }
          }
          
        }

        var enableCells = function(gameData){
          var array = [];
            var test = Object.keys(gameData.classes);
            _.each(test, function(cell){
              $scope.game.classes[cell] = false;
              var element = cell[8] + cell[9];
              var model = $parse(cell); 
              model.assign($scope, false);
            });
            return;
        }

        var defaultMines = function(gameData){
          var array = []; 
          var test = Object.keys(gameData); 
          _.each(test, function(cell){
            var thisClass = 'isMine' + cell; 
            var model = $parse(thisClass); 
            model.assign($scope, false); 
          })

          return; 
        }

        var revealMine = function(gameData){
          var thisClass = 'isMine' + gameData;
          var model = $parse(thisClass); 
          model.assign($scope, true)
          return;          
        }
   }


