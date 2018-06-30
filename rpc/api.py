from flask import Flask, jsonify, request, Blueprint
from rpc import rpc


app = Flask(__name__)
blueprint = Blueprint('api', __name__)



@blueprint.route('/getinfo')
def getinfo():
    response = rpc.getinfo()
    return jsonify(response)



@blueprint.route('/listfunds')
def listfunds():
    response = rpc.listfunds()
    return jsonify(response)


@blueprint.route('/pay')
def pay():
    bolt11 = request.json['bolt11']
    response = rpc.pay(bolt11)
    return jsonify(response)


