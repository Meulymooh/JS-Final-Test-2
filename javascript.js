var btn = document.getElementsByClassName("btn-primary")[0];
var errorMessage = document.getElementById("errorMessage");
var input = document.getElementById("myInput");
btn.addEventListener("click", addItemInList);
table = document.getElementById("myTable");
table.style.background = "linear-gradient(white, grey)";
var imgEmpty = document.getElementById("emptyField");
    imgEmpty.addEventListener("click", clearField);

// Clear input field
function clearField (event) {
  if (input.value != "") {
    input.value = "";
  }
}

// Add new item to the list
function addNewRow () {

  var img = document.createElement("img");
      img.id = "delete";
      img.src = "remove.png";
      img.height = "20";
      img.width = "20";
  img.addEventListener("click", deleteRow);

  var btnEdit = document.createElement("button");
      btnEdit.id = "editRow";
      btnEdit.className = "btn btn-secondary active";
      btnEdit.innerHTML = "Edit";
      btnEdit.addEventListener("click", editRow);  

  var addRow = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    var newRow = addRow.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    newRow.addEventListener("mouseover", deleteRowHover);
    newRow.addEventListener("mouseout", mouseOut);
    

    cell1.innerHTML = input.value;
    cell2.appendChild(img);
    cell3.appendChild(btnEdit);

    localStorage.setItem("itemList", addRow.innerHTML);
};

// Reset input field
function resetInput() {
  input.value = "";
}

// Add number of items in the button
function numberItems() {
  var items = document.getElementById("items");
  var allItems = document.getElementById('myTable').getElementsByTagName('tbody')[0].childElementCount;
  items.innerHTML = allItems;
}

// Delete row + animation
function deleteRow(clickEvent) {
/*  alert(clickEvent.target.parentNode.parentNode);
*/
  clickEvent.target.parentNode.parentNode.style.animationPlayState = "running";
  setTimeout(function(){
    document.getElementById('myTable').getElementsByTagName('tbody')[0].deleteRow(clickEvent.target.parentNode.parentNode.sectionRowIndex);
    localStorage.setItem("itemList", document.getElementById('myTable').innerHTML); 
  }, 1000);
}

// Delete row when "del" key is pressed + hover
var row = null;
document.addEventListener("keydown", del);

function del(event) {
  if ((event.keyCode == 46) && (row != null)) {
    row.style.animationPlayState = "running";
    setTimeout(function(){
    document.getElementById('myTable').getElementsByTagName('tbody')[0].deleteRow(row.sectionRowIndex);
    localStorage.setItem("itemList", document.getElementById('myTable').innerHTML); 
    }, 1000);
  }
}

function deleteRowHover(hoverDel) {
  row = hoverDel.target.parentNode;
  // console.log("hovering over target " + hoverDel.target.parentNode);
  // console.log("hovering over row " + row.sectionRowIndex);
}

function mouseOut(unhoverDel) {
  row = null;
}


// Edit item name in the list
function editRow(event) {
  var cell1 = event.target.parentNode.parentNode.cells[0];
  var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = cell1.innerHTML;
      cell1.innerHTML = "";
      cell1.appendChild(input);

      input.addEventListener("keyup", saveItemEdit);
}

// Save edited item
function saveItemEdit(event) {
  if (event.keyCode == 13) {
    var cell1 = event.target.parentNode;
    var input = event.target;
    cell1.removeChild(input);
    cell1.innerHTML = input.value;
  }
}

// Check duplicate in the list
function checkDuplicate() {
  for (var i = 0; i < table.rows.length; i++) {
    var item = (table.rows[i].cells[0].textContent.trim());
    if (item == input.value) {
      return true;
    }
  }
  return false;
}
    
// Clear whole table
input.addEventListener("keyup", clearWholeTable);

function clearWholeTable() {
  if ((event.keyCode === 13) && (input.value == "clear")) {
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
  }
}

// When press button
function addItemInList(){
    var icon = document.createElement("icon");
    icon.classList.add("fas", "fa-spinner", "fa-spin", "mr-2");
    btn.prepend(icon);

    setTimeout(function(){
      // If empty field
    	btn.removeChild(icon);	
    	if (input.value == '') {
        errorMessage.innerHTML = "Please fill in the field!"; 
        return;
      }
      // If duplicates
      else if (checkDuplicate() == true) {
        errorMessage.innerHTML = "Item already in the list"; 
        return;
      }
      // Reorder the list
      else if (input.value == 'randomize') {
        for (var i = table.rows.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * i) + 1;
            var temp = table.rows[i].cells[0].innerHTML;
            table.rows[i].cells[0].innerHTML = table.rows[j].cells[0].innerHTML;
            table.rows[j].cells[0].innerHTML = temp;
        }
      }
      // Add new row
    	else addNewRow();
    	errorMessage.innerHTML = "";
      resetInput();
      numberItems();
    }, 500);

}

window.addEventListener("load", retrieveData);

function retrieveData() {
  var oldList = localStorage.getItem("itemList");
  if (oldList != null)
  {
    // document.getElementById("myTable").innerHTML = oldList;
  }
}