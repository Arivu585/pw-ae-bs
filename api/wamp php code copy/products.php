<?php
	require"app/config.php";
	require"app/database.php";
	require"products_db.php";
	
	$db = new productsDB();
	
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
			if(isset($params["pid"])){
				if($row=$db->productSingle($params["pid"])){
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
				if($rows=$db->productAll()){
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
			
			if(!isset($data["pname"]) || !isset($data["rate"]) || !isset($data["code"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if($db->productAdd($data)){
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
			
			if(!isset($data["pname"]) || !isset($data["rate"]) || !isset($data["code"])){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if(isset($params["pid"])){
				if($db->productSingle($params["pid"])){
					if($edit=$db->productEdit($params["pid"],$data)){
						$response=[
						"status"=>true,
						"msg"=>"Product Edited Successfully",
						];
					}else{
						$response=[
						"status"=>false,
						"error"=>"Product Edit Failed",
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
			if(isset($params["pid"])){
				if($row=$db->productDelete($params["pid"])){
					$response=[
					"status"=>true,
					"msg"=>"Product Deleted Successfully",
					];
				}
				else{
					$response=[
					"status"=>false,
					"error"=>"Product Delete Failed",
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