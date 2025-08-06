from flask import Flask, send_from_directory
from flask_cors import CORS
from src.routes.translation import translation_bp
import os

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'your-secret'

CORS(app)
app.register_blueprint(translation_bp, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_path = app.static_folder
    if path and os.path.exists(os.path.join(static_path, path)):
        return send_from_directory(static_path, path)
    index_path = os.path.join(static_path, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(static_path, 'index.html')
    return "index.html not found", 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
