'''
Created on May 30, 2017

@author: haopeng
'''

from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
from GenerateGraph import generate
app = Flask(__name__)
global G
@app.route('/',methods = ['GET','POST'])
def choose():
    global G
    if request.method =="POST":
        data = request.form
        nodes = data.get("nodes").__str__()
        dof = data.get("dof").__str__()
        er_p = data.get("er_p").__str__()
        ws_p = data.get("ws_p").__str__()
        neb = data.get("neb").__str__()
        edges = data.get("edges").__str__()
        '''
        print data
        print nodes
        print dof 
        print er_p
        print ws_p
        print neb
        print edges
        '''
        if nodes!="None" and dof!='None':
            gen = generate(int(nodes))
            G=gen.RG(int(dof))
            
        if nodes!="None" and er_p!='None':
            gen = generate(int(nodes))
            G=gen.ER(float(er_p))
            
        if nodes!="None" and neb!='None' and ws_p!='None':
            gen = generate(int(nodes))
            G=gen.WS(neb, float(ws_p))
            
        if nodes!="None" and edges!='None':
            gen = generate(int(nodes))
            G=gen.BA(int(edges))
        return jsonify({"go":True})
    else:
        return render_template("init.html")

@app.route('/graph',methods = ['GET','POST'])
def graph():
    gen = generate(1)
    info = gen.info(G)
    if request.method =="POST":
        data = request.form
        network_type =  data.get("type").__str__()
        print data
        print network_type

        if network_type =="attack":
            G1 = gen.attack(info["top10"], G)
            info = gen.info(G1)
        elif network_type =="failure":
            G2 = gen.failure(info["size"], G)[0]
            info = gen.info(G2)
        return jsonify(info)
    else:
        return render_template("graph.html")

@app.route('/index',methods=['GET','POST'])
def graph_3d():
    gen = generate(1)
    info = gen.info(G)
    if request.method =="POST":
        data = request.form
        network_type =  data.get("type").__str__()
        print data
        print network_type
        if network_type =="attack":
            attack = gen.attack(info["top10"], G)
            G1 = attack[0]
            arr = attack[1]
            info = gen.info(G1)
            info["arr"] = arr 
        elif network_type =="failure":
            failure = gen.failure(info["size"], G)
            G2 = failure[0]
            arr = failure[1]
            info = gen.info(G2)
            info["arr"] = arr 
        #print info
        return jsonify(info)
    else:
        return render_template("index.html")
    
@app.route('/res',methods=['GET','POST'])
def graph_res():
    gen = generate(1)
    info = gen.info(G)
    if request.method =="POST":
        data = request.form
        network_type =  data.get("type").__str__()
        print data
        print network_type
        if network_type =="attack":
            attack = gen.attack(info["top10"], G)
            G1 = attack[0]
            arr = attack[1]
            info = gen.info(G1)
            info["arr"] = arr 
        elif network_type =="failure":
            failure = gen.failure(info["size"], G)
            G2 = failure[0]
            arr = failure[1]
            info = gen.info(G2)
            info["arr"] = arr 
        #print info
        return jsonify(info)
    else:
        return render_template("res.html")
    
@app.route('/api',methods=['GET','POST'])
def api():
    gen = generate(1)
    info = gen.info(G)
    if request.method =="POST":
        return jsonify(info);
    else:
        return render_template("api.html")
    
    
if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port = 5000)