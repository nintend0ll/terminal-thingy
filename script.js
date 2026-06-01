const input = document.querySelector("input");
const output = document.querySelector(".output");

// pseudo filesystem
const fs = {
  "about.txt": "about",
  "projects.txt": "projects",
  "contact.txt": "contact"
};

let currentDir = "~";

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim();

    printRawLine(`agustina@fedora:${currentDir}$ ${command}`);
    handleCommand(command.toLowerCase());

    input.value = "";
  }
});

function printRawLine(text) {
  const p = document.createElement("p");
  p.textContent = text;
  output.appendChild(p);
}

// imprime texto
function printLine(text) {
  const p = document.createElement("p");

  // si está vacío → línea vacía sin prompt
  if (text.trim() === "") {
    p.innerHTML = "&nbsp;";
    output.appendChild(p);
    return;
  }

  const prompt = document.createElement("span");
  prompt.textContent = "> ";
  prompt.classList.add("prompt");

  const content = document.createElement("span");
  content.textContent = text;

  p.appendChild(prompt);
  p.appendChild(content);

  output.appendChild(p);
}



// imprime HTML
function printHTML(id) {
  const template = document.getElementById(id);

  if (template) {
    const clone = template.cloneNode(true);
    clone.style.display = "block";
    output.appendChild(clone);
  }
}

// MAIN
function handleCommand(cmd) {
  const parts = cmd.split(" ");
  const base = parts[0];
  const arg = parts[1];

  if (base === "help") {
    printLine("commands:");
    printLine("ls, cat, cd, whoami, pwd, clear");
  }

  // LIST
  else if (base === "ls") {
    printLine("about.txt   projects/   contact.txt");
  }

  // CAT FILE
  else if (base === "cat") {
    if (fs[arg]) {
      printLine("");
      printHTML(fs[arg]);
    } else {
      printLine("cat: file not found");
    }
  }

  // CD (fake navigation)
  else if (base === "cd") {
    if (arg === "~") {
      currentDir = "~";
    } else if (fs[`${arg}.txt`]) {
      currentDir = arg;
      printHTML(fs[`${arg}.txt`]);
    } else {
      printLine("cd: no such file or directory");
    }
  }

  // WHOAMI
  else if (base === "whoami") {
    printLine("agustina :3");
  }

  // PWD
  else if (base === "pwd") {
    printLine(`/home/agustina/${currentDir === "~" ? "" : currentDir}`);
  }

  // CLEAR
  else if (base === "clear") {
    output.innerHTML = "";
    printHTML("intro");
  }

  else if (cmd !== "") {
    printLine("command not found");
  }

  forceScroll();
}

// scroll pro
function forceScroll() {
  setTimeout(() => {
    output.scrollTo({
      top: output.scrollHeight,
      behavior: "smooth"
    });
  }, 10);
}

// on load
window.addEventListener("load", () => {
  printHTML("intro");
  forceScroll();
});
