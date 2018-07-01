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
    try:
        response = method(**args)
    except ConnectionRefusedError as cr:
        print('Got ConnectionRefusedError; is lightningd running? {}'.format(cr)) # TODO: include socket path..
        return jsonify({'status': 'failure', 'detail': 'Connection to lightningd unsuccessful.'})
    except ValueError as ve:
        # pylightning exceptions
        return jsonify({'status': 'failure', 'detail': ve.args[0]})
    print('[app.py] {} returning with data {}'.format(method_name, response))
    print(method_name)
    print(args)
    return jsonify(response)
