var Drawing = Drawing || {};
//var graphdata = mygraph.graph
var attack = {"node":[1,2,3]};
Drawing.SimpleGraph = function(options,mygraph) {
  options = options || {};

  this.layout = options.layout || "2d";
  this.layout_options = options.graphLayout || {};
  this.show_stats = options.showStats || false;
  this.show_info = options.showInfo || false;
  this.show_labels = options.showLabels || false;
  this.selection = options.selection || false;
  this.limit = options.limit || 10;
  this.nodes_count = options.numNodes || 20;
  this.edges_count = options.numEdges || 10;

  var camera, controls, scene, renderer, interaction, geometry, object_selection;
  var stats;
  var info_text = {};
  var graph = new Graph({limit: options.limit});

  var geometries = [];

  var that=this;

  init();
  var graphdata = createGraph(mygraph);
  animate();

  function init() {
    // Three.js initialization
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000000);
    camera.position.z = 5000;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 5.2;
    controls.panSpeed = 1;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = new THREE.Scene();

    // Create node selection, if set
    
    if(that.selection) {
      object_selection = new THREE.ObjectSelection({
        domElement: renderer.domElement,
        selected: function(obj) {
          
          if(obj !== null) {
            info_text.select = "Object " + obj.id;
          } else {
            delete info_text.select;
          }

        },
        clicked: function(obj) {
        }
      });
      
    }

    document.body.appendChild( renderer.domElement );

    if(that.show_info) {
      /*
      var info = document.createElement("div");
      var id_attr = document.createAttribute("id");
      id_attr.nodeValue = "graph-info";
      info.setAttributeNode(id_attr);
      document.body.appendChild( info );
      */
    }

  }

  /**
   *  Creates a graph with random nodes and edges.
   *  Number of nodes and edges can be set with
   *  numNodes and numEdges.
   */
  function createGraph(graphdata) {
    for(var index in graphdata){
      var node_index = parseInt(index);
      var array = graphdata[index];
      
      var node = new Node(node_index);
      //console.log(node.id);
      node.data.title = "node "+node.id;
      node.dof = array.length;
      graph.addNode(node);
      drawNode(node);
    }
    for(var index in graphdata){
      var node_index = parseInt(index);
      var array = graphdata[index];
      for(var i in array){
        var neb = parseInt(array[i]);
        var node1 = graph.getNode(node_index);
        var node2 = graph.getNode(neb);
        graph.addEdge(node1,node2);
        drawEdge(node1, node2);
      } 
    }
    that.layout_options.width = that.layout_options.width || 2000;
    that.layout_options.height = that.layout_options.height || 2000;
    that.layout_options.iterations = that.layout_options.iterations || 100000;
    that.layout_options.layout = that.layout_options.layout || that.layout;
    graph.layout = new Layout.ForceDirected(graph, that.layout_options);
    graph.layout.init();
    info_text.nodes = "Nodes " + graph.nodes.length;
    info_text.edges = "Edges " + graph.edges.length;
    return graphdata;
  }


  /**
   *  Create a node object and add it to the scene.
   */
  function drawNode(node) {
    var draw_object = new THREE.Mesh(new THREE.SphereGeometry(5*node.dof+50, 60, 60 ), new THREE.MeshBasicMaterial( {  color:0x191970, opacity: 0.75 } ) );
    draw_object.name = node.id;
    var label_object;
    //console.log(draw_object.name);
    if(that.show_labels) {
      label_object = new THREE.Label(node.id);
      node.data.label_object = label_object;
      scene.add( node.data.label_object );
    }

    var area = 5000;
    draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);
    draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);
    draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    scene.add( node.data.draw_object );
  }
  /**
   *  Create an edge object (line) and add it to the scene.
   */
  function drawEdge(source, target) {
      material = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 1, linewidth: 0.0001 });
      //material.name = source.
      var tmp_geo = new THREE.Geometry();
      tmp_geo.vertices.push(source.data.draw_object.position);
      tmp_geo.vertices.push(target.data.draw_object.position);
      line = new THREE.LineSegments( tmp_geo, material );
      line.name=source.id+"->"+target.id;
      //console.log(line.name);
      line.scale.x = line.scale.y = line.scale.z = 1;
      line.originalScale = 1;

      // NOTE: Deactivated frustumCulled, otherwise it will not draw all lines (even though
      // it looks like the lines are in the view frustum).
      line.frustumCulled = false;

      geometries.push(tmp_geo);

      scene.add(line);
  }
  this.attack = function(attack){
    //console.log("drop");
    for(var i in attack){
      var object = scene.getObjectByName(attack[i]);
      object.material.color.setHex(0xff0001);
      cur_node = attack[i];
      for(var j in graphdata[cur_node]){
        neb_node = graphdata[cur_node][j];
        name1 = cur_node+"->"+neb_node;
        name2 = neb_node+"->"+cur_node;
        var object1 = scene.getObjectByName(name1);
        var object2 = scene.getObjectByName(name2);
        scene.remove(object1);
         scene.remove(object2);
      }
    }
    return attack;
  }
  this.failure = function(attack){
    //console.log("drop");
    for(var i in attack){
      var object = scene.getObjectByName(attack[i]);
      object.material.color.setHex(0xFFFF00);
      cur_node = attack[i];
      for(var j in graphdata[cur_node]){
        neb_node = graphdata[cur_node][j];
        name1 = cur_node+"->"+neb_node;
        name2 = neb_node+"->"+cur_node;
        var object1 = scene.getObjectByName(name1);
        var object2 = scene.getObjectByName(name2);
        scene.remove(object1);
         scene.remove(object2);
      }
    }
    return attack;
  }
  this.recover = function(){
    console.log("recover");
    for(var i in graphdata){
      cur_node = parseInt(i);
      var object = scene.getObjectByName(cur_node);
      object.material.color.setHex( 0x191970 );
      for(var j in graphdata[cur_node]){
        neb_node = graphdata[cur_node][j];
        var n01 = graph.getNode(cur_node);
        var n02 = graph.getNode(neb_node);
        name1 = cur_node+"->"+neb_node;
        name2 = neb_node+"->"+cur_node;
        var object1 = scene.getObjectByName(name1);
        var object2 = scene.getObjectByName(name2);
        if(object1==null){
          drawEdge(n01, n02);
        }
        if(object2==null){
          drawEdge(n02, n01);
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
    /*
    setTimeout(function(){
      graph.layout.stop_calculating();
    }, 1000);
    */
    
  }


  function render() {
    var i, length, node;

    // Generate layout if not finished
    if(!graph.layout.finished) {
      info_text.calc = "<span style='color: red'>Calculating layout...</span>";
      graph.layout.generate();
    } else {
      info_text.calc = "";
    }

    // Update position of lines (edges)
    for(i=0; i<geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }


    // Show labels if set
    // It creates the labels when this options is set during visualization
    if(that.show_labels) {
      length = graph.nodes.length;
      for(i=0; i<length; i++) {
        node = graph.nodes[i];
        if(node.data.label_object !== undefined) {
          node.data.label_object.position.x = node.data.draw_object.position.x;
          node.data.label_object.position.y = node.data.draw_object.position.y - 100;
          node.data.label_object.position.z = node.data.draw_object.position.z;
          node.data.label_object.lookAt(camera.position);
        } else {
          var label_object;
          if(node.data.title !== undefined) {
            label_object = new THREE.Label(node.data.title, node.data.draw_object);
          } else {
            label_object = new THREE.Label(node.id, node.data.draw_object);
          }
          node.data.label_object = label_object;
          scene.add( node.data.label_object );
        }
      }
    } else {
      length = graph.nodes.length;
      for(i=0; i<length; i++) {
        node = graph.nodes[i];
        if(node.data.label_object !== undefined) {
          scene.remove( node.data.label_object );
          node.data.label_object = undefined;
        }
      }
    }

    // render selection
    if(that.selection) {
      object_selection.render(scene, camera);
    }

    renderer.render( scene, camera );
  }
}

