from flask import request, jsonify

def handler(request):
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        return '', 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    
    if request.method == 'GET':
        return jsonify({
            'success': True,
            'message': 'Translation service is running',
            'service': 'Google Translate (unofficial)'
        }), 200, {'Access-Control-Allow-Origin': '*'}
    
    return jsonify({'error': 'Method not allowed'}), 405, {'Access-Control-Allow-Origin': '*'}