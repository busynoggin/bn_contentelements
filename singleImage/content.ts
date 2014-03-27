tt_content.singleImage = COA
tt_content.singleImage {

	//Reset register in case there are multiple images on the page
	5 = LOAD_REGISTER
	5 {
		singleImageCSSClass >
		singleImageMargin >
		singleImagePadding >
		singleImageBorder >
		singleImageDisplay >
		singleImageFloat >
		singleImagePostion >
		singleImageZindex >
	}

	// Set width
	10 = LOAD_REGISTER
	10.singleImageWidth.data = register:containerWidth

	12 = CASE
	12 {
		if.isTrue.data = t3datastructure : pi_flexform->maxWidth
		key.data = t3datastructure : pi_flexform->maxWidthUnit
		1 = LOAD_REGISTER
		1 {
			tempSingleImageWidth.data= t3datastructure : pi_flexform->maxWidth
			tempSingleImageWidth.dataWrap = (|/100)*{register:containerWidth}
			singleImageWidth.data = register : tempSingleImageWidth
			singleImageWidth.prioriCalc = intval
		}
		default = LOAD_REGISTER
		default.singleImageWidth.data= t3datastructure : pi_flexform->maxWidth

	}

	// Calculate image height
	15 = CASE
	15 {
		key.data = t3datastructure : pi_flexform->imageAspectRatio
		5 = LOAD_REGISTER
		5 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = |/5
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		4 = LOAD_REGISTER
		4 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = |/4
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		3 = LOAD_REGISTER
		3 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = |/3
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		2 = LOAD_REGISTER
		2 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = |/2
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		1 = LOAD_REGISTER
		1 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = |/1
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		43 = LOAD_REGISTER
		43 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = (|*3)/4
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		169 = LOAD_REGISTER
		169 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = (|*9)/16
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		32 = LOAD_REGISTER
		32 {
			tempSingleImageHeight.data = register:singleImageWidth
			tempSingleImageHeight.wrap = (|*2)/3
			singleImageHeight.data = register : tempSingleImageHeight
			singleImageHeight.prioriCalc = intval
		}
		default = LOAD_REGISTER
		default.singleImageHeight = 0
	}

	20 = LOAD_REGISTER
	20 {
		singleImageCSSClass {
			data = t3datastructure : pi_flexform->cssClass
			noTrimWrap = | ||
			if.isTrue.data = t3datastructure : pi_flexform->cssClass
		}
		singleImageMargin {
			data = t3datastructure : pi_flexform->margin
			split {
				token = ,
				cObjNum = 1
				1.current = 1
				1.noTrimWrap = | |px|
			}
			wrap = margin:|;
			if.isTrue.data = t3datastructure : pi_flexform->margin
		}
		singleImagePadding {
			data = t3datastructure : pi_flexform->padding
			split {
				token = ,
				cObjNum = 1
				1.current = 1
				1.noTrimWrap = | |px|
			}
			wrap = padding:|;
			if.isTrue.data = t3datastructure : pi_flexform->padding
		}
		singleImageBorder {
			dataWrap = border:{t3datastructure : pi_flexform->borderWidth}px {t3datastructure : pi_flexform->borderStyle} {t3datastructure : pi_flexform->borderColor};
			if.isTrue.data = t3datastructure : pi_flexform->borderStyle
		}
		singleImageDisplay {
			data = t3datastructure : pi_flexform->display
			wrap = display:|;
		}
		singleImageFloat {
			data = t3datastructure : pi_flexform->float
			wrap = float:|;
		}
		singleImagePosition {
			data = t3datastructure : pi_flexform->position
			wrap = position:|;
		}
		singleImageZindex {
			data = t3datastructure : pi_flexform->zIndex
			wrap = z-index:|;
			if.isTrue.data = t3datastructure : pi_flexform->zIndex
		}
	}

	25 = CASE
	25 {
		if.isTrue.data = t3datastructure : pi_flexform->positionCoordinates
		key.data  = t3datastructure : pi_flexform->positionCoordinatesOrigin
		1 = LOAD_REGISTER
		1 {
			positionCoordinates {
				data = t3datastructure : pi_flexform->positionCoordinates
				split {
					token = ,
					cObjNum = 1
					1.current = 1
					wrap = right: |px;|| top: |px;
				}

				if.isTrue.data = t3datastructure : pi_flexform->positionCoordinates
			}
		}

		2 < .1
		2.positionCoordinates.split.wrap = left: |px;|| bottom: |px;

		3 < .1
		3.positionCoordinates.split.wrap = right: |px;|| bottom: |px;

		default < .1
		default.positionCoordinates.split.wrap = left: |px;|| top: |px;
	}

	30 = CASE
	30 {
		key.data = register:singleImageHeight

		0 = FILES
		0 {
			references {
				table.field = table
				uid.field = uid
				fieldName = flexform_singleimage_image
			}

			renderObj = IMAGE
			renderObj {
				file {
					import.data = file:current:originalUid // file:current:uid
					width.dataWrap = {register:singleImageWidth}
				}
				altText.data = file:current:alternative
				params = class="single-image{register:singleImageCSSClass}" style="{register:singleImageMargin}{register:singleImagePadding}{register:singleImageBorder}{register:singleImageDisplay}{register:singleImageFloat}{register:singleImagePosition}{register:positionCoordinates}{register:singleImageZindex}"
				params.insertData = 1
				stdWrap.typolink {
					parameter.data = t3datastructure : pi_flexform->link
				}
			}
		}

		default < .0
		default.renderObj.file.width.dataWrap = {register:singleImageWidth}c
		default.renderObj.file.height.dataWrap = {register:singleImageHeight}c
	}
	// Render image


	40 = TEXT
	40.insertData = 1
	40.value (
		singleImageCSSClass: {register:singleImageCSSClass}<br />
		singleImageMargin: {register:singleImageMargin}<br />
		singleImagePadding: {register:singleImagePadding}<br />
		singleImageBorder: {register:singleImageBorder}<br />
		singleImageDisplay: {register:singleImageDisplay}<br />
		singleImageFloat: {register:singleImageFloat}<br />
		singleImagePostion: {register:singleImagePosition}<br />
		singleImageZindex: {register:singleImageZindex}<br />
		singleImageWidth: {register:singleImageWidth}<br />
		singleImageHeight: {register:singleImageHeight}<br />
		positionCoordinates: {register:positionCoordinates}<br />
		ration {t3datastructure : pi_flexform->imageAspectRatio}
	)
}
