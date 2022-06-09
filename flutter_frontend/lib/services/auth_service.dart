import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class AuthService {
  Dio dio = Dio();

  // login user
  login(email, password) async {
    log("email: $email");
    log("password: $password");
    try {
      return await dio.post(
          "https://flutter-backendapp.herokuapp.com/authenticate",
          data: {'email': email, 'password': password},
          options: Options(contentType: Headers.formUrlEncodedContentType));
    } on DioError catch (e) {
      log('error: ${e.response?.data[1]}');
      Fluttertoast.showToast(
        msg: e.response?.data['msg'],
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16,
      );
    }
  }

  // add user to db
  addUser(name, email, password) async {
    log("name: $name");
    log("email: $email");
    log("password: $password");

    try {
      return await dio.post("https://flutter-backendapp.herokuapp.com/addUser",
          data: {'name': name, 'email': email, 'password': password},
          options: Options(contentType: Headers.formUrlEncodedContentType));
    } on DioError catch (e) {
      log('error: ${e.response?.data[1]}');
      Fluttertoast.showToast(
        msg: e.response?.data['msg'],
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16,
      );
    }
  }

  // get user info
  getUserInfo(token) async {
    log("token: $token");

    try {
      dio.options.headers['Authorization'] = 'Bearer $token';
      return await dio.get("https://flutter-backendapp.herokuapp.com/getInfo");
    } on DioError catch (e) {
      log('error: ${e.response?.data[1]}');
      Fluttertoast.showToast(
        msg: e.response?.data['msg'],
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16,
      );
    }
  }
}
