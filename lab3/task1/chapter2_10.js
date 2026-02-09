/*if ("0") {
  alert( 'Hello' );
}//yes*/

//2
let name = prompt("What is the “official” name of JavaScript?", "");
if (name === "ECMAScript") {
    alert("Right!");
} else {
    alert("You don't know? ECMAScript!");
}

//3
let number = prompt('Your number?', 0);
if(number > 0) {
    alert(1);
} else if (number < 0) {
    alert(-1);
} else {
    alert(0);
}

//4
let result = a + b < 4 ? 'Below' : 'Over';

//5
let message = (login == 'Employee') ? 'Hello' :
    (login == 'Director') ? 'Greetings' :
        (login == '') ? 'No login' : '';