from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator

translation_bp = Blueprint('translation_bp', __name__)

@translation_bp.route('/translate', methods=['POST'])
def translate_text():
    try:
        data = request.get_json()
        text = data.get('text')
        source_lang = data.get('source_lang')
        target_lang = data.get('target_lang')

        if not text or not source_lang or not target_lang:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400

        translated = GoogleTranslator(source=source_lang, target=target_lang).translate(text)

        return jsonify({
            'success': True,
            'translated_text': translated
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
