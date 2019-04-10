var btn = document.getElementsByClassName("btn-primary")[0];
var errorMessage = document.getElementById("errorMessage");
var input = document.getElementById("myInput");
btn.addEventListener("click", onClick);


// Add new item to the list
function addNewRow () {

  var img = document.createElement("img");
      img.id = "delete";
      img.src = "remove.png";
      img.height = "20";
      img.width = "20";
  img.addEventListener("click", deleteRow);

  var addRow = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    var newRow = addRow.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = input.value;
    cell2.appendChild(img);
};

// Reset input field
function resetInput() {
  input.value = "";
}

// Count number of items in basket
function numberItems() {
  var items = document.getElementById("items");
  var allItems = document.getElementById('myTable').getElementsByTagName('tbody')[0].childElementCount;
  items.innerHTML = allItems;
}

// Delete rows
function deleteRow(clickEvent) {
    document.getElementById('myTable').getElementsByTagName('tbody')[0].deleteRow(clickEvent.target.parentNode.rowIndex);
}

function onClick(){
    var icon = document.createElement("icon");
    icon.classList.add("fas", "fa-spinner", "fa-spin", "mr-2");
    btn.prepend(icon);

    setTimeout(function(){ 
    	btn.removeChild(icon);	

    	if (input.value == '') {
        errorMessage.innerHTML = "Please fill in the field!"; 
        return;
    	}
    	else addNewRow();
    	errorMessage.innerHTML = "";
      resetInput();
      numberItems();


    }, 500);

}