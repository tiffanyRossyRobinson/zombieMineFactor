var _ = require('underscore')

module.exports = function ($q){
		return {
		          createTable : function(data){
		            var deferred = $q.defer();
		            data.rows = setRows(data.length);
		            data.columns = setCols(data.width);
		            data.classes = setCells(data); 
		            data.mines = setMines(data);
		            deferred.resolve(data);
		            return deferred.promise;
		          }

		          setRows : function(length){
		            return _range(length);
		          }

		          setCols : function(length){
		            var columns= [];
		            var l= "A";
		            _times(length, function(){
		              columns.push(l);
		              l = String.fromCharCode(l.charCodeAt(0) + 1);
		            });
		            return columns; 
		          }

		          setCells : function(gameData){
		              gameData.classes = []; 
		              _each(gameData.rows, function(row){
		                _each(gameData.columns, function(col){
		                  var key = 'isActive' + row + col; 
		                  gameData.classes[key] = false;
		                });
		              });
		              return gameData.classes; 
		          }

		          setMines : function(gameData){
		              gameData.mines = []; 
		              _each(gameData.rows, function(row){
		                _each(gameData.columns, function(col){
		                  var key = row + col; 
		                  gameData.mines[key] = Math.floor(Math.random() * gameData.level) - 1  ;
		                });
		              });
		              return gameData.mines;             
		          }		
		}
 
}