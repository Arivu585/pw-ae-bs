<?php
	class customerDB{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function customerAdd($info){
			$this->db->query("insert into tbl_customer (cname,address,city,contact,type) values (:a,:b,:c,:d,:e)");
			$this->db->bind(":a",$info["cname"]);
			$this->db->bind(":b",$info["address"]);
			$this->db->bind(":c",$info["city"]);
			$this->db->bind(":d",$info["contact"]);
			$this->db->bind(":e",$info["type"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
		public function customerSingle($id){
			$this->db->query("select * from tbl_customer where cid=:cid");
			$this->db->bind(":cid",$id);
			return $this->db->single();
		}
		
		public function customerType($type){
			$this->db->query("select * from tbl_customer where type=:type");
			$this->db->bind(":type",$type);
			return $this->db->resultSet();
		}
		
		public function customerAll(){
			$this->db->query("select * from tbl_customer");
			return $this->db->resultSet();
		}
		
		public function customerEdit($id,$info){
			$this->db->query("update tbl_customer set cname=:a,address=:b,city=:c,contact=:d,type=:e where cid=:cid");
			$this->db->bind(":cid",$id);
			$this->db->bind(":a",$info["cname"]);
			$this->db->bind(":b",$info["address"]);
			$this->db->bind(":c",$info["city"]);
			$this->db->bind(":d",$info["contact"]);
			$this->db->bind(":e",$info["type"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
		public function customerDelete($id){
			$this->db->query("delete from tbl_customer where cid=:cid");
			$this->db->bind(":cid",$id);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
	}
?>