const input = document.querySelector("input");
const output = document.querySelector(".output");

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const command = input.value.trim();

        printLine(`> ${command}`);
        handleCommand(command.toLowerCase());

        input.value = "";
    }
});

// imprime texto
function printLine(text) {
  const p = document.createElement("p");
  p.textContent = text;
  output.appendChild(p);

  smartScroll(); // usamos el nuevo sistema
}

// imprime HTML
function printHTML(id) {
  const template = document.getElementById(id);

  if (template) {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    output.appendChild(clone);
  }

  smartScroll();
}

// lógica de comandos
function handleCommand(cmd) {

  if (cmd === "help") {
    printLine("");
    printLine("available commands:");
    printLine("about");
    printLine("projects");
    printLine("contact");
    printLine("clear");

    forceScroll(); //  importante para comandos largos
  }

  else if (cmd === "about") {
    printLine("");
    printHTML("about");
    forceScroll();
  }

  else if (cmd === "projects") {
    printLine("");
    printHTML("projects");
    forceScroll();
  }

  else if (cmd === "contact") {
    printLine("");
    printHTML("contact");
    forceScroll();
  }

  else if (cmd === "clear") {
    output.innerHTML = "";
    printHTML("intro");
    forceScroll();
  }

  else if (cmd !== "") {
    printLine(`command not found: ${cmd}`);
    forceScroll();
  }
}

//  scroll inteligente (respeta si subís)
function smartScroll() {
  const isNearBottom =
    output.scrollHeight - output.scrollTop <= output.clientHeight + 50;

  if (isNearBottom) {
    output.scrollTo({
      top: output.scrollHeight,
      behavior: "smooth"
    });
  }
}

//  scroll forzado (cuando escribís)
function forceScroll() {
  setTimeout(() => {
    output.scrollTo({
      top: output.scrollHeight,
      behavior: "smooth"
    });
  }, 50);
}

// intro al cargar
window.addEventListener("load", () => {
  printHTML("intro");
  forceScroll();
});
