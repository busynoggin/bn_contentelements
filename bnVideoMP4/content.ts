tt_content.bnVideoMP4 = COA
tt_content.bnVideoMP4 {

	<INCLUDE_TYPOSCRIPT: source="FILE: EXT:bn_contentelements/Configuration/TypoScript/video_base.ts">

	/**
	 * Setup video rendering including JS, CSS and player preview image
	 * This is bought in by the player's static template and overrides
	 * the following TS object tt_content.bn_localvideo.50
	 */

	 70 = TEXT
	 70 {
	 	value = !!! You need to set a static template for your bnVideoMP4 player of choice
	 	wrap = <p style="color:red;font-weight:bold;">|</p>
	 }

	// Clear out lightbox fallback and autoPlay in case others on same page
	90 = LOAD_REGISTER
	90 {
		lightboxFallBackClass =
		autoPlay =
	}

}
