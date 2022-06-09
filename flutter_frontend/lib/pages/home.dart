import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            homeButton(context, "loginPage", "Login"),
            const SizedBox(
              width: 20.0,
            ),
            homeButton(context, "registerPage", "Register"),
          ],
        ),
      ),
    );
  }
}

Widget homeButton(BuildContext context, String routePath, String buttonText) =>
    TextButton(
      style: TextButton.styleFrom(
        primary: Colors.blue,
        onSurface: Colors.red,
      ),
      onPressed: () {
        Navigator.pushNamed(context, routePath);
      },
      child: Text(buttonText),
    );
