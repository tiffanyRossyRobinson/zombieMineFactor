var _ = require('underscore')

module.exports = function ($q) {
	return {
		determineMines : function(location, mines){
            var deferred = $q.defer();
            var row = Number(location[0]); 
            var col = location[1];

            var closeMines = discoverMineNeighbors(row, col, mines);

            deferred.resolve(closeMines);
            return deferred.promise;
        },

        discoverMineNeighbors : function(row, col, gameData){
            return _.filter( getNeighbors(row, col), function(aNeighbor){
	            if(_.isUndefined(gameData[aNeighbor])){
	                return;
	            }
	            return gameData[aNeighbor] === -1; 
            })
        },

        getNeighbors : function(row, col){
            return  [ ((row - 1) + col), 
                      ((row + 1) + col), 
                      ((row - 1) + String.fromCharCode(col.charCodeAt(0) - 1)), 
                      ((row - 1) + String.fromCharCode(col.charCodeAt(0) + 1)),
                      (row + String.fromCharCode(col.charCodeAt(0) - 1)),
                      (row + String.fromCharCode(col.charCodeAt(0) + 1)),
                      ((row + 1) + String.fromCharCode(col.charCodeAt(0) - 1)),
                      ((row + 1) + String.fromCharCode(col.charCodeAt(0) + 1))
                    ]
         }	
	}
 
}