"use strict";

//state necessary for extensibility only.

let state={
	resources: []
};

//setter

function addResource (resource) {
	state.resources.push(resource);
}

const searchURL="https://www.googleapis.com/youtube/v3/search";

function useSearch (searchTerm, callback) {
	const query = {
		part: "snippet",
		key: "AIzaSyAiaZw5Gol1QolRJkvIB9u0Kg2g2qMpQuc",
		q: searchTerm
	};
	$.getJSON(searchURL, query, callback);
}

function replaceThumbnails (thumbnailList) {
	$(".js-thumbnail-location").empty().append(thumbnailList);
}

function createThumbnail (thumbnails, videoId) {
	let newThumbnail=$("<img>");
	newThumbnail.prop("src", thumbnails.default.url);
	let newLink=$("<a>");
	newLink.prop("href", `https://www.youtube.com/watch?v=${videoId}`);
	newThumbnail.wrap(newLink);
	console.log(newThumbnail.parent());
	return newThumbnail.parent();
}

function createThumbnails (resourceList) {
	const items = resourceList.items;
	let thumbnailList=[];
	for (let i = 0; i < items.length; i++) {
		addResource(items[i]);
		thumbnailList.push(
			createThumbnail(items[i].snippet.thumbnails, items[i].id.videoId)
		);
	}
	replaceThumbnails(thumbnailList);
}


function activateSearchButton () {
	$(".js-search").submit (
		function () {
			useSearch($(this).find('[name="search-term"]').val(), createThumbnails);
			return false;
		}
	)
}

$(activateSearchButton);