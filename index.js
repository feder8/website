function do_things() {
	$('.collapsible').collapsible();
	$('.slider').slider({full_width: true});
	$('ul.tabs').tabs();
}

function feder8_load() {
	console.log("Welcome to Feder8!");
	// Get URL part.
	var url = window.location.pathname;
	console.log("Path: " + url);

	var proto = window.location.href.split(":")[0]
	var domain = window.location.href.split("/")[2];
	var path = url.substring(0, url.length - 1);

	var page_path = "";
	if (url == "/") {
		page_path = "/pages/root.html";
	} else {
		page_path = "/pages/" + path + ".html";
	}

	var http = new XMLHttpRequest();
	http.open("HEAD", proto + "://" + domain + page_path, false);
	http.send();
	if (http.status == 404) {
		console.log("Page not exist!");
		show_404();
	} else {
		load_page(page_path);
	}
}

function load_page(page_path) {
	$("#body").load(page_path, do_things);
}

function show_404() {
	console.log("Page not exist!");
	$("#body").load("/pages/404.html", do_things);
}
