import intel_comp
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
cors = CORS(app)

class intel(Resource):
    def get(self, question):
        return {'data': intel_comp.find_suggestion(question)}

api.add_resource(intel, '/intel_comp/<question>')

if __name__ == '__main__':
     app.run()