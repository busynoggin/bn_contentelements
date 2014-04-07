tt_content.bnYoutube = COA
tt_content.bnYoutube {

	// Includes objects 20 - 69
	<INCLUDE_TYPOSCRIPT: source="FILE: EXT:bn_contentelements/Configuration/TypoScript/video_base.ts">

	70 = CASE
	70 {
		key.data = t3datastructure : pi_flexform->lightbox->lightboxDisplay

		1 = FILES
		1 {
			references {
				table.field = table
				uid.field = uid
				fieldName = flexform_bnvideo_image
			}

			renderObj = IMAGE
			renderObj {
				file {
					import.data = file:current:originalUid // file:current:uid
					width.dataWrap = {register:bnVideoWidth}c
					height {
						dataWrap = {register:imageHeight}c
						if.isTrue.data = t3datastructure : pi_flexform->lightbox->imageAspectRatio
					}
				}
				altText.data = t3datastructure : pi_flexform->video->title
				titleText.data = t3datastructure : pi_flexform->video->title
				stdWrap {
					innerWrap = |<div class="play-button">&nbsp;</div>
					innerWrap.if.isTrue.data = t3datastructure : pi_flexform->lightbox->showPlayButton
					typolink {
						parameter.dataWrap = http://www.youtube.com/embed/{t3datastructure : pi_flexform->video->videoID}?autohide=1&modestbranding=1&rel=0&showinfo=0{register:videoStartPoint}
						ATagParams.dataWrap = class="bn-video youtube-vimeo-lightbox{register:aspectRatioClass}{register:bnVideoFloatClass}"{register:bnVideoStyle}
						title.data = t3datastructure : pi_flexform->video->title
						target = _blank
					}
				}
			}
		}
		default = TEXT
		default.dataWrap = <div class="bn-video youtube-vimeo-inline{register:aspectRatioClass}{register:bnVideoFloatClass}"{register:bnVideoStyle}><div class="spacer">&nbsp;</div><iframe src="http://www.youtube.com/embed/{t3datastructure : pi_flexform->video->videoID}?autohide=1&modestbranding=1&rel=0&showinfo=0{register:autoPlay}{register:videoStartPoint}" frameborder="0" webkitAllowFullScreen allowfullscreen></iframe></div><!-- end .youtube-vimeo-lightbox -->
	}

}