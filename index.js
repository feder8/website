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

	// Figure out what we want.
	var temppath = window.location.href.split("/")[3];
	if (temppath == "docs") {
		load_doc();
	} else {
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
}

function load_doc() {
	$("#body").load("/doc.html", load_doc_pdf);
}

function load_doc_pdf() {
	var doc_path = window.location.href.split("/")[4] + "/" + window.location.href.split("/")[5];
	var doc_name = window.location.href.split("/")[6];
	console.log("Loading doc: " + doc_path + "/" + doc_name);
	var docurl = "https://raw.githubusercontent.com/feder8/documentation/master/" + doc_path + "/" + doc_name + ".pdf";
	var docembed = "<iframe src='http://docs.google.com/gview?url=" + docurl + "&embedded=true' style='width:718px; height:700px;' frameborder='0'></iframe>";
	var docurl_text = "Если просмотр не загружается - <a href='" + docurl + "'>скачайте документ</a>"
	$("#docdata").html(docembed);
	$("#docurl").html(docurl_text);
}

function load_page(page_path) {
	$("#body").load(page_path, do_things);
}

function show_404() {
	console.log("Page not exist!");
	$("#body").load("/pages/404.html", do_things);
}
