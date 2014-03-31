jQuery(document).ready(function($){

	// If window is small exhange lighbox videos for inline
	if ($(window).width() <= 570) {
		$('.youtube-vimeo-lightbox').hide();
		$('.youtube-vimeo-inline.video-fallback').show();
		$('.local-video-lightbox').hide();
		$('.local-video-inline.video-fallback').show();
	}

	// YouTube and Vimeo Lighbox videos
	$('.youtube-vimeo-lightbox').bind('click', function() {

		if ($(window).width() > 730) {
			var videoWidth = 640;
		} else {
			var videoWidth = 460;
		}

		var href = $(this).attr('href');
		var title = $(this).attr('title');

		if ($(this).hasClass('aspect-ratio-43')) {
			var videoHeight = Math.round(videoWidth*0.75);
		} else {
			var videoHeight = Math.round(videoWidth*0.5625);
		}

		$.fancybox({
			'padding'		: 10,
			'content'		: '<iframe width="' + videoWidth + '" height="' + videoHeight + '" src="' + href + '&autoplay=1" frameborder="0" webkitAllowFullScreen allowfullscreen></iframe>',
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'title'			: title
		});

		return false;
	});

//	END DOC READY
});