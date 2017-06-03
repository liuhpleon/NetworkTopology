var cur_url = "http://localhost:5000/";
var next_url = "http://localhost:5000/graph";
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

$("#submit1").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var dof = $("#dof").val();
	data = {"nodes":nodes,"dof":dof};
	console.log(data);
    send(data);
});
$("#submit2").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var p1 = $("#p1").val();
	data = {"nodes":nodes,"er_p":p1};
	console.log(data);
    send(data);
});
$("#submit3").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var neb = $("#neb").val();
	var p2 = $("#p2").val();
	data = {"nodes":nodes,"neb":neb,"ws_p":p2};
	console.log(data);
    send(data);
});
$("#submit4").click(function(event) {
	/* Act on the event */
	var nodes = $("#nodes").val();
	var edges = $("#edges").val();
	data = {"nodes":nodes,"edges":edges};
	console.log(data);
    send(data);
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
		window.location.assign(next_url);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}