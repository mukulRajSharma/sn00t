from flask import Flask, json, render_template, jsonify, make_response, request
from packet_sniffer import Sniffer
# from flask_cors import CORS
from json import dumps
import socket  # reverse DNS lookup

app = Flask(__name__, template_folder='../client/')
# CORS(app)


@app.route('/', methods=['GET'])
def home():
    pass


@app.route('/sniffer', methods=['GET', 'POST'])
def sniffer():
    print("API CALL")
    s = Sniffer()
    print("SNIFFER OBJECT CREATED")
    s.run()
    print("SNIFF RUN ENDED")
    info = s.getData()
    print('FINISHEED DATA FETCH.. ')
    ret = []
    t_list = []
    for i, j in enumerate(info):
        tmp = {}
        tmp['id'] = i+1
        tmp['time'] = j[0].strftime("%H:%M:%S")
        t_list.append(tmp['time'])
        # try:
        tmp['ip1'] = j[2]  # + '('+socket.gethostbyaddr(j[2])[0]+')'
        # except:
        #     tmp['ip1'] = j[2]

        # try:
        tmp['ip2'] = j[3]  # + '('+socket.gethostbyaddr(j[3])[0] + ')'
        # except:
        #     tmp['ip2'] = j[3]
        # tmp['protocol'] = j[1]
        # try:
        tmp['src_port'] = j[4]  # + '('+socket.getservbyport(j[4])+')'
        # except:
        #     tmp['src_port'] = 'n/a'
        # try:
        tmp['dst_port'] = j[5]  # + '('+socket.getservbyport(j[5])+')'
        # except:
        #     tmp['dst_port'] = 'n/a'
        # try:
        tmp['data'] = str(j[6])
        # except:
        #     tmp['data'] = 'n/a'
        ret.append(tmp)
    print('PROCESSING GRAPH DATA')
    t_list = set(t_list)
    last = []
    for t in t_list:
        tmp = {}
        tmp['time'] = t
        tmp['count'] = 0
        for i in ret:
            if i['time'] == t:
                tmp['count'] += 1
        last.append(tmp)
    print(last)
    ret.append(last)
    print('DONE, SENDING TO UI...')
    return make_response(dumps(ret))
