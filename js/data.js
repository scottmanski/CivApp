
//import Data from '../data/Data.json' assert { type: 'json' };
//import ts from '../data/ts.json' assert { type: 'json' };

var Data, dt, previous;
//$.getJSON('./data/Data.json', function( data ) {
//  Data = data;
//  updateData();
//});

//function dataUpdate() {
  $.ajax({
    dataType: "json",
    url: './data/Data.json',
    cache: false,  //do not cache
    success: function(data){
      Data = data;
      updateData();
    }
});
//}



//$.getJSON('./data/ts.json', function( data ) {
//  document.getElementById("Mlastupdate").children[0].innerText = data;
//});

function timeUpdate() {
  $.ajax({
    dataType: "json",
    url: './data/ts.json',
    cache: false,  //do not cache
    success: function(data){
      if (previous != null) {
        if (data[0] !== previous[0]) {
          //document.getElementById("Mlastupdate").children[0].innerText = data;
          var div = document.getElementsByClassName("alert")[0];
          div.style.display = "block";
          //div.style.opacity = "1";
          setTimeout(function(){ div.style.opacity = "1"; }, 600);
          previous = data;
          //dataUpdate();
        }
      } else {
          document.getElementById("Mlastupdate").children[0].innerText = data;
          //document.getElementById("newdata").style.display = "block";
          previous = data;
          //dataUpdate();
      }
        setTimeout(timeUpdate, 60000);
    }
});
}

timeUpdate();


function callback(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      updateData();
    }
  });
}

var mapInput = document.getElementById('MCmap');
mapInput.onchange = (event) => {
  var map = document.getElementById('MCmap').value;
  if (map == "All") {
    document.getElementById('map_image').style.display = "none";
  } else {
    document.getElementById('map_image').style.display = "block";
    document.getElementById('mappath').src = "./Maps/" + map + ".png";
    document.getElementById('mapname').innerText = "  " + map;
  }
  updateData();
}

const mutationObserver = new MutationObserver(callback);

mutationObserver.observe(document.querySelector("#qualifier"), { attributes: true });
mutationObserver.observe(document.querySelector("#mainevent"), { attributes: true });

function stage(x) {
  var y = null;
  if (x.srcElement.tagName == "I") {
    y = x.srcElement.parentElement.parentElement;
  } else {
    y = x.srcElement;
  }
  
  if (y.classList.contains('active')) {
    y.children[0].style.display = "none";
    y.setAttribute("data-active", "false");
  } else {
    y.children[0].style.display = "inline-block";
    y.setAttribute("data-active", "true");
  }
}

function updateData() {
  //console.log("updating data");
  dt.clear();
  var dt_new = Data; //Data.filter(element => element.Player_Civ == "Franks")
  var map = document.getElementById('MCmap').value;
  var filter = map;
  if (document.querySelector("#qualifier").getAttribute("data-active") != "false") {
    filter = filter+"1";
  } else {
    filter = filter+"0";
  }
  if (document.querySelector("#mainevent").getAttribute("data-active") != "false") {
    filter = filter+"1";
  } else {
    filter = filter+"0";
  }
  dt_new = dt_new.filter(element => element.filter == filter);
  dt.rows.add(dt_new);
  dt.draw();
}

document.querySelector("#mainevent").addEventListener("click", stage);
document.querySelector("#qualifier").addEventListener("click", stage);


dt = $('#example').DataTable( {
      order: [[1, 'desc']],
    pageLength: 100,
    dom: "t",
    columns: [
      { data: 'Civilization', title: 'Civilization' },
      { data: 'Wins', title: 'Wins' },
      { data: 'Losses', title: 'Losses' },
      { data: 'Win%', title: 'Win%' },
      { data: 'First Pick', title: 'First Pick' },
      { data: 'Pick', title: 'Pick' },
      { data: 'Ban', title: 'Ban' },
      { data: 'Pass', title: 'Pass' },
      { data: 'First Pick%', title: 'First Pick%' },
      { data: 'Pick%', title: 'Pick%' },
      { data: 'Ban%', title: 'Ban%' },
      { data: 'Pass%', title: 'Pass%' },
      { data: 'Played%', title: 'Played%' }
      ],
      data: null, //dt,

    autoWidth: true
});
