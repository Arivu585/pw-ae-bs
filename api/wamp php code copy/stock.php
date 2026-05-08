<?php
	require"app/config.php";
	require"app/database.php";
	require"stock_db.php";
	
	$db = new stockDB();
	
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
			if(isset($params["sid"])){
				if($row=$db->stockSingle($params["sid"])){
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
			}else if(isset($params["sqid"])){
				if($row=$db->stockQty($params["sqid"])){
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
				if($rows=$db->stockAll()){
					$response=[
					"status"=>true,
					"data"=>$rows,
					];
				}else{
					$response=[
					"status"=>false,
					"error"=>"No Records",
					];
				}
			}
			echo json_encode($response);
		}elseif($method=="POST"){
			$response=[];
			
			if(!isset($data["date"]) || !isset($data["pid"]) || !isset($data["qty"]) || !isset($data["phrate"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if($db->stockAdd($data)){
				$response=[
				"status"=>true,
				"msg"=>"Product Added Successfully",
				];
			}
			else{
				$response=[
				"status"=>false,
				"error"=>"Product Added Failed",
				];
			}
			echo json_encode($response);
		}elseif($method=="PUT"){
			$response=[];
			
			if(!isset($data["date"]) || !isset($data["pid"]) || !isset($data["qty"]) || !isset($data["phrate"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if(isset($params["sid"])){
				if($db->stockSingle($params["sid"])){
					if($edit=$db->stockEdit($params["sid"],$data)){
						$response=[
						"status"=>true,
						"msg"=>"stock Edited Successfully",
						];
					}else{
						$response=[
						"status"=>false,
						"error"=>"stock Edit Failed",
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
				"error"=>"Record not found",
				];
			}
			echo json_encode($response);
		}elseif($method=="DELETE"){
			$response=[];
			if(isset($params["sid"])){
				if($row=$db->stockDelete($params["sid"])){
					$response=[
					"status"=>true,
					"msg"=>"stock Deleted Successfully",
					];
				}
				else{
					$response=[
					"status"=>false,
					"error"=>"stock Delete Failed",
					];
				}
			}else{
				$response=[
				"status"=>false,
				"error"=>"Record not found",
				];
			}
			echo json_encode($response);
		}
	
?>