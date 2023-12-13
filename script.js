
let test = `
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
p9 p9
p9 p9
p9 p9
p9 p9
p9 p9
p9 p9
p1, k3, p1, k3 p1, k3, p1, k3
k1, p5, k1, p1 k1, p5, k1, p1
k2, p1, k3, p1, k1 k2, p1, k3, p1, k1
p2, k1, p1, k1, p3 p2, k1, p1, k1, p3
`;

let purl = "M 0 1 L 4 1 L 4 4 L 0 4 L 0 1"

let knitLeft = "M 0 0 L 3 2 L 3 5 L 0 3 L 0 0"
let knitRight = "M 3 0 L 0 2 L 0 5 L 3 3 L 3 0"

let main = window.document.getElementById("main")

const addRow = () => {
  const div = document.createElement("div")
  div.className = "rows";
  main = div
  document.body.appendChild(div)
}

const addStitch = (st, element) => {
  const stitch = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  path.setAttribute("d", st); 
  path.setAttribute("fill", "#000000");

  stitch.setAttribute("viewBox", "0 0.5 3 4")

  element.appendChild(stitch);
  stitch.appendChild(path);
}

lines = test.split("\n")
for (let r = 0; r < lines.length; r++) { 
  work = lines[r].split(" ");

  console.log(work)
  let leftKnit = true;
  for (i = 0; i < work.length; i++) {

    if (work[i][0] == "k") {
      for (j = 0; j < work[i][1]; j++) {
        leftKnit ? addStitch(knitLeft, main) : addStitch(knitRight, main);
        leftKnit = leftKnit ? false : true;
      }
    }
    if (work[i][0] == "p") {
      for (j = 0; j < work[i][1]; j++) {
        addStitch(purl, main);
        leftKnit = true;
      }
    }
  }
  addRow()
}
