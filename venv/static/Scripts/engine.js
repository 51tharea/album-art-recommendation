export function query() {
  fetch('http://localhost:5000/init').then(response => {
    return response.json();
  }).then(result => {
    let current = document.getElementById('current');
    current.src = result.img;
    current.alt = result.index;

    let data = {index: result.index};

    suggest(data);
  });
}

export function suggest(data) {
  fetch('http://localhost:5000/suggest', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {

    return response.json();
  }).then(result => {
      let items = Object.entries(result);
      let iterator = items.entries();
      let recs = document.getElementsByClassName('rec-img');

      for(let [index, item] of iterator) {
        recs[index].src = item[1];
        recs[index].alt = item[0];
      }
  });
}