function toggleFilter(event){
	var dataTitle = [];
	var el = document.querySelectorAll('#title-wrapper div');
	var selectedFilter = event.target.classList[0].toLowerCase().slice(6);
	var colType = "data-" + selectedFilter;

	//decides which title was clicked and if it'll be ascending or descending
	for (let i = 0; i < el.length; i++) {	
	  	if(el[i] == event.target){
	  		el[i].classList.add('active'); 
	  		
	  		//toggles the clicked title's classes
	  		if(el[i].classList.contains('asce')){
	  			el[i].classList.remove('asce');	
	  			el[i].classList.add('desc');
				var filterOption = 'desc';
	  		}else if(el[i].classList.contains('desc')){
	  			el[i].classList.remove('desc');
				el[i].classList.add('asce');
				var filterOption = 'asce';
			}else{
				el[i].classList.add('asce');	
				var filterOption = 'asce';
			}
	  	}else{
	  		
	  		//this toggles all the clicked classes siblings
	  		el[i].classList.remove('active');
	  		el[i].classList.remove('desc');
			el[i].classList.remove('asce');
		}	
	}
	
	//decides which values to grab, based on what title was clicked
	document.querySelectorAll(".col").forEach(function(col){
		if(col.getAttribute(colType)){
			var clientNumber = col.getAttribute('data-client');
			var clientType = col.getAttribute(colType);
			dataTitle.push([clientNumber, clientType]);
		}
	});

	//sorts the array
	dataTitle.sort(sortFunction);
	function sortFunction(a, b) {
		var valA = a[1];
		var valB = b[1];
	    if(valA === valB){
	        return 0;
	    }else{
	        if(filterOption == "asce"){	
	        	return (valA < valB) ? - 1 : 1;
	        }else{
	        	return (valA > valB) ? - 1 : 1;
	        }	
	    }
	}	
	
	//toggles classes that will change the order 
	//have to add based on class, because if we add based on attribute then we only add to the first item it finds
	for(d = 0; d < dataTitle.length; d++){
		var filter = dataTitle[d][0];
		document.querySelectorAll(".col.site-client-" + [filter]).forEach(function(col){
			var prefix = "order-";
			var regx = new RegExp('\\b' + prefix + '[0-9].*?\\b', 'g');			 
	
			col.className = col.className.replace(regx, '');
			col.classList.add('order-' + d);
		});
	}
}
