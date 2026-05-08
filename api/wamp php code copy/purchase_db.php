<?php
	class invoiceDB{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function purchaseAdd($info){
			$this->db->query("insert into tbl_purchase (phno,phdate,bcid,phtotal,phpaid,phpend,phpay) values (:a,:b,:c,:d,:e,:f,:g)");
			$this->db->bind(":a",$info["phno"]);
			$this->db->bind(":b",$info["phdate"]);
			$this->db->bind(":c",$info["bcid"]);
			$this->db->bind(":d",$info["phtotal"]);
			$this->db->bind(":e",$info["phpaid"]);
			$this->db->bind(":f",$info["phpend"]);
			$this->db->bind(":g",$info["phpay"]);
			
			if($this->db->execute()){
				$phid=$this->db->lastInsertId();
				
				for($i=0;$i<count($info["products"]);$i++){
					$this->db->query("insert into tbl_purchase_products (phid,pid,qty,phrate,rtotal) values ('{$phid}',:a,:b,:c,:d)");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["products"][$i]["qty"]);
					$this->db->bind(":c",$info["products"][$i]["phrate"]);
					$this->db->bind(":d",$info["products"][$i]["rtotal"]);
					$this->db->execute();
					
					$this->db->query("insert into tbl_stock (phid,pid,date,phrate,in_stock,stype) values ('{$phid}',:a,:b,:c,:d,'Purchase')");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["phdate"]);
					$this->db->bind(":c",$info["products"][$i]["phrate"]);
					$this->db->bind(":d",$info["products"][$i]["qty"]);
					$this->db->execute();
				}
				return true;
			}else{
				return false;
			}
		}
		
		public function purchaseEdit($id,$info){
			$this->db->query("delete from tbl_purchase_products where phid=:phid");
			$this->db->bind(":phid",$id);
			$this->db->execute();
			$this->db->query("delete from tbl_stock where phid=:phid");
			$this->db->bind(":phid",$id);
			$this->db->execute();
			
			$this->db->query("update tbl_purchase set phno=:a,phdate=:b,bcid=:c,phtotal=:d,phpaid=:e,phpend=:f,phpay=:g where phid=:phid");
			$this->db->bind(":phid",$id);
			$this->db->bind(":a",$info["phno"]);
			$this->db->bind(":b",$info["phdate"]);
			$this->db->bind(":c",$info["bcid"]);
			$this->db->bind(":d",$info["phtotal"]);
			$this->db->bind(":e",$info["phpaid"]);
			$this->db->bind(":f",$info["phpend"]);
			$this->db->bind(":g",$info["phpay"]);
			if($this->db->execute()){
				$phid=$id;
				for($i=0;$i<count($info["products"]);$i++){
					$this->db->query("insert into tbl_purchase_products (phid,pid,qty,phrate,rtotal) values ('{$phid}',:a,:b,:c,:d)");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["products"][$i]["qty"]);
					$this->db->bind(":c",$info["products"][$i]["phrate"]);
					$this->db->bind(":d",$info["products"][$i]["rtotal"]);
					$this->db->execute();
					
					$this->db->query("insert into tbl_stock (phid,pid,date,phrate,in_stock,stype) values ('{$phid}',:a,:b,:c,:d,'Purchase')");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["phdate"]);
					$this->db->bind(":c",$info["products"][$i]["phrate"]);
					$this->db->bind(":d",$info["products"][$i]["qty"]);
					$this->db->execute();
				}
				return true;
			}else{
				return false;
			}
		}
		
		public function purchaseSingle($id){
			$this->db->query("select * from tbl_purchase ph inner join tbl_purchase_products php on ph.phid=php.phid inner join tbl_products p on p.pid=php.pid where ph.phid=:phid");
			$this->db->bind(":phid",$id);
			return $this->db->resultSet();
		}
		
		public function purchasePay($pay){
			$this->db->query("select * from tbl_purchase i inner join tbl_customer c on i.bcid=c.cid where i.phpay=:pay");
			$this->db->bind(":pay",$pay);
			return $this->db->resultSet();
		}
		
		public function purchaseAll(){
			$this->db->query("select * from tbl_purchase i inner join tbl_customer c on i.bcid=c.cid order by phid desc");
			return $this->db->resultSet();
		}
		
		public function purchaseDelete($id){
			$this->db->query("delete from tbl_purchase where phid=:phid");
			$this->db->bind(":phid",$id);
			if($this->db->execute()){
				$this->db->query("delete from tbl_purchase_products where phid=:phid");
				$this->db->bind(":phid",$id);
				if($this->db->execute()){
					$this->db->query("delete from tbl_stock where phid=:phid");
					$this->db->bind(":phid",$id);
					if($this->db->execute()){
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			}
		}
	}
?>