var optionsJSON;
var buttonsJSON;


//process the button click, do a server PUT, allow the server to emit state
function power(id) {
   var className = document.getElementById(id).className;
   if (className.indexOf("off") != -1) {
      ws.send(id + 'state0');
      //var xmlhttp=new XMLHttpRequest();
      //xmlhttp.open("PUT","?id=" + id + "&state=on",true);
      //xmlhttp.send();
   } else {
      ws.send(id + 'state1');
      //var xmlhttp=new XMLHttpRequest();
      //xmlhttp.open("PUT","?id=" + id + "&state=off",true);
      //xmlhttp.send();
   }
}

//set the button state, following a power event emitted from the server
function poweron(id) {
   document.getElementById(id).className = "powerbutton on";
}

function poweroff(id) {
   document.getElementById(id).className = "powerbutton off";
}

function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
	xobj.open('GET', file, true); 
	xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

function init() {
   _loadButtons();
}

function updateTemperatureTable(label, temperature) {
   var existing = document.getElementById('temperature' + label);

   if (existing) {
      //update temperature
      existing.innerHTML = temperature + " F";
   } else {
      //create new row
      var table = document.getElementById('temptable');
      var row = document.createElement("tr");
      row.setAttribute("id", label);

      var cellLabel = document.createElement("td");
      var paragraph = document.createElement("p");
      paragraph.setAttribute("class", "temp templabel");
      var cellText = document.createTextNode(label);
      paragraph.appendChild(cellText);
      cellLabel.appendChild(paragraph);
      row.appendChild(cellLabel);

      var cellTemp = document.createElement("td");
      paragraph = document.createElement("p");
      paragraph.setAttribute("class", "temp OK");
      paragraph.setAttribute("id", 'temperature' + label);
      cellText = document.createTextNode(temperature + " F");
      paragraph.appendChild(cellText);
      cellTemp.appendChild(paragraph);
      row.appendChild(cellTemp);

      table.appendChild(row);
   }
}

function _loadButtons() {
   loadJSON('json/buttons.json', function(response) {
      // Parse JSON string into object
      this.buttonsJSON = JSON.parse(response);

      _tableCreate(this.buttonsJSON);
   });
}

function _tableCreate(json) {

   // create elements <table> and a <tbody>
   var tbl     = document.getElementById("buttonstable");
   var tblBody = document.createElement("tbody");

   // cells creation
   var jsonRows = json.rows;

   for(var i in jsonRows) {
      var cellnum = 0;
      var row = document.createElement("tr");

      var jsonButtons = jsonRows[i].buttons;

      for (var j in jsonButtons) {
         // create button and text node 
         var cell = document.createElement("td");    
         cell.setAttribute("class", "powerbuttontd");

         var button = document.createElement("button");
         button.setAttribute("class", "powerbutton off");
         button.setAttribute("type", "submit");
         button.setAttribute("id", jsonButtons[j].id);
         button.setAttribute("onclick", "power(id)");
         button.setAttribute("data-label", jsonButtons[j].label);
         cell.appendChild(button);

         var paragraph = document.createElement("p");
         paragraph.setAttribute("class", "powerbuttonp");

         var cellText = document.createTextNode(jsonButtons[j].label);
         paragraph.appendChild(cellText);
         cell.appendChild(paragraph);

         row.appendChild(cell);
      }

      //row added to end of table body
      tblBody.appendChild(row);
   }

   // append the <tbody> inside the <table>
   tbl.appendChild(tblBody);
}





