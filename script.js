function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async function(){
	
	const images = Array.from(document.getElementsByClassName("main_gallery_image"));
	for(var i = 0; i < images.length; i++) {
		images[i].addEventListener("onload", fadeIn(images[i]))
		await sleep(50);
	}
}

function fadeIn(image){
	image.style.transition = "transform 0.25s ease, opacity 1s";
	image.style.opacity = "1";
	sleep(500);
}

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

var current_index = 0;


function determine_content(data){
	var type = "";
	if(data == "1"){
		type = "div";
	}
	else{
		type = "img";
	}
	return(type);
}

const gallery_items = document.getElementsByClassName('gallery_item');
const image_info = [];
var gallery_images = [];
for (i=0;i<gallery_items.length;i++){
	image = gallery_items[i].getElementsByClassName('main_gallery_image')[0];
	
	var content_type = determine_content(image.dataset.iframe)
	const img = document.createElement(content_type);
	if (content_type == "div"){
		img.classList.add("iframe_wrapper");
		var iframe = document.createElement("iframe");
		iframe.src = image.src;
		img.appendChild(iframe);
	}
	
	img.classList.add('main_image');
	img.src = image.src;
	
	const supplementary_images = gallery_items[i].getElementsByClassName('gallery_image');
	const supp_images = [];
	for(j=0;j<supplementary_images.length;j++){
		const supp_img = document.createElement('img');
		supp_img.src = supplementary_images[j].src;
		supp_images.push(supp_img);
	};
	
	const title = document.createElement('div');
	title.append(image.dataset.title);
	
	const info = document.createElement('div');
	info.append(image.dataset.info);
	
	const year = document.createElement('div');
	year.append(image.dataset.year);
	
	const link = document.createElement('a');
	if (image.dataset.link != null){
		link.appendChild(document.createTextNode(image.dataset.link));
		link.href = image.dataset.link;
		link.classList.add('link');
	}
	
	image.addEventListener('click', e => {
		openLightbox(image, img, supp_images, title, info, year, link);
	})
	
	image_info.push([image, img, supp_images, title, info, year, link]);
};

function openLightbox(image, img, supp_images, title, info, year, link){
		lightbox.classList.add('active');
		
		const container = document.createElement('div');
		container.classList.add('container');
		
		const image_container = document.createElement('div');
		image_container.classList.add('image_container');
		
		const information = document.createElement('div');
		information.classList.add('information');
		
		while (lightbox.firstChild){
			lightbox.removeChild(lightbox.firstChild);
			container.scrollTop = 0;
			image_container.scrollTop = 0;
			lightbox.scrollTop = 0;
		}
		lightbox.appendChild(container);
		image_container.appendChild(img);
		
		for(k=0;k<supp_images.length;k++){
			//image_container.appendChild(supp_images[k]);
		}
		
		container.appendChild(image_container);
		
		title.classList.add('title');
		information.append(title);
		
		information.append(link);
		
		info.classList.add('info');
		information.append(info);
		
		
		year.classList.add('year');
		information.append(year);
		
		container.appendChild(information);
}

lightbox.addEventListener('click', e => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove('active');
});

document.addEventListener('keydown', function(event) {
	if (event.keyCode === 39){
		lightbox.classList.remove('active');
	}
});