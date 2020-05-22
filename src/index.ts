import Interpreter from 'js-interpreter';

window.onload = main;

function main() {
  console.log("Hello world");

  let robot = {
    leftMotor: { power: 1 }
  };

  let script = "var curentPower = robotLeftMotorPower;" + 
  "var newPower = curentPower + 10;"+
  "setLeftMotorPower(newPower);";

  let interp = new Interpreter(script, (interpreter, globalObject) => {
    interpreter.setProperty(globalObject, 'robotLeftMotorPower', robot.leftMotor.power);

    var setLeftMotorPower = function (newPower) {
      robot.leftMotor.power = newPower;
    };

    interpreter.setProperty(globalObject, 'setLeftMotorPower',
      interpreter.createNativeFunction(setLeftMotorPower));
  });

  console.log("Robot Before", robot.leftMotor.power);
  interp.run();
  console.log("Robot After", robot.leftMotor.power);

  console.log("Value", interp.value);
}
