<?php
	class productsDB{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function productAdd($info){
			$this->db->query("insert into tbl_products (pname,rate,code) values (:a,:b,:c)");
			$this->db->bind(":a",$info["pname"]);
			$this->db->bind(":b",$info["rate"]);
			$this->db->bind(":c",$info["code"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
		public function productSingle($id){
			$this->db->query("select * from tbl_products where pid=:pid");
			$this->db->bind(":pid",$id);
			return $this->db->single();
		}
		
		public function productAll(){
			$this->db->query("select * from tbl_products");
			return $this->db->resultSet();
		}
		
		public function productEdit($id,$info){
			$this->db->query("update tbl_products set pname=:a,rate=:b,code=:c where pid=:pid");
			$this->db->bind(":pid",$id);
			$this->db->bind(":a",$info["pname"]);
			$this->db->bind(":b",$info["rate"]);
			$this->db->bind(":c",$info["code"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
		public function productDelete($id){
			$this->db->query("delete from tbl_products where pid=:pid");
			$this->db->bind(":pid",$id);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
	}
?>