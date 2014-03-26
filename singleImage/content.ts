tt_content.thumbnailCarousel = COA
tt_content.thumbnailCarousel {

	// The jQueryCarousel JS and CSS files are included by a static template in the base

	// Include the Javascript settings for the gallery.
	20 = COA
	20 {
		wrap = <script>|</script>
		10 = TEXT
		10.value (
				(function($){
					$(function(){
						$('.carousel').carousel({
							animSpeed: "slow",
							nextBtn: '<img src="/fileadmin/Configuration/Base/StaticTemplates/jQueryCarousel/Resources/Public/jQueryCarousel0.9/images/next.png" alt="next" width="34" height="33" />',
							prevBtn: '<img src="/fileadmin/Configuration/Base/StaticTemplates/jQueryCarousel/Resources/Public/jQueryCarousel0.9/images/prev.png" alt="prev" width="34" height="33" />',
							
		)

		15 = TEXT
		15 {
			value = dispItems: { t3datastructure : pi_flexform->displayItems}
			insertData = 1
		}

		20 = TEXT
		20.value (
						});
					});
				})(jQuery);
		)
	}

	// Draw each thumbnail in the carousel.
	30 = FFSECTION
	30.rootPath = t3datastructure : pi_flexform->images/el
	30 {
		stdWrap.wrap = <div id="container"><div class="carousel"><ul> | </ul></div><div style="clear: both;"></div></div>
		10 = COA
		10 {
			stdWrap.wrap = <li> | </li>
			stdWrap.typolink.parameter.data = flexformSection : image/el/link

			10 = IMAGE
			10 {
				file {
					import {
						data = flexformSection : image/el/file
						wrap = uploads/usc_contentelements/thumbnailCarousel/
					}
					width = 81c
					height = 81c
				}
				altText.data = flexformSection : image/el/title
			}

			20 = TEXT
			20 {
				wrap = <span> | </span>
				data = flexformSection : image/el/title
			}
		}
	}
}
