import 'package:flutter/material.dart';
import 'package:flutter_frontend/pages/home.dart';
import 'package:flutter_frontend/pages/login.dart';
import 'package:flutter_frontend/pages/register.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Backend App',
      routes: {
        "loginPage": (context) => const Login(),
        "registerPage": (context) => const Register(),
        "homePage": (context) => const Home(),
      },
      initialRoute: 'homePage',
      home: const Home(),
    );
  }
}

// for back
// Navigator.of(context).popUntil(ModalRoute.withName('loginPage'))
