
import QMEMD from '../data/Qualifier Main Event Map Data.json' assert { type: 'json' };
import MEMD from '../data/Main Event Map Data.json' assert { type: 'json' };
import QMD from '../data/Qualifier Map Data.json' assert { type: 'json' };
import MD from '../data/Map Data.json' assert { type: 'json' };

var dt;


function callback(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      updateData();
    }
  });
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
  } else {
    y.children[0].style.display = "inline-block";
  }

}

function updateData() {
  dt.clear();
  var file = "";
  if (document.querySelector("#qualifier").classList.contains('active')) {
    file += "Q";
  }
  if (document.querySelector("#mainevent").classList.contains('active')) {
    file += "ME";
  }
  file += "MD";
  console.log(file);
  dt.rows.add(eval(file));
  dt.draw();
}

document.querySelector("#mainevent").addEventListener("click", stage);
document.querySelector("#qualifier").addEventListener("click", stage);

//new DataTable('#example', {

dt = $('#example').DataTable( {
      order: [[1, 'desc']],
    pageLength: 100,
    dom: "t",
    columns: [
      { title: 'Map' },
      { title: 'Played' },
      { title: 'First Ban' },
      { title: 'Ban' },
      { title: 'Pick' },
      { title: 'Remaining' },
      { title: 'First Ban%' },
      { title: 'Ban%' },
      { title: 'Pick%' },
      { title: 'Remaining%' },
      { title: 'Wins' },
      { title: 'Win%' }
      ],
      data: QMD,

    autoWidth: true
});
