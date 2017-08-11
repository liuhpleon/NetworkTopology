'''
Created on May 30, 2017

@author: haopeng
'''
import networkx as nx
import operator
import random
class generate():
    def __init__(self,node):
        self.node = node
    
    def RG(self,dof):
        RG = nx.random_graphs.random_regular_graph(dof,self.node)
        return RG
    
    def ER(self,prob):
        ER = nx.random_graphs.erdos_renyi_graph(self.node,prob)
        return ER
    
    def WS(self,neb,prob):
        WS = nx.random_graphs.watts_strogatz_graph(self.node,neb,prob)
        return WS
    
    def BA(self,edges):
        BA= nx.random_graphs.barabasi_albert_graph(self.node,edges)
        return BA
    
    def Real_Graph(self,edges):
        return None 
    
    def get_graph(self,G):
        graph = {}
        for i in G.edge:
            array = []
            for key in G.edge.get(i):
                array.append(key)
            graph[i] = array
        return graph
    
    def avg_sp(self,G):
        path = nx.average_shortest_path_length(G)
        return path
    
    def max_ten_dof(self,G):
        graph = self.get_graph(G)
        graphinfo = {}
        for i in graph.keys():
            graphinfo[i] = len(graph[i])
        arr = sorted(graphinfo.items(), key=operator.itemgetter(1),reverse=True)
        i = 0
        res = []
        while i<10:
            res.append(arr[i])
            i = i+1
        return res
    
    def attack(self,arr,G):
        G1 = G.copy()
        array = []
        for a in arr:
            G1.remove_node(a[0])
            array.append(a[0])
        print array
        return (G1,array)
    
    def failure(self,size,G):
        G1 = G.copy()
        arr = random.sample(range(0, size), 10)
        for a in arr:
            G1.remove_node(a)
            
        print arr
        return (G1,arr)
    
    def info(self,G):
        info = {}
        info["graph"] = self.get_graph(G)
        info["size"] = len(nx.nodes(G))
        info["connected"] = nx.is_connected(G)
        info["components"] = nx.number_connected_components(G)
        info["top10"] = self.max_ten_dof(G)
        info["avg_sp"] = None
        if info["connected"]==True:
            info["avg_sp"] = self.avg_sp(G) 
        return info
'''           
size = 500
a = generate(size)
g1 = a.ER(0.02)
print a.info(g1)

top10 = a.max_ten_dof(g1)
g2 = a.attack(top10, g1)
print top10
print a.info(g2)

res = a.failure(size, g1)
g3 = res[0]
arr = res[1]
print arr
print a.info(g3)
'''

