tt_content.bnVideoMP4 = COA
tt_content.bnVideoMP4 {

	// Show the standard content element header.
	5 = < lib.stdheader

	/**
	 * Include player specific JS and player specific CSS
	 * This is bought in by the player's static template
	 * 10 = COA
	 */

	15 = INCLUDEJSLIBS
	15.tx_bn_video = EXT:bn_video/res/bn_video.js


	 // Bring in CSS
	17 = HEADERDATA
	17 {
		value = typo3conf/ext/bn_contentelements/res/video/bn_video.css
		wrap = <link rel="stylesheet" type="text/css" href="|" media="all">
	}

	// Load register with video width, height and CSS class for aspect ratio
	20 = CASE
	20 {
		key.data = t3datastructure : pi_flexform->aspectRatio

		# Standard (4x3)
		1 = LOAD_REGISTER
		1 {
			videoWidth.data = register : containerWidth
			tempVideoHeight.data = register:containerWidth
			tempVideoHeight.wrap = (|*.75)
			videoHeight.data = register : tempVideoHeight
			videoHeight.prioriCalc = intval
			aspectRatioClass = aspect-ratio-43
			aspectRatio = .75
		}

		# Widescreen (16x9)
		default = LOAD_REGISTER
		default {
			videoWidth.data = register : containerWidth
			tempVideoHeight.data = register : containerWidth
			tempVideoHeight.wrap = (|*.5625)
			videoHeight.data = register : tempVideoHeight
			videoHeight.prioriCalc = intval
			aspectRatioClass = aspect-ratio-169
			aspectRatio = .5625
		}
	}

	// Load register with auto play if true

	40 = LOAD_REGISTER
	40 {
		autoPlay = autoplay
		autoPlay {
			noTrimWrap = | ||
			if {
				isTrue.data = t3datastructure : pi_flexform->autoPlay
				isFalse.data = t3datastructure : pi_flexform->lightboxDisplay
			}
		}
	}

	// Setup trigger image width and height
	45 = CASE
	45 {
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

	/**
	 * Setup video rendering including JS, CSS and player preview image
	 * This is bought in by the player's static template and overrides
	 * the following TS object tt_content.bn_localvideo.50
	 */

	 70 = TEXT
	 70 {
	 	value = !!! You need to set a static template for your bn_video player
	 	wrap = <p style="color:red;font-weight:bold;">|</p>
	 }

	// Clear out lightbox fallback and autoPlay in case others on same page
	90 = LOAD_REGISTER
	90 {
		lightboxFallBackClass =
		autoPlay =
	}

}
