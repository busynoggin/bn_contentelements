tt_content.bnVimeo = COA
tt_content.bnVimeo {

	// Includes objects 20 - 69
	<INCLUDE_TYPOSCRIPT: source="FILE: EXT:bn_contentelements/Configuration/TypoScript/video_base.ts">

	70 = CASE
	70 {
		key.data = t3datastructure : pi_flexform->lightbox->lightboxDisplay

		1 = FILES
		1 {
			references {
				fieldName = flexform_bnvimeo_image
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
					innerWrap2 = <div class="youtube-vimeo-wrap">|</div>
					typolink {
						parameter.dataWrap = http://player.vimeo.com/video/{t3datastructure : pi_flexform->video->videoID}?title=0&amp;byline=0&amp;portrait=0
						ATagParams.dataWrap = class="bn-video youtube-vimeo-lightbox{register:aspectRatioClass}{register:bnVideoFloatClass}"{register:bnVideoStyle}
						title.data = t3datastructure : pi_flexform->video->title
						target = _blank
					}
				}
			}
		}
		default = TEXT
		default {
			dataWrap = <div class="bn-video youtube-vimeo-inline{register:aspectRatioClass}{register:bnVideoFloatClass}"{register:bnVideoStyle}><div class="spacer">&nbsp;</div><iframe src="http://player.vimeo.com/video/{t3datastructure : pi_flexform->video->videoID}?title=0&amp;byline=0&amp;portrait=0{register:autoPlay}"  frameborder="0" webkitAllowFullScreen allowfullscreen></iframe></div><!-- end .youtube-vimeo-lightbox -->
		}
	}

}