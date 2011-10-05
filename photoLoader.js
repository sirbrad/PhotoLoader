(function photoLoader(global) {
		 
    var	doc = global.document,
			elemParent = getEl('photo'),
		 	img = getTag({ tag: 'img', context: elemParent, first: true }), 
			ul = getEl('feeder'),
		 	thumbs = getTag({ tag: 'a', context: ul }),
			len = thumbs.length, 
			src;
	
	
	/**
	 * Following method is short hand for document.getElementById
	 * This can help improve performance by not having to keep looking up scope chain for either 'document' or 'getElementById'
	 * 
	 * @param id { String } the identifier for the element we want to access.
	 * @return { Element | Undefined } either the element we require or undefined if it's not found
	 */
	function getEl(id) {
		return doc.getElementById(id);
	}
	
	/**
	 * Following method is short hand for document.getElementsByTagName
	 * This can help improve performance by not having to keep looking up scope chain for either 'document' or 'getElementsByTagName'
	 * Also allows us to return the first found element if we so choose.
	 * 
	 * @param options { Object } object literal of options
	 *	@param tag { String } the HTML tag to search for (e.g. 'div')
	 *	@param context { Element/Node } an element to anchor the search by (defaults to window.document)
	 *	@param first { Boolean } determines if we return the first element or the entire HTMLCollection
	 * @return { Element | HTMLCollection/Array | Undefined } either the element(s) we require or undefined if it's not found
	 * Thanks to @Integralist for the getTag function
	 */
	function getTag(options) {
		var tag = options.tag || '*', 
			 context = options.context || this.doc, 
			 returnFirstFound = options.first || false;
		
		return (returnFirstFound) 
			? context.getElementsByTagName(tag)[0] 
			: context.getElementsByTagName(tag);
	}
	
	// Dynamically insert our ajax loader
	elemParent.style.background = 'url(http://www.photoshopatoms.com/tutorials/creating-an-ajax-style-loading-gif/images/img16.gif) center no-repeat';
	
	// Attach our bind event
	jQuery(thumbs).bind('click', function(e){
		targ = e.target.tagName;
		
		// We only want to do what's below if our targ is an img
		if (targ.toLowerCase() === 'img') {
			
			// Store the source of element clicked
			src = this.children[0].src;
            
			 // Resetting the length
			 len = thumbs.length;
			
			// Split the src and remove the thumbnail folder so it displays the large image
			var splt = src.split('Thumbs/'),
				  mainPhoto = splt[0] + '' + splt[1];
			
			 while (len--) {
				  thumbs[len].className = '';
			 }
			
			// Check for CSS3 transitions
			if (Modernizr.csstransitions) {
			
				if (elemParent.className === 'fadeIn') {
					elemParent.className = 'fadeOut';
				}
				
				var getStyle = (function(element) {
					if (window.getComputedStyle) { 
						// W3C specific method. Expects a style property with hyphens
						return function(element, styleName) {
							return element.ownerDocument.defaultView.getComputedStyle(element, null).getPropertyValue(styleName);    
						}
					} else if (element.currentStyle) { 
					// Internet Explorer-specific method. Expects style property names in camel case 
					return function(element, styleName) {
						return element.currentStyle[styleName];
					}
					}
				}(document.body));
				
				var myInterval = window.setInterval(function() {
					if (getStyle(img, 'opacity') <= 0) {
						// Cleanup
						window.clearInterval(myInterval);
						
						if (img.src === mainPhoto) {
							elemParent.className = 'fadeIn';
						} else {
							// Overwrite the main photos src with the clicked element
							img.src = mainPhoto;
							
							img.onload = function() {
								elemParent.className = 'fadeIn';
							};    
						}
					}
				}, 10);
			
			} else {
				 
				 jQuery(img).fadeOut(400, function(){
					  
					  // Overwrite the main photos src with the clicked element
					  img.src = mainPhoto;
					  
					  //The fadeIn gets called once the fadeOut is finished
					  jQuery(this).fadeIn();
				 
				 });
			}
			
			//Add className of active to the clicked thumbnail
			this.className = 'active';
		}
		
		e.preventDefault();
	
	});
		
})(this) // We pass in 'this' and reference it as 'global' object (in the browser world the global object is the Window object)