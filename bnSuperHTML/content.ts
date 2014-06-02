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
			1.current = 1
			1.noTrimWrap = |CSS FILE |<br />|
		}
	}

	25 = TEXT
	25 {
		noTrimWrap = |CSS Inline |<br />|
		data = t3datastructure : pi_flexform->css->cssInline
	}

	30 = TEXT
	30 {
		data = t3datastructure : pi_flexform->javascript->javascriptLibs
		split {
			token.char = 10
			cObjNum = 1
			1 = INCLUDEJSLIBS
			1.10.current = 1
			1.10.insertData = 1
		}
	}


	35 = TEXT
	35 {
		data = t3datastructure : pi_flexform->javascript->javascriptFiles
		split {
			token.char = 10
			cObjNum = 1
			1.current = 1
			1.noTrimWrap = |JS FILES |<br />|
		}
	}

	40 = TEXT
	40 {
		data = t3datastructure : pi_flexform->javascript->javascriptInline
		noTrimWrap = |JS Inline |<br />|
	}
}

