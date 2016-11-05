$(function() {
	
	var platform = '2'; // 1 = Xbox, 2 = Playstation
	var bungieID = '4611686018428682003';
	var apikey = '21f679f2524e4b8aa7567e6e80860192';
	var currentActivityHash;
	
	var tryLimit = 5;
	
	var bungieURL = 'https://www.bungie.net/platform/destiny/'+platform+'/Account/'+bungieID+'/Character/0/';
	
	function recursiveActivityCheck() {
	
		$.ajax({
			url: bungieURL,
			method: 'get',
			type: 'json',
			beforeSend: function(xhr) {
		        xhr.setRequestHeader('X-API-Key', apikey);
		    },
			success: function(data) {
				if ( data.ErrorCode === 1 ) {
					
					currentActivityHash = data.Response.data.characterBase.currentActivityHash;
					
					tryLimit = 5;
					
					if ( currentActivityHash !== 0 ) {
						console.log('deleted game cos you\'re not in orbit!');
						// delete the game and alert them that their game was remove as they aren't in orbit.
					} else {
						console.log('You\'re in orbit, so we\'ll continue to monitor your game.');
						setTimeout(recursiveActivityCheck, 5000);
					}
					
				} else {
					console.log('User is not logged into Destiny.');
					
					
					tryLimit--;
					
					if ( tryLimit === 0 ) {
						console.log('Try limit reached zero! Your game has been deleted!');
						// If limit reaches 0 then delete the game and alert them that their game was remove as they aren't in orbit.
					} else {
						setTimeout(recursiveActivityCheck, 5000);
					}
					
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
		
	}
	
	recursiveActivityCheck();
	
});