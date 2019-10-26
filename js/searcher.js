$(document).ready(function(){

	var btnSearch = $("#button-addon2").on("click", search);
	var videosContainer = $("#videosContainer");


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
				console.log(response.items[i]);
				//videosContainer.append("<img src='" + response.items[i].snippet.thumbnails.high.url + "' class='col-lg-3 mt-4' width='200' height='180'><div class='col-lg-6'><h5 class='mt-4'>" + response.items[i].snippet.title + "</h5><p class='mt-4'>" + response.items[i].snippet.description + "</p></div><div class='col-lg-3'><p class='mt-4'>" + response.items[i].id.videoId + "</p><a href=https://www.youtube.com/watch?v=" + response.items[i].id.videoId + " target='_blanket'><button class='btn btn-danger'>Go to video</button></a></div>");
				/*Iframe 1: */ videosContainer.append("<div class='col-sm-6 col-md-4'><iframe class='mt-4' width='230' height='200' src='https://www.youtube.com/embed/" + response.items[i].id.videoId + "'frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><div class='col-sm-6 col-md-4'><h5 class='mt-4'>" + response.items[i].snippet.title + "</h5><p class='mt-4'>" + response.items[i].snippet.description + "</p></div><div class='col-sm-12 col-md-4 mt-5'><iframe style='width:200px;height:60px;border:0;overflow:hidden;' scrolling='no' src='https://www.yt-download.org/@api/button/mp3/"+response.items[i].id.videoId+"'></iframe></div>");
				//Iframe 2: videosContainer.append("<iframe class='mt-4' width='250' height='215' src='https://www.youtube.com/embed/" + response.items[i].id.videoId + "'frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><div class='col-lg-6'><h5 class='mt-4'>" + response.items[i].snippet.title + "</h5><p class='mt-4'>" + response.items[i].snippet.description + "</p></div><div class='col-lg-3'><p class='mt-4'>" + response.items[i].id.videoId + "</p><iframe width='250px' height='50px' scrolling='no' style='border:none;' src='https://www.download-mp3-youtube.com/api/?api_key=MzQ5MDU1ODA3&format=mp3&video_id="+ response.items[i].id.videoId+"'></iframe></div>");
			}
		}	
	}

	$(window).keypress(function(e) {
    if(e.keyCode == 13) {
        search();
    }
});

});

