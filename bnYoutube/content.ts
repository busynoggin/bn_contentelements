tt_content.bn_youtube = COA
tt_content.bn_youtube {

	## Include the necessary Javascript and CSS libraries.

	10 = INCLUDEJSLIBS
	10.fancybox = {$bnSiteConfig.commonResources.fancybox.js.path}

	12 = INCLUDEJSLIBS
	12.tx_bn_video = EXT:bn_video/res/bn_video.js
	
	15 = HEADERDATA
	15 {
		value = {$bnSiteConfig.commonResources.fancybox.css.path}
		wrap = <link rel="stylesheet" type="text/css" href="|" media="all">
	}

## Perhaps replace this later with SASS in the skin
	20 = HEADERDATA
	20 {
		value = typo3conf/ext/bn_video/res/bn_video.css
		wrap = <link rel="stylesheet" type="text/css" href="|" media="all">
	}

	## Setup CSS class for aspect ratio
	35 = CASE
	35 {
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
	
	## Setup CSS class for lightbox fallback
	40 = CASE
	40 {
		key.data = t3datastructure : pi_flexform->lightboxDisplay
		1 = LOAD_REGISTER
		1 {
			lightboxFallbackClass = video-fallback
			lightboxFallbackClass.noTrimWrap = | ||
		}
		default = LOAD_REGISTER
		default.lightboxFallbackClass = 
	}

	## Setup autoplay parameter
	45 = CASE
	45 {
		if.isFalse.data = t3datastructure : pi_flexform->lightboxDisplay
		key.data = t3datastructure : pi_flexform->autoPlay
		1 = LOAD_REGISTER
		1.autoPlay = &amp;autoplay=1
		default = LOAD_REGISTER
		default.autoPlay = &amp;autoplay=0
	}

	## Setup video start parameter
	50 = COA
	50 {
		if {
			value.data = t3datastructure : pi_flexform->startPoint
			isLessThan = 0
		}
		10 = LOAD_REGISTER
		10.videoStartPoint {
			data = t3datastructure : pi_flexform->startPoint
			if.isTrue.data = t3datastructure : pi_flexform->startPoint
			noTrimWrap = |&amp;start=||
		}
	}
	
	# Setup values for image sizing
	52 = CASE
	52 {
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

	55 = < lib.stdheader
	
	60 = COA
	60 {
		10 = IMAGE
		10 {
			if.isTrue.data = t3datastructure : pi_flexform->lightboxDisplay
			file {
				import.dataWrap = uploads/tx_bnvideo/bn_youtube/{t3datastructure : pi_flexform->image}
				width.dataWrap = {register:containerWidth}c
				height {
					dataWrap = {register:imageHeight}c
					if.isTrue.data = t3datastructure : pi_flexform->imageAspectRatio
				}
			}
			altText.data = t3datastructure : pi_flexform->title
			titleText.data = t3datastructure : pi_flexform->title
			stdWrap {
				innerWrap = |<div class="play-button">&nbsp;</div>
				innerWrap.if.isTrue.data = t3datastructure : pi_flexform->showPlayButton
				typolink {
					parameter.dataWrap = http://www.youtube.com/embed/{t3datastructure : pi_flexform->videoID}?autohide=1&modestbranding=1&rel=0&showinfo=0{register:videoStartPoint}
					ATagParams.dataWrap = class="bn-video youtube-vimeo-lightbox{register:aspectRatioClass}"
					title.data = t3datastructure : pi_flexform->title
					target = _blank
				}
			}
		}
		20 = TEXT
		20.dataWrap = <div class="bn-video youtube-vimeo-inline{register:aspectRatioClass}{register:lightboxFallbackClass}"><div class="spacer">&nbsp;</div><iframe src="http://www.youtube.com/embed/{t3datastructure : pi_flexform->videoID}?autohide=1&modestbranding=1&rel=0&showinfo=0{register:autoPlay}{register:videoStartPoint}" frameborder="0" webkitAllowFullScreen allowfullscreen></iframe></div><!-- end .youtube-vimeo-lightbox -->
	}

	#unset the startPoint, autoPlay and lightboxFallBackClass in case other videos are on the page
	90 = LOAD_REGISTER
	90 {
		videoStartPoint =
		autoPlay =
		lightboxFallBackClass =
	}
}