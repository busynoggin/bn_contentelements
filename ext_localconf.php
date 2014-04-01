<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

tx_weccontentelements_lib::addTyposcript($_EXTKEY, 'singleImage');
tx_weccontentelements_lib::addTyposcript($_EXTKEY, 'bnYoutube');
tx_weccontentelements_lib::addTyposcript($_EXTKEY, 'bnVimeo');
tx_weccontentelements_lib::addTyposcript($_EXTKEY, 'bnLocalVideo');

?>