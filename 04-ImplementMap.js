Array.prototype.map = function(projectionFunction) {
	var results = [];
	this.forEach(function(itemInArray) {

        results.push(projectionFunction(itemInArray));

	});

	return results;
};

console.log(["Ben", "Jafar", "Matt", "Priya", "Brian"].map(function(s) { return s.charAt(0) }))