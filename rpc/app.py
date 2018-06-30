from flask import Flask, jsonify, request
from werkzeug.exceptions import BadRequest
from rpc import rpc


app = Flask(__name__)


@app.route('/rpc', methods=['POST'])
def route():
    args = request.json.get('args', {})
    method_name = request.json['method']
    method = getattr(rpc, method_name)
    if not method:
        raise BadRequest('Method "%s" does not exist')
    response = method(**args)
    return jsonify(response)
