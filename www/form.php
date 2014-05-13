<?php
header('Content-type:application/json; charset=UTF-8');

function ajaxResponse(array $data = array()) {
	echo json_encode($data);
	exit();
}

function ajaxError($message, array $data = array()) {
	$data['ret'] = 0;
	$data['message'] = $message;
	ajaxResponse($data);
}

function ajax(array $data = array()) {
	$data['ret'] = 1;
	ajaxResponse($data);
}

if (isset($_POST['phone'])) {
	$phone = trim($_POST['phone']);
	$phone = preg_replace('/[^0-9]/', '', $phone);
	if (preg_match('/^[78]981/', $phone)) {
		ajaxError('Не вводите телефон с кодом 981');
	}

	$ret = array();

	// $ret['message'] = 'Успех пришел из php';

	ajax($ret);
} else {
	ajaxError('Не указан телефон');
}
