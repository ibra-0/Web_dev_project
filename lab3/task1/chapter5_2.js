let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );

alert( Math.round(6.35 * 10) / 10 ); 

function readNumber() {
    let num;
  
    do {
      num = prompt("Enter a number please?", 0);
    } while ( !isFinite(num) );
  
    if (num === null || num === '') return null;
  
    return +num;
  };
  
  alert(`Read: ${readNumber()}`);


let i = 0;
  while (i < 11) {
    i += 0.2;
    if (i > 9.8 && i < 10.2) alert( i );
  }//That’s because i would never equal 10

function random(min, max) {
    return min + Math.random() * (max - min);
  }
  
  alert( random(1, 5) );
  alert( random(1, 5) );
  alert( random(1, 5) );

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  
  alert( randomInteger(1, 3) );