var cur_url = "http://localhost:5000/";
var d2_url = "http://localhost:5000/graph";
var d3_url = "http://localhost:5000/index";
var non_url = "http://localhost:5000/res";
var data = {};
$('#t1').click(function(event) {
	/* Act on the event */
	data = {"type":1};
	send(data);
});

$('#t2').click(function(event) {
	/* Act on the event */
	data = {"type":2};
	send(data);
});

$('#t3').click(function(event) {
	/* Act on the event */
	data = {"type":3};
	send(data);
});

$("#submit11").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var dof = $("#dof").val();
	data = {"nodes":nodes,"dof":dof};
	console.log(data);
    send(data);
    window.location.assign(d2_url);

});
$("#submit12").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var dof = $("#dof").val();
	data = {"nodes":nodes,"dof":dof};
	console.log(data);
    send(data);
    window.location.assign(d3_url);
    
});
$("#submit13").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var dof = $("#dof").val();
	data = {"nodes":nodes,"dof":dof};
	console.log(data);
    send(data);
    window.location.assign(non_url);
});


$("#submit21").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var p1 = $("#p1").val();
	data = {"nodes":nodes,"er_p":p1};
	console.log(data);
    send(data);
    window.location.assign(d2_url);
});
$("#submit22").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var p1 = $("#p1").val();
	data = {"nodes":nodes,"er_p":p1};
	console.log(data);
    send(data);
    window.location.assign(d3_url);
});
$("#submit23").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var p1 = $("#p1").val();
	data = {"nodes":nodes,"er_p":p1};
	console.log(data);
    send(data);
    window.location.assign(non_url);
});


$("#submit31").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var neb = $("#neb").val();
	var p2 = $("#p2").val();
	data = {"nodes":nodes,"neb":neb,"ws_p":p2};
	console.log(data);
    send(data);
    window.location.assign(d2_url);
});
$("#submit32").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var neb = $("#neb").val();
	var p2 = $("#p2").val();
	data = {"nodes":nodes,"neb":neb,"ws_p":p2};
	console.log(data);
    send(data);
    window.location.assign(d3_url);
});
$("#submit33").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var neb = $("#neb").val();
	var p2 = $("#p2").val();
	data = {"nodes":nodes,"neb":neb,"ws_p":p2};
	console.log(data);
    send(data);
    window.location.assign(non_url);
});


$("#submit41").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var edges = $("#edges").val();
	data = {"nodes":nodes,"edges":edges};
	console.log(data);
    send(data);
    window.location.assign(d2_url);
});
$("#submit42").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var edges = $("#edges").val();
	data = {"nodes":nodes,"edges":edges};
	console.log(data);
    send(data);
    window.location.assign(d3_url);
});
$("#submit43").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var edges = $("#edges").val();
	data = {"nodes":nodes,"edges":edges};
	console.log(data);
    send(data);
    window.location.assign(non_url);
});

function send(data){
	console.log(data);
	$.ajax({
		url: cur_url,
		type: 'POST',
		dataType: 'json',
		data: data,
	})
	.done(function(result) {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}