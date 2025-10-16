from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///placas.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
db = SQLAlchemy(app)

# Modelo do banco
class Placa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    descricao = db.Column(db.String(200))
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    imagem = db.Column(db.String(200))
    data = db.Column(db.DateTime, default=datetime.now)
    status = db.Column(db.String(50), default="pendente")

db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/uploads/<path:filename>')
def upload_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/placas', methods=['GET'])
def listar():
    placas = Placa.query.all()
    return jsonify([
        {
            'id': p.id,
            'titulo': p.titulo,
            'descricao': p.descricao,
            'lat': p.lat,
            'lng': p.lng,
            'imagem': p.imagem,
            'status': p.status,
            'data': p.data.strftime('%d/%m/%Y %H:%M')
        }
        for p in placas
    ])

@app.route('/api/placas', methods=['POST'])
def adicionar():
    titulo = request.form.get('titulo')
    descricao = request.form.get('descricao')
    lat = request.form.get('lat')
    lng = request.form.get('lng')
    imagem = None

    if 'imagem' in request.files:
        file = request.files['imagem']
        if file.filename:
            path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(path)
            imagem = file.filename

    nova = Placa(titulo=titulo, descricao=descricao, lat=lat, lng=lng, imagem=imagem)
    db.session.add(nova)
    db.session.commit()

    return jsonify({'mensagem': 'Placa registrada com sucesso!'})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)