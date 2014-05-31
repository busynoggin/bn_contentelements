<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

tx_weccontentelements_lib::addContentElement($_EXTKEY, 'bnSingleImage');
tx_weccontentelements_lib::addContentElement($_EXTKEY, 'bnYoutube');
tx_weccontentelements_lib::addContentElement($_EXTKEY, 'bnVimeo');
tx_weccontentelements_lib::addContentElement($_EXTKEY, 'bnVideoMP4');
tx_weccontentelements_lib::addContentElement($_EXTKEY, 'bnSuperHTML');

?>