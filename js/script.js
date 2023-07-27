const num1 = document.querySelector('.left-span')
const num2 = document.querySelector('.right-span')
const resultSpan = document.querySelector('.bottom-display')
const operatorSpan = document.querySelector('.operator-span')
const equalBtn = document.getElementById('equal')
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.getElementById('delete')
const dotBtn = document.getElementById('decimal');
const negativeBtn =  document.getElementById('negative')

document.querySelectorAll('#number').forEach(item => {
  item.addEventListener('click', event => {
      updateNum(item.textContent)
  })
})

function updateNum(value){
  return operatorSpan.textContent == '' ? num1.textContent += value : num2.textContent += value;
}

document.querySelectorAll('.operator').forEach(item => {
  item.addEventListener('click', event => {
      updateOperator(item.textContent)
  })
})

function updateOperator(value){
  if (num1.textContent != '' && num2.textContent == ''){
  operatorSpan.textContent = value;
  } else if (num1.textContent != '' && num2.textContent != ''){
      let calculate = roundResult(operate(operatorSpan.textContent, num1.textContent, num2.textContent));
      num1.textContent = calculate;
      resultSpan.textContent = calculate;
      operatorSpan.textContent = value;
      num2.textContent = '';
  } else if (num1.textContent == '' && resultSpan.textContent != ''){
      num1.textContent = resultSpan.textContent;
      operatorSpan.textContent = value;
      
  }
}

// This help to round the result up to 3 digits
function roundResult(halfProduct){
  halfProduct *= 1000;
  halfProduct = Math.round(halfProduct)
  return halfProduct / 1000
}

equalBtn.onclick = function(){
  if (num1.textContent != '' && operatorSpan.textContent != '' && num2.textContent != ''){
      let answer = roundResult(operate(operatorSpan.textContent, num1.textContent, num2.textContent));
      num1.textContent = '';
      operatorSpan.textContent = '';
      num2.textContent = '';
      resultSpan.textContent = answer;
  }
}
// Clear display
clearBtn.onclick = function(){
    num1.textContent = '';  
    operatorSpan.textContent = '';
    num2.textContent = '';
    resultSpan.textContent = '';
}
// Function that remove last digit if written by mistake

backspaceBtn.onclick = function(){
    if (num2.textContent != ''){
        num2.textContent = num2.textContent.slice(0,-1);
    } else if (operatorSpan.textContent != ''){
        operatorSpan.textContent = '';
    } else if (num1.textContent != ''){
        num1.textContent = num1.textContent.slice(0,-1);
    } 
}
// Function that help to write a float number.
dotBtn.onclick = function(){
    if (num1.textContent == ''){
        num1.textContent += '0.';
    } else if (num1.textContent != '' && operatorSpan.textContent == ''){
        let dotCheck = num1.textContent.split('');
        if (!dotCheck.includes('.')){
            console.log(dotCheck)
            num1.textContent += '.';
        }  
    } else if (operatorSpan.textContent != '' && num2.textContent == ''){
        num2.textContent += '0.';
    } else {
        let dotCheck = num2.textContent.split('');
        if (!dotCheck.includes('.')) {
            num2.textContent += '.'
        }
    } 
}

// A function that helps to toggle between a positive and a negative number
negativeBtn.onclick = function(){
  let negative = '-';

  if(num1.textContent != '' && operatorSpan.textContent == ''){
    let check = num1.textContent.split('')
    if(check.includes('-') != true){
      num1.textContent = negative + num1.textContent
    }else if(check.includes('-') == true){
      num1.textContent = num1.textContent.substring(1)
    }
  }
  
  if(operatorSpan.textContent != '' && num2.textContent != ''){
    let check = num2.textContent.split('')
    if(check.includes('-') != true){
      num2.textContent = negative + num2.textContent
    }else if(check.includes('-') == true){
      num2.textContent = num2.textContent.substring(1)
    }
  }
}


function operate(operator, n1, n2){
  const num1 = parseFloat(n1)
  const num2 = parseFloat(n2)
  switch (operator){
    case '+':
        return num1 + num2;
        break;
    case '-':
        return num1 - num2;
        break;
    case 'x':
        return num1 * num2;
        break;
    case '*':
        return num1 * num2;
    case '/':
        return num1 / num2;
        break;
  }
}
