from flask import Flask, request, jsonify, send_from_directory, session
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
app.secret_key = "super-secret-key-123"  
CORS(app, supports_credentials=True)  

# Fonction pour récupérer les infos utilisateur
def get_user_info(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("SELECT username, pin FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()
    return user

@app.route('/update-pin', methods=['POST'])
def update_pin():
    if 'username' not in session:
        return jsonify({'success': False, 'message': 'Utilisateur non connecté.'}), 401

    data = request.get_json()
    new_pin = data.get('newPin')

    if not new_pin or not new_pin.isdigit() or len(new_pin) != 4:
        return jsonify({'success': False, 'message': 'Le code PIN doit contenir 4 chiffres.'}), 400

    try:
        with sqlite3.connect("users.db") as conn:
            cursor = conn.cursor()

            # Vérifie si le PIN existe déjà
            cursor.execute("SELECT * FROM users WHERE pin = ?", (new_pin,))
            if cursor.fetchone():
                return jsonify({'success': False, 'message': 'Ce code est déjà utilisé.'})

            # Met à jour le code PIN de l’utilisateur connecté
            cursor.execute("UPDATE users SET pin = ? WHERE username = ?", (new_pin, session['username']))
            conn.commit()

        return jsonify({'success': True})
    except Exception as e:
        print("Erreur serveur:", e)
        return jsonify({'success': False, 'message': 'Erreur serveur.'}), 500

@app.route("/me", methods=["POST"])
def get_current_user():
    if 'username' not in session:
        return jsonify({"success": False, "message": "Utilisateur non connecté"}), 401

    username = session['username']
    user = get_user_info(username)
    if user:
        return jsonify({
            "success": True,
            "username": user[0],
            "pin": user[1]
        })
    else:
        return jsonify({"success": False, "message": "Utilisateur non trouvé"}), 404

@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

@app.route('/register.html')
def register_page():
    return send_from_directory('static', 'register.html')

@app.route('/dashboard.html')
def dashboard_page():
    return send_from_directory('static', 'dashboard.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = c.fetchone()
    conn.close()

    if user:
        session['username'] = username  # 🔐 Enregistre l'utilisateur en session
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # 🔁 Supprime la session
    return jsonify({"success": True})

@app.route('/verify-pin', methods=['POST'])
def verify_pin():
    data = request.get_json()
    pin = data.get('pin')

    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE pin = ?", (pin,))
    user = c.fetchone()
    conn.close()

    if user:
        return jsonify(success=True)
    else:
        return jsonify(success=False)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    pin = data.get('pin')

    if not username or not password or not pin:
        return jsonify({"success": False, "message": "Champs vides"}), 400

    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (username, password, pin) VALUES (?, ?, ?)", (username, password, pin))
        conn.commit()
        conn.close()
        return jsonify({"success": True})
    except sqlite3.IntegrityError:
        return jsonify({"success": False, "message": "Nom d'utilisateur déjà utilisé"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
