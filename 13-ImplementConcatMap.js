Array.prototype.concatAll = function() {
    var results = [];
    this.forEach(function(subArray) {
        subArray.forEach(function(item) {
            results.push(item);
        });
    });

    return results;
};

Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this.
		map(function(item) {
			// ------------   INSERT CODE HERE!  ----------------------------
			// Apply the projection function to each item. The projection
			// function will return a new child array. This will create a
            // two-dimensional array.
            return projectionFunctionThatReturnsArray(item);
			// ------------   INSERT CODE HERE!  ----------------------------
		}).
		// apply the concatAll function to flatten the two-dimensional array
		concatAll();
};

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda)); 
};

var spanishFrenchEnglishWords = [ ["cero","rien","zero"], ["uno","un","one"], ["dos","deux","two"] ];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0,1,2].
    concatMap(function(index) {
        return spanishFrenchEnglishWords[index];
    });

console.log(JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]');

allWords = [0,1,2].
    flatMap(function(index) {
        return spanishFrenchEnglishWords[index];
    });

console.log(JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]');

console.log(Array.prototype.concat.apply([], [[1,2,3],[4,5,6]]));
