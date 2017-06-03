'''
Created on May 30, 2017

@author: haopeng
'''
file = open("/home/haopeng/soc-dolphins.mtx")

line = file.readline();
while(len(line)>0):
    print line
    line = file.readline()