<?php
	require"app/config.php";
	require"app/database.php";
	require"invoice_db.php";
	
	$db = new invoiceDB();
	
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
			if(isset($params["iid"])){
				if($row=$db->invoiceSingle($params["iid"])){
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
			}else if(isset($params["pay"])){
				if($row=$db->invoicepay($params["pay"])){
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
			}else if(isset($params["cid"])){
				if($row=$db->invoiceCreditAll($params["cid"])){
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
			}else{
				if($rows=$db->invoiceAll()){
					$response=[
					"status"=>true,
					"data"=>$rows,
					"count"=>count($rows),
					];
				}else{
					$response=[
					"status"=>false,
					"error"=>"No Records",
					"count"=>count($rows),
					];
				}
			}
			echo json_encode($response);
		}elseif($method=="POST"){
			$response=[];
			
			if(!isset($data["ino"]) || !isset($data["idate"]) || !isset($data["bcid"]) || !isset($data["scid"]) || !isset($data["products"]) || !isset($data["ipay"]) || !isset($data["itotal"]) || !isset($data["ipaid"]) || !isset($data["ipend"]) ){
				$response=[
				"status"=>false,
				"error"=>"Missing required fields",
				];
			}
			
			if($db->invoiceAdd($data)){
				$response=[
				"status"=>true,
				"msg"=>"invoice Added Successfully",
				];
			}
			else{
				$response=[
				"status"=>false,
				"error"=>"invoice Add Failed",
				];
			}
			echo json_encode($response);
		}elseif($method=="PUT"){
			$response=[];
			
			if(isset($params["iid"])){
				if($db->invoiceSingle($params["iid"])){
					if(!isset($data["ino"]) || !isset($data["idate"]) || !isset($data["bcid"]) || !isset($data["scid"]) || !isset($data["products"]) || !isset($data["ipay"]) || !isset($data["itotal"]) || !isset($data["ipaid"]) || !isset($data["ipend"]) ){
						$response=[
							"status"=>false,
							"error"=>"Missing required fields",
						];
					}
					
					if($edit=$db->invoiceEdit($params["iid"],$data)){
						$response=[
						"status"=>true,
						"msg"=>"invoice Edited Successfully",
						];
					}
					else{
						$response=[
						"status"=>false,
						"error"=>"invoice edit Failed",
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
			if(isset($params["iid"])){
				if($row=$db->invoiceDelete($params["iid"])){
					$response=[
					"status"=>true,
					"msg"=>"Invoice Deleted Successfully",
					];
				}
				else{
					$response=[
					"status"=>false,
					"error"=>"Invoice Delete Failed",
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