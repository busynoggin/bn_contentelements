tt_content.bnSingleImage = COA
tt_content.bnSingleImage {

	//Reset register in case there are multiple images on the page
	5 = LOAD_REGISTER
	5 {
		bnSingleImageCSSClass >
		bnSingleImageMargin >
		bnSingleImagePadding >
		bnSingleImageBorder >
		bnSingleImageDisplay >
		bnSingleImageFloat >
		bnSingleImagePostion >
		bnSingleImageZindex >
	}

	// Set width
	10 = LOAD_REGISTER
	10.bnSingleImageWidth.data = register:containerWidth

	12 = CASE
	12 {
		if.isTrue.data = t3datastructure : pi_flexform->appearance->maxWidth
		key.data = t3datastructure : pi_flexform->appearance->maxWidthUnit

		// using straight pixels
		1 = LOAD_REGISTER
		1.bnSingleImageWidth.data= t3datastructure : pi_flexform->appearance->maxWidth

		// Converting percentage to pixels
		default = LOAD_REGISTER
		default {
			tempBNSingleImageWidth.data= t3datastructure : pi_flexform->appearance->maxWidth
			tempBNSingleImageWidth.dataWrap = (|/100)*{register:containerWidth}
			bnSingleImageWidth.data = register : tempBNSingleImageWidth
			bnSingleImageWidth.prioriCalc = intval
		}
	}

	// Calculate image height
	15 = CASE
	15 {
		key.data = t3datastructure : pi_flexform->appearance->imageAspectRatio
		5 = LOAD_REGISTER
		5 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = |/5
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		4 = LOAD_REGISTER
		4 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = |/4
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		3 = LOAD_REGISTER
		3 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = |/3
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		2 = LOAD_REGISTER
		2 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = |/2
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		1 = LOAD_REGISTER
		1 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = |/1
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		43 = LOAD_REGISTER
		43 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = (|*3)/4
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		169 = LOAD_REGISTER
		169 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = (|*9)/16
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		32 = LOAD_REGISTER
		32 {
			tempBNSingleImageHeight.data = register:bnSingleImageWidth
			tempBNSingleImageHeight.wrap = (|*2)/3
			bnSingleImageHeight.data = register : tempBNSingleImageHeight
			bnSingleImageHeight.prioriCalc = intval
		}
		default = LOAD_REGISTER
		default.bnSingleImageHeight = 0
	}

	20 = LOAD_REGISTER
	20 {
		bnSingleImageCSSClass {
			data = t3datastructure : pi_flexform->advanced->cssClass
			noTrimWrap = | ||
			if.isTrue.data = t3datastructure : pi_flexform->advanced->cssClass
		}
		bnSingleImageMargin {
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
		bnSingleImagePadding {
			data = t3datastructure : pi_flexform->appearance->padding
			split {
				token = ,
				cObjNum = 1
				1.current = 1
				1.noTrimWrap = | |px|
			}
			wrap = padding:|;
			if.isTrue.data = t3datastructure : pi_flexform->appearance->padding
		}
		bnSingleImageBorder {
			dataWrap = border:{t3datastructure : pi_flexform->appearance->borderWidth}px {t3datastructure : pi_flexform->appearance->borderStyle} {t3datastructure : pi_flexform->appearance->borderColor};
			if.isTrue.data = t3datastructure : pi_flexform->appearance->borderStyle
		}
		bnSingleImageDisplay {
			data = t3datastructure : pi_flexform->advanced->display
			wrap = display:|;
		}
		bnSingleImageFloat {
			data = t3datastructure : pi_flexform->advanced->float
			wrap = float:|;
		}
		bnSingleImagePosition {
			data = t3datastructure : pi_flexform->advanced->position
			wrap = position:|;
		}
		bnSingleImageZindex {
			data = t3datastructure : pi_flexform->advanced->zIndex
			wrap = z-index:|;
			if.isTrue.data = t3datastructure : pi_flexform->advanced->zIndex
		}
	}

	25 = CASE
	25 {
		if.isTrue.data = t3datastructure : pi_flexform->advanced->positionCoordinates
		key.data  = t3datastructure : pi_flexform->advanced->positionCoordinatesOrigin
		1 = LOAD_REGISTER
		1 {
			positionCoordinates {
				data = t3datastructure : pi_flexform->advanced->positionCoordinates
				split {
					token = ,
					cObjNum = 1
					1.current = 1
					wrap = right: |px;|| top: |px;
				}

				if.isTrue.data = t3datastructure : pi_flexform->advanced->positionCoordinates
			}
		}

		2 < .1
		2.positionCoordinates.split.wrap = left: |px;|| bottom: |px;

		3 < .1
		3.positionCoordinates.split.wrap = right: |px;|| bottom: |px;

		default < .1
		default.positionCoordinates.split.wrap = left: |px;|| top: |px;
	}

	// Render header
	30 =< lib.stdheader

	// Render image
	40 = CASE
	40 {
		key.data = register:bnSingleImageHeight

		0 = FILES
		0 {
			references {
				fieldName = flexform_bnsingleimage_image
			}

			renderObj = IMAGE
			renderObj {
				file {
					import.data = file:current:originalUid // file:current:uid
					width.dataWrap = {register:bnSingleImageWidth}
				}
				altText.data = file:current:alternative
				titleText.data = file:current:title
				params = class="single-image{register:bnSingleImageCSSClass}" style="{register:bnSingleImageMargin}{register:bnSingleImagePadding}{register:bnSingleImageBorder}{register:bnSingleImageDisplay}{register:bnSingleImageFloat}{register:bnSingleImagePosition}{register:positionCoordinates}{register:bnSingleImageZindex}"
				params.insertData = 1
				imageLinkWrap < tt_content.image.20.1.imageLinkWrap
				imageLinkWrap {
					enable.field >
					enable.data = t3datastructure : pi_flexform->image->clickEnlarge
					typolink.title.data = file:current:title
					linkParams.title.data = file:current:title
				}
			}
		}

		default < .0
		default.renderObj.file.width.dataWrap = {register:bnSingleImageWidth}c
		default.renderObj.file.height.dataWrap = {register:bnSingleImageHeight}c
	}
}
