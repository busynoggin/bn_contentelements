tt_content.bnVimeo = COA
tt_content.bnVimeo {

	## Include the necessary Javascript and CSS libraries.

	10 = INCLUDEJSLIBS
	10.tx_bnvideo = EXT:bn_contentelements/res/video/bn_video.js

	## Perhaps replace this later with SASS in the skin
	20 = HEADERDATA
	20 {
		value = typo3conf/ext/bn_contentelements/res/video/bn_video.css
		wrap = <link rel="stylesheet" type="text/css" href="|" media="all">
	}

	## Setup CSS class for aspect ratio
	25 = CASE
	25 {
		key.data = t3datastructure : pi_flexform->aspectRatio
		43 = LOAD_REGISTER
		43 {
			aspectRatioClass = 43
			aspectRatioClass.noTrimWrap = | aspect-ratio-||
		}
		default = LOAD_REGISTER
		default {
			aspectRatioClass = 169
			aspectRatioClass.noTrimWrap = | aspect-ratio-||
		}
	}

	## Setup autoplay parameter
	30 = CASE
	30 {
		if.isFalse.data = t3datastructure : pi_flexform->lightboxDisplay
		key.data = t3datastructure : pi_flexform->autoPlay
		1 = LOAD_REGISTER
		1.autoPlay = &amp;autoplay=1
		default = LOAD_REGISTER
		default.autoPlay = &amp;autoplay=0
	}

	# Setup values for image sizing
	40 = CASE
	40 {
		key.data = t3datastructure : pi_flexform->imageAspectRatio
		169 = LOAD_REGISTER
		169 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = (|*9)/16
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		43 = LOAD_REGISTER
		43 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = (|*3)/4
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		32 = LOAD_REGISTER
		32 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = (|*2)/3
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		11 = LOAD_REGISTER
		11 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = |/1
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		21 = LOAD_REGISTER
		21 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = |/2
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		31 = LOAD_REGISTER
		31 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = |/3
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		41 = LOAD_REGISTER
		41 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = |/4
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		51 = LOAD_REGISTER
		51 {
			tempImageHeight.data = register : containerWidth
			tempImageHeight.wrap = |/5
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
	}

	50 =< lib.stdheader

	60 = CASE
	60 {
		key.data = t3datastructure : pi_flexform->lightboxDisplay

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
					width.dataWrap = {register:containerWidth}c
					height {
						dataWrap = {register:imageHeight}c
						if.isTrue.data = t3datastructure : pi_flexform->imageAspectRatio
					}
				}
				altText.data = t3datastructure : pi_flexform->title
				titleText.data = t3datastructure : pi_flexform->title
				stdWrap {
					innerWrap = |<div class="play-button">&nbsp;</div>
					innerWrap.if.isTrue.data = t3datastructure : pi_flexform->showPlayButton
					innerWrap2 = <div class="youtube-vimeo-wrap">|</div>
					typolink {
						parameter.dataWrap = http://player.vimeo.com/video/{t3datastructure : pi_flexform->videoID}?title=0&amp;byline=0&amp;portrait=0
						ATagParams.dataWrap = class="bn-video youtube-vimeo-lightbox{register:aspectRatioClass}"
						title.data = t3datastructure : pi_flexform->title
						target = _blank
					}
				}
			}
		}
		default = TEXT
		default {
			dataWrap = <div class="bn-video youtube-vimeo-inline{register:aspectRatioClass}"><div class="spacer">&nbsp;</div><iframe src="http://player.vimeo.com/video/{t3datastructure : pi_flexform->videoID}?title=0&amp;byline=0&amp;portrait=0{register:autoPlay}"  frameborder="0" webkitAllowFullScreen allowfullscreen></iframe></div><!-- end .youtube-vimeo-lightbox -->
		}
	}

	#unset the startPoint, autoPlay and lightboxFallBackClass in case other videos are on the page
	90 = LOAD_REGISTER
	90 {
		videoStartPoint =
		autoPlay =
	}

}