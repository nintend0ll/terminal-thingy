
const input = document.querySelector("input");
const output = document.querySelector(".output");

// files
const files = {
  "about.txt": "about",
  "projects.txt": "projects",
  "contact.txt": "contact"
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim();

    printRawLine(`agustina@fedora:~$ ${command}`);
    handleCommand(command.toLowerCase());

    input.value = "";
  }
});

function printRawLine(text) {
  const p = document.createElement("p");
  p.textContent = text;
  output.appendChild(p);
}

// texto con >
function printLine(text) {
  const p = document.createElement("p");

  if (text.trim() === "") {
    p.innerHTML = "&nbsp;";
    output.appendChild(p);
    return;
  }

  const prompt = document.createElement("span");
  prompt.textContent = "> ";
  prompt.classList.add("prompt");


  //user@host
  const user = document.createElement("span");
  user.textContent = "agustina@fedora";
  user.classList.add("user");

  //:~$
  const path = document.createElement("span");
  path.textContent = ":~$ ";
  path.classList.add("path");


  const content = document.createElement("span");
  content.textContent = text;

  p.appendChild(prompt);
  p.appendChild(user);
  p.appendChild(path);
  p.appendChild(content);
  output.appendChild(p);
}

// HTML templates
function printHTML(id) {
  const template = document.getElementById(id);

  if (template) {
    const clone = template.cloneNode(true);
    clone.style.display = "block";

    const paragraphs = clone.querySelectorAll("p");

    paragraphs.forEach(p => {
      if (p.querySelector(".prompt")) return;
      const originalHTML = p.innerHTML; 

      p.innerHTML = "";

      const prompt = document.createElement("span");
      prompt.textContent = "> ";
      prompt.classList.add("prompt");

      const content = document.createElement("span");
      content.innerHTML = originalHTML; 

      p.appendChild(prompt);
      p.appendChild(content);
    });

    output.appendChild(clone);
  }
}


// MAIN
function handleCommand(cmd) {

  const parts = cmd.split(" ");
  const base = parts[0];
  const arg = parts[1];

  // si no hay texzto
  if (!base) return;
  // HELP
  if (base === "help") {
    printLine("commands:");
    printLine("ls, cat, whoami, pwd, clear");
  }

  // LS
  else if (base === "ls") {
    const list = Object.keys(files).join("   ");
    printLine(list);
  }

  // CAT
  
  else if (base === "cat") {
    if (!arg) {
      printLine("cat: missing operand");
    }
    else if (files[arg]) {
      printHTML(files[arg]);
    } else {
      printLine(`cat: ${arg}: No such file or directory`);
    }
  }


  // WHOAMI
  else if (base === "whoami") {
    printLine("agustina :3");
  }

  // PWD (fake)
  else if (base === "pwd") {
    printLine("/home/agustina");
  }

  // CLEAR
  else if (base === "clear") {
    output.innerHTML = "";
    printHTML("intro");
  }

  else if (cmd === "rm -rf /") {
    printLine("rm: cannot remove root");
  }


  else if (cmd === "222") {
    printLine("my fav angel number");
  }

  else if (cmd !== "") {
    printLine(`${base}: command not found`);
  }

  forceScroll();
}

// scroll
function forceScroll() {
  setTimeout(() => {
    output.scrollTo({
      top: output.scrollHeight,
      behavior: "smooth"
    });
  }, 10);
}

// init
window.addEventListener("load", () => {
  printHTML("intro");
  forceScroll();
});
