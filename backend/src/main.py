from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from config import Config


app = Flask(__name__)
CORS(app)


@app.route('/generate', methods=['POST'])
def generate():
    # APIキーのチェック
    api_key = request.headers.get('X-API-Key')
    if not api_key or api_key != Config.API_KEY:
        return jsonify({'error': 'Invalid or missing API key'}), 401

    try:
        genai.configure(api_key=Config.GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        
        data = request.get_json()
        prompt = data.get('prompt')
        
        response = model.generate_content(prompt)
        
        return jsonify({
            'response': response.text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
