const test = `
p18
p18
p18
p18
p18
p18
p18
p18
p18
p4 k2 p4 k2 p4 k2
p4 k2 p4 k2 p4 k2
p4 k2 p4 k2 p4 k2
p4 k2 p4 k2 p4 k2
`;

let test1 = `
k2 p4 k2 p4 k2
k2 p4 k2 p4 k2
k2 p3 k2 p5 k2
k2 p2 k2 p6 k2
k2 p1 k2 p7 k2
k2 p2 k2 p6 k2
k2 p3 k2 p5 k2
k2 p4 k2 p4 k2
k2 p4 k2 p4 k2
k2 p4 k2 p4 k2
k2 p3 k2 p4 k2 p1
k2 p2 k2 p4 k2 p2
k2 p1 k2 p4 k2 p3
k2 k2 p3 k2 p5
k2 k2 p2 k2 p6
k2 k2 p1 k2 p7
k2 k2 k2 p8
k2 k2 k2 p8
k2 k2 k2 p8
k2 k2 k2 p8
k2 k2 k2 p8
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
k6 p6 k6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
p6 k6 p6
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
k4 p2 k4 p2 k4 p2
p18
p18
p18
p18
p18
p18
p18
p18
p18
p1, k3, p1, k3 p1, k3, p1, k3
k1, p5, k1, p1 k1, p5, k1, p1
k2, p1, k3, p1, k1 k2, p1, k3, p1, k1
p2, k1, p1, k1, p3 p2, k1, p1, k1, p3
`;

let vbWhole = "0 0.5 4 3"
let vbHalf = "0 0.5 2 3"

let purl = "M 0 1 L 4 1 L 4 4 L 0 4 L 0 1"
let halfPurl = "M 0 1 L 4 1 L 4 4 L 0 4 L 0 1"

let knitLeft = "M 0 0 L 3 2 L 3 5 L 0 3 L 0 0"
let knitRight = "M 3 0 L 0 2 L 0 5 L 3 3 L 3 0"

let main = window.document.getElementById("main")

const addRow = () => {
  const div = document.createElement("div")
  div.className = "rows";
  main = div
  document.body.appendChild(div)
}

const addStitch = (st, element, vb) => {
  const stitch = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  path.setAttribute("class", "stitch"); 
  path.setAttribute("d", st); 
  path.setAttribute("fill", "#000000");

  stitch.setAttribute("viewBox", vb)

  element.appendChild(stitch);
  stitch.appendChild(path);
}

lines = test.split("\n")
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
        leftKnit ? addStitch(knitLeft, main, vbWhole) : addStitch(knitRight, main, vbWhole);
        leftKnit = leftKnit ? false : true;
      }
    }
    if (work[i][0] == "p") {
      let next = work[i + 1] == null ? i : i + 1;
      for (j = 0; j < stCount; j++) {
        if ((r % 2 == 0 && j == 0) || (work[next][0] == "k")) {
          addStitch(halfPurl, main, vbHalf)
          halfie = true
        } else {
          addStitch(purl, main, vbWhole);
        }
        leftKnit = true;
      }
    }
  }
  if (halfie) { 
    addStitch(halfPurl, main, vbHalf)
    halfie = false
  }
  addRow()
}
