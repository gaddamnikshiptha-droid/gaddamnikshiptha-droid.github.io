// ---------- Boot animation ----------
const lines = [
  { text: "> booting nikshiptha.os ..." },
  { text: "> loading modules: robotics, ai", ok: true },
  { text: "> initializing vision", ok: true },
  { text: "see. sense. navigate.", final: true }
];

const boot = document.getElementById("boot");
const bootLines = document.getElementById("bootLines");
let finished = false;

document.body.classList.add("booting");

// Types one line letter by letter, then calls done()
function typeLine(line, done) {
  const p = document.createElement("p");
  if (line.final) p.classList.add("final");
  bootLines.appendChild(p);

  let i = 0;
  const timer = setInterval(() => {
    if (finished) { clearInterval(timer); return; }
    p.textContent = line.text.slice(0, ++i);

    if (i === line.text.length) {
      clearInterval(timer);
      if (line.ok) p.innerHTML += ' <span class="ok">[ ok ]</span>';
      setTimeout(done, 250);
    }
  }, 28);
}

// Types all lines one after another
function runBoot(index = 0) {
  if (finished) return;
  if (index < lines.length) {
    typeLine(lines[index], () => runBoot(index + 1));
  } else {
    setTimeout(hideBoot, 700);
  }
}

// Fades the boot screen out and gives the page back
function hideBoot() {
  if (finished) return;
  finished = true;
  boot.classList.add("hide");
  document.body.classList.remove("booting");
  setTimeout(() => boot.remove(), 600);
}

// Click or press any key to skip
boot.addEventListener("click", hideBoot);
document.addEventListener("keydown", hideBoot, { once: true });

// Safety net: always hide the boot screen after 6 seconds, no matter what
setTimeout(hideBoot, 6000);

runBoot();