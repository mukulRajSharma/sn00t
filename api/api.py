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
    ret = []

    for i, j in enumerate(info):
        tmp = {}
        tmp['id'] = i+1
        tmp['time'] = j[0].strftime("%H:%M:%S")
        tmp['ip1'] = j[2]
        tmp['ip2'] = j[3]
        tmp['protocol'] = j[1]
        tmp['src_port'] = j[4]
        tmp['dst_port'] = j[5]
        tmp['data'] = str(j[6])
        ret.append(tmp)
    return make_response(dumps(ret))
