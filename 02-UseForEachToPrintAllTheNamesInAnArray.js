var f = function(console) {
	var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];

	names.forEach(function(name, index, arr) {
        console.log(name)
        console.log(index)
        console.log(arr)
        arr[index] = 'Modified' + index
	});
};

f(console);
