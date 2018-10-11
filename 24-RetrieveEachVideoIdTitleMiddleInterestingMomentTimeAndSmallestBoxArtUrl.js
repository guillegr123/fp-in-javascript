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

Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
		accumulatedValue;

	// If the array is empty, do nothing
	if (this.length === 0) {
		return this;
	}
	else {
		// If the user didn't pass an initial value, use the first item.
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}

		// Loop through the array, feeding the current value and the result of
		// the previous computation back into the combiner function until
		// we've exhausted the entire array and are left with only one value.
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter])
			counter++;
		}

		return [accumulatedValue];
	}
};

Array.zip = function(left, right, combinerFunction) {
	var counter,
		results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
        results.push(combinerFunction(left[counter], right[counter]));
	}

	return results;
};

var f = function() {
	var movieLists = [
			{
				name: "New Releases",
				videos: [
					{
						"id": 70111470,
						"title": "Die Hard",
						"boxarts": [
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"interestingMoments": [
							{ type: "End", time:213432 },
							{ type: "Start", time: 64534 },
							{ type: "Middle", time: 323133}
						]
					},
					{
						"id": 654356453,
						"title": "Bad Boys",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
							{ width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"interestingMoments": [
							{ type: "End", time:54654754 },
							{ type: "Start", time: 43524243 },
							{ type: "Middle", time: 6575665}
						]
					}
				]
			},
			{
				name: "Instant Queue",
				videos: [
					{
						"id": 65432445,
						"title": "The Chamber",
						"boxarts": [
							{ width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"interestingMoments": [
							{ type: "End", time:132423 },
							{ type: "Start", time: 54637425 },
							{ type: "Middle", time: 3452343}
						]
					},
					{
						"id": 675465,
						"title": "Fracture",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
							{ width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
							{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"interestingMoments": [
							{ type: "End", time:45632456 },
							{ type: "Start", time: 234534 },
							{ type: "Middle", time: 3453434}
						]
					}
				]
			}
		];

    //------------ COMPLETE THIS EXPRESSION --------------
    /*
	return movieLists.
		concatMap(function(movieList) {
            movieList.videos.concatMap(function(video) {
                Array.zip(video.boxarts, video.interestingMoments, function(boxart, interestingMoment) {
                    return { boxart: boxart, interestingMoment: interestingMoment };
                }).reduce(function (finalBoxArtAndMoment, boxArtAndMoment) {
                    if (boxArtAndMoment.boxart.width * boxArtAndMoment.boxart.height > finalBoxArtAndMoment.boxart.width * finalBoxArtAndMoment.boxart.height) {
                        finalBoxArtAndMoment.boxart = boxArtAndMoment.boxart;
                    }
                    if (boxArtAndMoment.interestingMoment.type === "Middle")
                })
            });
        });
    */

    return movieLists
        .concatMap(function(movieList) {
            return movieList.videos.concatMap(function(video) {
                var smallestBoxArts = video.boxarts.reduce(function (smallestBoxArt, boxart) {
                    if (boxart.width * boxart.height < smallestBoxArt.width * smallestBoxArt.height) {
                        return boxart;
                    }
                    return smallestBoxArt;
                });
                var middleMoments = video.interestingMoments.filter(function (interestingMoment) {
                    return interestingMoment.type === "Middle";
                });

                return Array.zip(smallestBoxArts, middleMoments, function(boxart, interestingMoment) {
                    return {
                        id: video.id,
                        title: video.title,
                        time: interestingMoment.time,
                        url: boxart.url
                    };
                });
            });
        });

};

console.log(f());
