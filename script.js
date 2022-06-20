const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

function resetScrollPos(selector) {
  var divs = document.querySelectorAll(selector);
  for (var p = 0; p < divs.length; p++) {
    if (Boolean(divs[p].style.transform)) { //for IE(10) and firefox
      divs[p].style.transform = 'translate3d(0px, 0px, 0px)';
    } else { //for chrome and safari
      divs[p].style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
    }
  }
}

const images = document.querySelectorAll('img');
images.forEach(image => {
	image.addEventListener('click', e => {
		lightbox.classList.add('active');
		const container = document.createElement('div');
		container.classList.add('container');
		const img = document.createElement('img');
		const information = document.createElement('div');
		information.classList.add('information');
		img.src = image.src;
		while (lightbox.firstChild){
			lightbox.removeChild(lightbox.firstChild);
			container.scrollTop = 0;
			lightbox.scrollTop = 0;
		}
		lightbox.appendChild(container);
		container.appendChild(img);
		
		const title = document.createElement('div');
		title.append(image.dataset.title);
		title.classList.add('title');
		information.append(title);
		
		console.log(image.dataset.link);
		if(image.dataset.link != undefined){
			const link = document.createElement('a');
			link.appendChild(document.createTextNode(image.dataset.link));
			link.href = image.dataset.link;
			link.classList.add('link');
			
			information.append(link);
		}

		const info = document.createElement('div');
		info.append(image.dataset.info);
		info.classList.add('info');
		information.append(info);
		
		const year = document.createElement('div');
		year.append(image.dataset.year);
		year.classList.add('year');
		information.append(year);
		
		container.appendChild(information);
	})
});

lightbox.addEventListener('click', e => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove('active');
	
});