var Render = (function(){
	var render = function(deck){
		var $el = document.createElement("div");
		$el.className = 'slides';
		var slides = deck.slides;
		slides.forEach(function(slide){
			var $slide = document.createElement("section");
			var components = slide.components;
			components.forEach(function(component){
				var $comp = '';
				// console.log(component);
				if(component.type == 'TextBox'){
					$comp = document.createElement("div");
					$comp.style.width = component.width + 'px';
					$comp.style.lineHeight = component.lineSpacing;
					$comp.innerHTML = component.text;
				}else if(component.type == 'Image'){
					$comp = document.createElement("img");
					$comp.src = component.src;
					$comp.style.width = component.scale.width + 'px';
					$comp.style.height = component.scale.height + 'px';
				}else if (component.type == 'WebFrame'){
					$comp = document.createElement("iframe");
					$comp.src = component.src;
					$comp.style.width = component.scale.width + 'px';
					$comp.style.height = component.scale.height + 'px';
				}else if(component.type == 'Audio'){
					$comp = document.createElement("div");
					console.log(component);
				}else{
					$comp = document.createElement("div");
				}
				$comp.style.top = component.y + 'px';
				$comp.style.left = component.x + 'px';
				$slide.appendChild($comp);
			});
			$el.appendChild($slide);
		});
		document.querySelector('.reveal').appendChild($el);
	}
	return {render: render};
})()