<?php

	//json返却後、exit
	function jsonEncode($data)
	{
		print json_encode($data);
		exit;
	}

	//IPアドレス照合
	function ipaddressCheck($ip_list, $ipaddress = null)
	{
		$ip_list = explode("\n", $ip_list);
		$ip_list = array_map("mb_trim", $ip_list);

		if(is_null($ipaddress)) $ipaddress = $_SERVER["REMOTE_ADDR"];

		foreach($ip_list as $key => $val)
		{
			$search = "/^".str_replace(".","\.",$val);

			if(mb_substr($val, -1) === ".")
				$search = $search."/";
			else
				$search = $search."$/";

			if(preg_match($search, $ipaddress))
			{
				return true;
			}
		}
		return false;
	}

	//curlを使用したページ取得
	function curl_get_contents($url, $timeout = 60)
	{
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);

		$result = curl_exec($ch);
		curl_close($ch);

		return $result;
	}

	//fgetcsvの代替関数
	function fgetcsv_reg(&$handle, $length = null, $d = ',', $e = '"')
	{
		$d = preg_quote($d);
		$e = preg_quote($e);

		$_line = "";
		$eof = false;

		while($eof != true && !feof($handle))
		{
			$_line .= (empty($length) ? fgets($handle) : fgets($handle, $length));
			$itemcnt = preg_match_all('/'.$e.'/', $_line, $dummy);
			if ($itemcnt % 2 == 0) $eof = true;
		}

		$_csv_line = preg_replace('/(?:\\r\\n|[\\r\\n])?$/', $d, trim($_line));
		$_csv_pattern = '/('.$e.'[^'.$e.']*(?:'.$e.$e.'[^'.$e.']*)*'.$e.'|[^'.$d.']*)'.$d.'/';
		preg_match_all($_csv_pattern, $_csv_line, $_csv_matches);
		$_csv_data = $_csv_matches[1];

		for($_csv_i=0;$_csv_i<count($_csv_data);$_csv_i++)
		{
			$_csv_data[$_csv_i]=preg_replace('/^'.$e.'(.*)'.$e.'$/s','$1',$_csv_data[$_csv_i]);
			$_csv_data[$_csv_i]=str_replace($e.$e, $e, $_csv_data[$_csv_i]);
		}
		return empty($_line) ? false : $_csv_data;
	}

	//htmlspecialcharsエイリアス
	function h($str)
	{
		if(is_array($str))
			return array_map("h", $str);
		else
			return htmlspecialchars($str, ENT_QUOTES);
	}

	//改行コードをbrに変換
	function br($str, $br = false)
	{
		if($br) str_replace("<br />", "\n", $str);
		else return str_replace("\n", "<br />", str_replace("\r", "", $str));	
	}

	//file_exists拡張（include_path適用版）
	function file_exists_ex($path)
	{
		if($path[0] == DIRECTORY_SEPARATOR) return file_exists($path);

		$include_path_list = explode(PATH_SEPARATOR, get_include_path());
		if(is_array($include_path_list) == false) return file_exists($path);

		foreach($include_path_list as $include_path)
		{
			if(file_exists($include_path . DIRECTORY_SEPARATOR . $path)) return true;
		}
		return false;
	}

	//trimの代替関数
	function mb_trim($str, $chars = " \t\n\r\0\x0B")
	{
		error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
		return mb_ereg_replace("[$chars]+$", "", mb_ereg_replace("^[$chars]+", "", $str));
	}

	//rtrimの代替関数
	function mb_rtrim($str, $chars = " \t\n\r\0\x0B")
	{
		error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
		return mb_ereg_replace("[$chars]+$", "", $str);
	}

	//ltrimの代替関数
	function mb_ltrim($str, $chars = " \t\n\r\0\x0B")
	{
		error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
		return mb_ereg_replace("^[$chars]+", "", $str);
	}
