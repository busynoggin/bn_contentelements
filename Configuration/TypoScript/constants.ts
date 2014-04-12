tt_content {

	// Set default lightbox width
	bnVideo.lightboxMaxWidth = 640

	// Set lightbox width for each video type to the default
	bnVideoMP4.lightboxMaxWidth = {$tt_content.bnVideo.lightboxMaxWidth}
	bnVimeo.lightboxMaxWidth = {$tt_content.bnVideo.lightboxMaxWidth}
	bnYoutube.lightboxMaxWidth = {$tt_content.bnVideo.lightboxMaxWidth}
}