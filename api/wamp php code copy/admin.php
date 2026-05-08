<?php
	require"app/config.php";
	require"app/database.php";
	require"admin_db.php";
	
	$db = new adminDB();
	
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
	

		if($method=="GET"){
			$response=[];
			if(isset($params["id"])){
				if($row=$db->adminSingle($params["id"])){
					$response=[
					"status"=>true,
					"data"=>$row,
					];
				}
				else{
					$response=[
					"status"=>false,
					"error"=>"Record not found",
					];
				}
			}
			else{
				$response=[
				"status"=>false,
				"error"=>"No Records",
				];
			}
			echo json_encode($response);
		}elseif($method == "PUT"){
			$response=[];
			
			if(isset($params["apid"])){
				if($db->adminSingle($params["apid"])){
					if($edit=$db->adminPassEdit($params["apid"],$data)){
						$response=[
						"status"=>true,
						"msg"=>"Admin Password Edited Successfully",
						];
					}
					else{
						$response=[
						"status"=>false,
						"error"=>"Admin Password Edit Failed",
						];
					}
				}else{
					$response=[
					"status"=>false,
					"error"=>"Record not found",
					];
				}
			}else{
				$response=[
				"status"=>false,
				"error"=>"Invalid Passing",
				];
			}
			echo json_encode($response);
		}
	
?>