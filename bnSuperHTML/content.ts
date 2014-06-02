tt_content.bnSuperHTML = COA
tt_content.bnSuperHTML {

	10 = TEXT
	10 {
		data = t3datastructure : pi_flexform->html->htmlFile
		noTrimWrap = |HTML file |<br />|
	}

	15 = TEXT
	15 {
		data = t3datastructure : pi_flexform->html->htmlInline
		noTrimWrap = |HTML Inline |<br />|
	}

	20 = TEXT
	20 {
		data = t3datastructure : pi_flexform->css->cssFiles
		split {
			token.char = 10
			cObjNum = 1

			1 {
				1 = INCLUDECSS
				1 {
					1 = {current : 1}
					1.insertData = 1
				}
			}
		}
	}

	25 = CSSINLINE
	25 {
		data = t3datastructure : pi_flexform->css->cssInline
	}

	30 = TEXT
	30 {
		data = t3datastructure : pi_flexform->javascript->javascriptLibs
		split {
			token.char = 10
			cObjNum = 1

			1 {
				1 = INCLUDEJSLIBS
				1 {
					1 = {current : 1}
					1.insertData = 1
				}
			}
		}
	}

	35 = TEXT
	35 {
		data = t3datastructure : pi_flexform->javascript->javascriptFiles
		split {
			token.char = 10
			cObjNum = 1

			1 {
				1 = INCLUDEJS
				1 {
					1 = {current : 1}
					1.insertData = 1
				}
			}
		}
	}

	40 = INLINEJS
	40 {
		data = t3datastructure : pi_flexform->javascript->javascriptInline
	}
}

