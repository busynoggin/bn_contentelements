tt_content.bnYoutube = COA
tt_content.bnYoutube {

	## Include the necessary Javascript and CSS libraries.

	10 = INCLUDEJSLIBS
	10.tx_bnvideo = EXT:bn_contentelements/res/video/bn_video.js

	## Perhaps replace this later with SASS in the skin
	15 = HEADERDATA
	15 {
		value = typo3conf/ext/bn_contentelements/res/video/bn_video.css
		wrap = <link rel="stylesheet" type="text/css" href="|" media="all">
	}

	//Reset register in case there are multiple videos on the page
	20 = LOAD_REGISTER
	20 {
		bnVideoWidth >
		bnVideoWidth >
		bnVideoStyle >
		bnVideoStyleFloat >
		bnVideoFloatClass >
		bnVideoStyleMargin >
		tempImageHeight >
		imageHeight >
		aspectRatioClass >
	}

	// Set width
	25 = LOAD_REGISTER
	25.bnVideoWidth.data = register:containerWidth

	30 = CASE
	30 {
		if.isTrue.data = t3datastructure : pi_flexform->appearance->maxWidth
		key.data = t3datastructure : pi_flexform->appearance->maxWidthUnit
		1 = LOAD_REGISTER
		1 {
			tempBNVideoWidth.data= t3datastructure : pi_flexform->appearance->maxWidth
			tempBNVideoWidth.dataWrap = (|/100)*{register:containerWidth}
			bnVideoWidth {
				data = register : tempBNVideoWidth
				prioriCalc = intval
			}
			bnVideoStyleWidth {
				data = register:bnVideoWidth
				wrap = width:|px;
			}
		}
		default = LOAD_REGISTER
		default {
			bnVideoWidth.data= t3datastructure : pi_flexform->appearance->maxWidth
			bnVideoStyleWidth {
				data = register:bnVideoWidth
				wrap = width:|px;
			}
		}
	}

	32 = CASE
	32 {
		if.isTrue.data = t3datastructure : pi_flexform->appearance->float
		right = LOAD_REGISTER
		right {
			bnVideoStyleFloat {
				data = t3datastructure : pi_flexform->appearance->float
				wrap = float:|;
			}
			bnVideoFloatClass {
				data = t3datastructure : pi_flexform->appearance->float
				noTrimWrap = | ||
			}
		}
		default = LOAD_REGISTER
		default {
			bnVideoStyleFloat {
				data = t3datastructure : pi_flexform->appearance->float
				wrap = float:|;
			}
			bnVideoFloatClass {
				data = t3datastructure : pi_flexform->appearance->float
				noTrimWrap = | ||
			}
		}
	}

	35 = LOAD_REGISTER
	35 {
		bnVideoStyleMargin {
			data = t3datastructure : pi_flexform->appearance->margin
			split {
				token = ,
				cObjNum = 1
				1.current = 1
				1.noTrimWrap = | |px|
			}
			wrap = margin:|;
			if.isTrue.data = t3datastructure : pi_flexform->appearance->margin
		}
	}

	37 = LOAD_REGISTER
	37 {
		tempBNVideoStyle {
			dataWrap = {register:bnVideoStyleWidth}{register:bnVideoStyleMargin}{register:bnVideoStyleFloat}
		}
		bnVideoStyle {
			// if.isTrue.data = register:tempBNVideoStyle
			data = register:tempBNVideoStyle
			noTrimWrap = |style="|"|
		}
	}

	# Setup values for image sizing
	40 = CASE
	40 {
		key.data = t3datastructure : pi_flexform->lightbox->imageAspectRatio
		169 = LOAD_REGISTER
		169 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = (|*9)/16
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		43 = LOAD_REGISTER
		43 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = (|*3)/4
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		32 = LOAD_REGISTER
		32 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = (|*2)/3
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		11 = LOAD_REGISTER
		11 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = |/1
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		21 = LOAD_REGISTER
		21 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = |/2
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		31 = LOAD_REGISTER
		31 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = |/3
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		41 = LOAD_REGISTER
		41 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = |/4
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
		51 = LOAD_REGISTER
		51 {
			tempImageHeight.data = register : bnVideoWidth
			tempImageHeight.wrap = |/5
			imageHeight.data = register : tempImageHeight
			imageHeight.prioriCalc = intval
		}
	}

	## Setup CSS class for aspect ratio
	45 = CASE
	45 {
		key.data = t3datastructure : pi_flexform->video->aspectRatio
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
	47 = CASE
	47 {
		if.isFalse.data = t3datastructure : pi_flexform->lightbox->lightboxDisplay
		key.data = t3datastructure : pi_flexform->video->autoPlay
		1 = LOAD_REGISTER
		1.autoPlay = &amp;autoplay=1
		default = LOAD_REGISTER
		default.autoPlay = &amp;autoplay=0
	}

	## Setup video start parameter
	50 = COA
	50 {
		if {
			value.data = t3datastructure : pi_flexform->video->startPoint
			isLessThan = 0
		}
		10 = LOAD_REGISTER
		10.videoStartPoint {
			data = t3datastructure : pi_flexform->video->startPoint
			if.isTrue.data = t3datastructure : pi_flexform->video->startPoint
			noTrimWrap = |&amp;start=||
		}
	}


	55 =< lib.stdheader

	60 = CASE
	60 {
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

	#unset the startPoint, autoPlay and lightboxFallBackClass in case other videos are on the page
	90 = LOAD_REGISTER
	90 {
		videoStartPoint =
		autoPlay =
	}
}