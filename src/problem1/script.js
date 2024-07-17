var sum_to_n_a = function(n) {
    if (n < 0) {
		alert("N should equal or greater than 0");
		return -1;
	}
    
    let i = 1, sum = 0;

    while (i <= n) {
        sum += i;
        i++;
    }

    return sum;
};

var sum_to_n_b = function(n) {
	if (n < 0) {
		alert("N should equal or greater than 0");
		return -1;
	}

    if (n <= 1) return n;

    let sum = n + sum_to_n_b(n - 1);

    return sum;
};

var sum_to_n_c = function(n) {
	if (n < 0) {
		alert("N should equal or greater than 0");
		return -1;
	}
	
    return n * (n + 1)/2;
};