tt_content {

	// Set default lightbox width
	bn_video.lightboxMaxWidth = 720

	// Set lightbox width for each video type to the default
	bn_localvideo.lightboxMaxWidth = {$tt_content.bn_video.lightboxMaxWidth}
	bn_vimeo.lightboxMaxWidth = {$tt_content.bn_video.lightboxMaxWidth}
	bn_youtube.lightboxMaxWidth = {$tt_content.bn_video.lightboxMaxWidth}
}