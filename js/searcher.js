$(document).ready(function(){

	var btnSearch = $("#button-addon2").on("click", search);
	var videosContainer = $("#videosContainer");
	var inputSearch = $('#inputSearch').on('onkeypress', search);


	function search(){

		var inputSearch = $("#inputSearch").val();
		var request = new XMLHttpRequest();

		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var response = JSON.parse(request.responseText);
				listResults(response);
			}
		}

		request.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q='+inputSearch+'&key=AIzaSyB0yoV7wArJVv0Q1Lb50SJMfraEd7CuaqE', true);
	
		request.send();

	}

	function listResults(response){
		
		videosContainer.html("");

		for (var i=0; i< 20; i++) {
			if(typeof response.items[i].id.videoId !== 'undefined'){
				videosContainer.append(`
					<div class='col-sm-6 col-md-6'>
						<iframe class='mt-4' width='230' height='200' src='https://www.youtube.com/embed/${response.items[i].id.videoId}' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>
					</div>
					<div class='col-sm-6 col-md-6'>
						<h5 class='mt-4'>${response.items[i].snippet.title}</h5>
						<p class='mt-4'>${response.items[i].snippet.description}</p>
					</div>
				`);
			}
		}	
	}

	$(window).keypress(function(e) {
    if(e.keyCode == 13) {
        search();
    }
});

});

