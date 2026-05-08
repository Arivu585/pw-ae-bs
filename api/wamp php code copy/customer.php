<?php
	require"app/config.php";
	require"app/database.php";
	require"customer_db.php";
	
	$db = new customerDB();
	
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
			if(isset($params["cid"])){
				if($row=$db->customerSingle($params["cid"])){
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
			}else if(isset($params["type"])){
				if($row=$db->customerType($params["type"])){
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
				if($rows=$db->customerAll()){
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
			
			if(!isset($data["cname"]) || !isset($data["address"]) || !isset($data["city"]) || !isset($data["contact"]) || !isset($data["type"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if($db->customerAdd($data)){
				$response=[
				"status"=>true,
				"msg"=>"customer Added Successfully",
				];
			}
			else{
				$response=[
				"status"=>false,
				"error"=>"customer Added Failed",
				];
			}
			echo json_encode($response);
		}elseif($method=="PUT"){
			$response=[];
			
			if(!isset($data["cname"]) || !isset($data["address"]) || !isset($data["city"]) || !isset($data["contact"]) || !isset($data["type"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if(isset($params["cid"])){
				if($db->customerSingle($params["cid"])){
					if($edit=$db->customerEdit($params["cid"],$data)){
						$response=[
						"status"=>true,
						"msg"=>"customer Edited Successfully",
						];
					}else{
						$response=[
						"status"=>false,
						"error"=>"customer Edit Failed",
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
			if(isset($params["cid"])){
				if($row=$db->customerDelete($params["cid"])){
					$response=[
					"status"=>true,
					"msg"=>"customer Deleted Successfully",
					];
				}
				else{
					$response=[
					"status"=>false,
					"error"=>"customer Delete Failed",
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