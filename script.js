let main = window.document.getElementById("main");
const knitInstructions = window.document.getElementById("knitInstructions");
const subButton = window.document.getElementById("knit");

const halfPurl = {
  vb: "0 0.5 1.5 3",
  d: "M 0 1 L 4 1 L 4 4 L 0 4 L 0 1"
}

const purl = {
  vb: "0 0.5 3 3",
  d: "M 0 1 L 4 1 L 4 4 L 0 4 L 0 1"
}

const knitLeft = {
  vb: "0 0.5 3 4",
  d: "M 0 0 L 3 2 L 3 5 L 0 3 L 0 0"
}
const knitRight = {
  vb: "0 0.5 3 4",
  d: "M 3 0 L 0 2 L 0 5 L 3 3 L 3 0"
}

const addRow = () => {
  const div = document.createElement("div")
  div.className = "rows";
  main = div
  document.body.appendChild(div)
}

const addStitch = (st, element) => {
  const stitch = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  path.setAttribute("class", "stitch"); 
  path.setAttribute("d", st.d); 
  path.setAttribute("fill", "#000000");

  stitch.setAttribute("viewBox", st.vb)

  element.appendChild(stitch);
  stitch.appendChild(path);
}

const knit = (input) => {
  lines = input.split("\n")
  for (let r = 0; r < lines.length; r++) { 
    let halfie = false;
    lines[r] = lines[r].replaceAll(",", "")
    work = lines[r].split(" ");

    console.log(work)
    let leftKnit = true;
    for (i = 0; i < work.length; i++) {
      let stCount = work[i].substring(1);

      if (work[i][0] == "k") {
        for (j = 0; j < stCount; j++) {
          if (halfie && j == 0) { 
            addStitch(halfPurl, main)
            halfie = false
          }
          leftKnit ? addStitch(knitLeft, main) : addStitch(knitRight, main);
          leftKnit = leftKnit ? false : true;
        }
      }
      if (work[i][0] == "p") {
        for (j = 0; j < stCount; j++) {
          if (r % 2 == 0 && j == 0) {
            addStitch(halfPurl, main)
            halfie = true
          } else {
            addStitch(purl, main);
          }
          leftKnit = true;
        }
      }
    }
    if (halfie) { 
      addStitch(halfPurl, main)
      halfie = false
    }
    addRow()
  }
}

subButton.addEventListener("click", () => {
  console.log(knitInstructions.value);
  knit(knitInstructions.value)
});
