function insert(value) {
  document.form1.inputvalue.value += value;
}

function equal() {
  let total = document.form1.inputvalue.value;
  if (total) {
    try {
      document.form1.inputvalue.value = eval(total);
    } catch {
      document.form1.inputvalue.value = "Error";
    }
  }
}

function backspace() {
  let inputvalue = document.form1.inputvalue.value;
  document.form1.inputvalue.value = inputvalue.slice(0, -1);
}

function clearScreen() {
  document.form1.inputvalue.value = "";
}

// Optional: keyboard support
document.addEventListener("keydown", function(event) {
  const display = document.form1.inputvalue;
  if (/[0-9+\-*/.]/.test(event.key)) {
    display.value += event.key;
  } else if (event.key === "Enter") {
    event.preventDefault();
    equal();
  } else if (event.key === "Backspace") {
    backspace();
  } else if (event.key === "Escape") {
    clearScreen();
  }
});
