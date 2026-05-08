<?php
	require"app/config.php";
	require"app/database.php";
	require"admin_login_db.php";
	
	$db = new Admin();
	
	header('Control-Type:application/json');
	header("Access-Control-Allow-Origin:*");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	
	#get body
	$rec=file_get_contents('php://input');
	$data=json_decode($rec,true);
	
	#get url parameters
	$params=[];
	$url=$_SERVER['REQUEST_URI'];
	$parts=parse_url($url);
	if(isset($parts['query'])){
		parse_str($parts['query'],$params);
	}
	
	$method=$_SERVER["REQUEST_METHOD"];
	
		if($method=="POST"){
			$response=[];
			
			if(!isset($data["aname"])  || !isset($data["apass"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if($row = $db->login($data["aname"],$data["apass"])){
				$response=[
				"status"=>true,
				"aname"=>$row->aname,
				"aid"=>$row->aid,
				];
			}
			else{
				$response=[
				"status"=>false,
				"error"=>"invalid login details",
				];
			}
			echo json_encode($response);
		}
?>