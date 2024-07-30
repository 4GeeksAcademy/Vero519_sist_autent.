"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    print(login)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #cuando me llega la info del usuario, consulto a la bd si la informacion es correcta o no
    user_query = User.query.filter_by(email=email).first() #en mi solicitud hago un filtro con email
    # print(user_query.email)
    if user_query is None:
        return jsonify({"msg":"email no registrado"}), 404

    if email != user_query.email or password != user_query.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"access_token":
    access_token,"logged":True})


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    # Access the identity of the current user with get_jwt_identity
    #con la identidad valida del usuario hago a User una consulta para retornar una respuesta
    #con la informacion de usuario propiamente dicho
    current_user = get_jwt_identity() #verifica si mi correo tiene una identidad
    print(current_user)
    return jsonify(logged_in_as=current_user), 200 #me retorna current_user= email

@api.route("/valid_token", methods=["GET"])
@jwt_required()
def valid_token():
    # Access the identity of the current user with get_jwt_identity
    #con la identidad valida del usuario hago a User una consulta para retornar una respuesta
    #con la informacion de usuario propiamente dicho
    current_user = get_jwt_identity() #verifica si mi correo tiene una identidad
    user_exist = User.query.filter_by(email = current_user).first
    print(user_exist)
    # print(current_user)
    if user_exist is None:
        return jsonify (logged = False), 404
    return jsonify(logged = True), 200 

@api.route("/register", methods=["POST"])
# @jwt_required()
def add_new_user():
    # print(add_new_user)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #cuando me llega la info del usuario, consulto a la bd si la informacion es correcta o no
    user_query = User.query.filter_by(email=email).first() #en mi solicitud hago un filtro con email
    if user_query is None:
        new_user= User(
            email=email,
            password=password,
            is_active= True
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg":"Tu usuario ha sido creado"}), 201

    return jsonify({"msg":"El usuario ya existe"}), 404

