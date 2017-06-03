var nodes = [];
var edges = [];
var cur_url = "http://localhost:5000/graph";
var info = $("#info");
receive(null);

$("#attack").click(function(event) {
	/* Act on the event */
	var data = {"type":"attack"}
	console.log(data);
	receive(data);
});

$("#failure").click(function(event) {
	/* Act on the event */
	var data = {"type":"failure"}
	console.log(data);
	receive(data);
});

function receive(data){
	$.ajax({
		url: cur_url,
		type: 'POST',
		dataType: 'json',
		data: data,
	})
	.done(function(results) {
		console.log("success");
		var result = results.graph;
		var size = results.size;
		var connected = results.connected;
		var components = results.components;
		var avg_sp = results.avg_sp;
		var top10 = results.top10;
		info.text("");
		info.append("<div>the size of this graph is: "+size+"</div>");
		info.append("<div>the graph is connected: "+connected+"</div>");
		info.append("<div>the components of this graph is: "+components+"</div>");
		info.append("<em>the top 10 max d.o.f of this graph is:</em>");
		for(var i in top10){
		    info.append("<em>"+top10[i][0]+"("+top10[i][1]+")  ");
		}
		info.append("<div>the average shortest path of this graph is: "+avg_sp+"</div>");
		var num = result;
		for(var i in result){
			var node = i.toString();
			nodes.push({name:node});
			for(var neb in result[i]){
				neb = parseInt(result[i][neb]);
				i = parseInt(i);
				edges.push({ source : i  , target: neb });
			}
		}
		console.log(nodes);
		console.log(edges);
		generate_map(nodes,edges);

	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

function generate_map(nodes,edges){		
	var width = 1500;
	var height = 1500;
	var svg = d3.select("body")
			.append("svg")
			.attr("width",width)
			.attr("height",height);
	
	var force = d3.layout.force()
	                .nodes(nodes)		//指定节点数组
					.links(edges)		//指定连线数组
					.size([width,height])	//指定范围
					.linkDistance(300)	//指定连线长度
					.charge(-400);	//相互之间的作用力

	force.start();	//开始作用		
		//添加连线		
	var svg_edges = svg.selectAll("line")
					.data(edges)
					.enter()
					.append("line")
	     			.style("stroke","#ccc")
					.style("stroke-width",1);
		
	var color = d3.scale.category20();
				
		//添加节点			
	var svg_nodes = svg.selectAll("circle")
					.data(nodes)
					.enter()
					.append("circle")
					.attr("r",5)
					.style("fill",function(d,i){
						return color(1);
					})

		//添加描述节点的文字
	var svg_texts = svg.selectAll("text")
					.data(nodes)
					.enter()
					.append("text")
					.style("fill", "black")
					.attr("dx", 20)
					.attr("dy", 8)
					.text(function(d){
						return d.name;
					});
					

	force.on("tick", function(){	
	
		svg_edges.attr("x1",function(d){ return d.source.x; })
	        .attr("y1",function(d){ return d.source.y; })
			.attr("x2",function(d){ return d.target.x; })
	 		.attr("y2",function(d){ return d.target.y; });
			 
		svg_nodes.attr("cx",function(d){ return d.x; })
			 		.attr("cy",function(d){ return d.y; });

		svg_texts.attr("x", function(d){ return d.x; })
			 	.attr("y", function(d){ return d.y; });
	});
}