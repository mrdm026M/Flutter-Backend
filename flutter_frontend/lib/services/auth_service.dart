import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class AuthService {
  Dio dio = Dio();

  login(email, password) async {
    log("email: $email");
    log("password: $password");
    try {
      return await dio.post(
        "https://flutter-backendapp.herokuapp.com/authenticate",
        data: {'email': email, 'password': password},
      );
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
