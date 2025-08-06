from flask import request, jsonify
from googletrans import Translator
import json

translator = Translator()

def handler(request):
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        return '', 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    
    if request.method == 'POST':
        try:
            # Parse JSON data
            if hasattr(request, 'get_json'):
                data = request.get_json()
            else:
                data = json.loads(request.data.decode('utf-8'))
            
            if not data:
                return jsonify({
                    'success': False,
                    'error': 'No JSON data provided'
                }), 400, {'Access-Control-Allow-Origin': '*'}
            
            text = data.get('text', '').strip()
            source_lang = data.get('source_lang', 'auto')
            target_lang = data.get('target_lang', 'en')
            
            if not text:
                return jsonify({
                    'success': False,
                    'error': 'Text field is required and cannot be empty'
                }), 400, {'Access-Control-Allow-Origin': '*'}
            
            if not target_lang:
                return jsonify({
                    'success': False,
                    'error': 'Target language is required'
                }), 400, {'Access-Control-Allow-Origin': '*'}
            
            # Perform translation
            if source_lang == 'auto':
                result = translator.translate(text, dest=target_lang)
                detected_lang = result.src
            else:
                result = translator.translate(text, src=source_lang, dest=target_lang)
                detected_lang = source_lang
            
            response = {
                'success': True,
                'translated_text': result.text,
                'original_text': text,
                'source_lang': detected_lang,
                'target_lang': target_lang
            }
            
            return jsonify(response), 200, {'Access-Control-Allow-Origin': '*'}
            
        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'Translation failed: {str(e)}'
            }), 500, {'Access-Control-Allow-Origin': '*'}
    
    return jsonify({'error': 'Method not allowed'}), 405, {'Access-Control-Allow-Origin': '*'}