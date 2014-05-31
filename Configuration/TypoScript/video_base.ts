// Include the necessary Javascript and CSS libraries.
20 = INCLUDEJSLIBS
20.tx_bnvideo = EXT:bn_contentelements/res/video/bn_video.js

25 = HEADERDATA
25 {
	value = typo3conf/ext/bn_contentelements/res/video/bn_video.css
	wrap = <link rel="stylesheet" type="text/css" href="|" media="all">
}

//Reset register in case there are multiple videos on the page
30 = LOAD_REGISTER
30 {
	bnVideoWidth >
	bnVideoHeight >
	bnVideoStyle >
	bnVideoStyleFloat >
	bnVideoFloatClass >
	bnVideoStyleMargin >
	tempImageHeight >
	imageHeight >
	aspectRatioClass >
	bnVideoBgColor >
}

// Set width
35 = LOAD_REGISTER
35.bnVideoWidth.data = register:containerWidth

40 = CASE
40 {
	if.isTrue.data = t3datastructure : pi_flexform->appearance->maxWidth
	key.data = t3datastructure : pi_flexform->appearance->maxWidthUnit

	1 = LOAD_REGISTER
	1 {
		bnVideoWidth.data= t3datastructure : pi_flexform->appearance->maxWidth
		bnVideoStyleWidth {
			data = register:bnVideoWidth
			wrap = width:|px;
		}
	}

	default = LOAD_REGISTER
	default {
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
}

42 = CASE
42 {
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

43 = LOAD_REGISTER
43 {
	bnVideoBgColor {
		noTrimWrap = | background-color:black;||
		if.isFalse.data = t3datastructure : pi_flexform->video->image
	}
}

45 = LOAD_REGISTER
45 {
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

47 = LOAD_REGISTER
47 {
	tempBNVideoStyle {
		dataWrap = {register:bnVideoStyleWidth}{register:bnVideoStyleMargin}{register:bnVideoStyleFloat}{register:bnVideoBgColor}
	}
	bnVideoStyle {
		// if.isTrue.data = register:tempBNVideoStyle
		data = register:tempBNVideoStyle
		noTrimWrap = |style="|"|
	}
}

# Setup values for image sizing
50 = CASE
50 {
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
55 = CASE
55 {
	key.data = t3datastructure : pi_flexform->video->aspectRatio
	43 = LOAD_REGISTER
	43 {
		aspectRatioClass = 43
		aspectRatioClass.noTrimWrap = | aspect-ratio-||
		aspectRatio = .75
		tempPosterImageHeight.data = register : bnVideoWidth
		tempPosterImageHeight.wrap = (|*3)/4
		posterImageHeight.data = register : tempPosterImageHeight
		posterImageHeight.prioriCalc = intval
	}
	default = LOAD_REGISTER
	default {
		aspectRatioClass = 169
		aspectRatioClass.noTrimWrap = | aspect-ratio-||
		aspectRatio = .5625
		tempPosterImageHeight.data = register : bnVideoWidth
		tempPosterImageHeight.wrap = (|*9)/16
		posterImageHeight.data = register : tempPosterImageHeight
		posterImageHeight.prioriCalc = intval
	}
}

## Setup autoplay parameter for youtube and vimeo
57 = CASE
57 {
	if.isFalse.data = t3datastructure : pi_flexform->lightbox->lightboxDisplay
	key.data = t3datastructure : pi_flexform->video->autoPlay
	1 = LOAD_REGISTER
	1.autoPlay = &amp;autoplay=1
	default = LOAD_REGISTER
	default.autoPlay = &amp;autoplay=0
}

## Setup video start parameter: Note there is adjust in Vimeo for this
58 = LOAD_REGISTER
58.videoStartPoint {
	data = t3datastructure : pi_flexform->video->startPoint
	if.isTrue.data = t3datastructure : pi_flexform->video->startPoint
	noTrimWrap = |&amp;start=||
}

60 =< lib.stdheader

// This is the rendering object and will be provided by the content element
70 >



#unset the startPoint, autoPlay and lightboxFallBackClass in case other videos are on the page
90 = LOAD_REGISTER
90 {
	videoStartPoint =
	autoPlay =
}