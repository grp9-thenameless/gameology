const Lib = {
  renderCollection: function(collection, template, target) {
    let html = '';
    let result = document.querySelector(target);

    for (let i = 0; i < collection.length; i++) {
      let rec = collection[i];

      if (template(rec) !== "NULL") {
        html += template(rec);
      }
    }

    result.innerHTML = html;
  },

  renderItem: function(item, template, target) {
    document.querySelector(target).innerHTML = template(item);
  },

  getData: async function(url) {
    let x = url;//caused all the issues :(
    const response = await fetch(url);
    return response.json();
  },
};

/*filter functions*/
// filter types
async function filterType(collection, criteria) {
  let filtered = [];

  for (let item of collection) {

    if (item.entityType === criteria) {
      filtered.push(item);
    }
  }

  //console.log(filtered);
  return filtered;
};

/*search functions*/

/*template functions*/

function templateTitles(rec) {
  return (
    `
			<div id="title-card" onclick="filterByTitle(${rec.id})">
        <div id="title-img">
          <img src="${rec.entityImg.url}" alt="">
        </div>

        <div id="title-name">
          <p>${rec.entityGameName}</p>
        </div>
      </div>
		`
  );
};

function templateResults(rec) {
  return (
    `
      <div class="card">
  			<div class="card-img">
  				<img src="${rec.entityImg.url}" alt="image" onclick="displayDetails(${rec.id})">
  			</div>

  			<div class="card-name">
  				<h2>${rec.entityName}</h2>
  			</div>
				
  			<div class="card-type">
  				<p>${rec.entityType}</p>
  			</div>
    	</div>
    `
  );
};

function templateBanner(rec) {
  console.log(rec.entityLink);
  return (
    `
      <video width="320" height="240" autoplay loop muted>
        <source src="${rec.entityLink}" type="video/mp4">
      </video>
    `
  )

};

function templateDetails(rec) {
  return (`
  <div class="glass">
  
  </div>
      <div class="detail-wrapper" style="display:flex;">
        <div class="detail-card">
          <div class="detail-top">
            <img src="${rec.entityImg.url}" width="350px" height="300px" alt="here">
            <button class="det-btn" onclick="removeDetails(${rec.id})"><i class="fa-solid fa-xmark"></i> Cancel</button>
          </div>

          <div class="detail-bot">
            <p class="detail-abt">
              ${rec.entityAbout}
            </p>
          </div>
        </div>
      </div>
    `);
}

function templateBlank(rec) {
  return `
      <div class="detail-wrapper" style="display:none">
      </div>
    `;
}

/*render functions*/
async function displayTitles() {
  let data = await Lib.getData('https://x8ki-letl-twmt.n7.xano.io/api:GradIjOa/games');

  let titles = await filterType(data, 'Title');

  Lib.renderCollection(titles, templateTitles, ".title-list");
};

displayTitles();
async function filterByTitle(id) {
  let data = await Lib.getData('https://x8ki-letl-twmt.n7.xano.io/api:GradIjOa/games');
  //console.log(data);

  var title;

  for (let item of data) {
    if (item.id === id) {
      title = item.entityGameName;
      Lib.renderItem(item, templateBanner, "#banner");
    }
  }
  let filtered = [];

  for (let rec of data) {
    if (rec.entityGameName === title) {
      filtered.push(rec);
    }
  }

  Lib.renderCollection(filtered, templateResults, "#results");
}

async function displayDetails(id) {
  console.log(id);

  let data = await Lib.getData('https://x8ki-letl-twmt.n7.xano.io/api:GradIjOa/games');

  console.log(data);

  for (let item of data) {
    if (item.id === id) {
      Lib.renderItem(item, templateDetails, "#results-details");
    }
  }
}

function removeDetails(id) {
  console.log(id);
  Lib.renderItem("", templateBlank, "#results-details");
}