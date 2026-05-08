<?php
	class Admin{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function login($name,$pass){
			$this->db->query("select * from tbl_admin where aname=:name and apass=:pass");
			$this->db->bind(":name",$name);
			$this->db->bind(":pass",$pass);
			
			return $this->db->single();
		}
		
		
	}
?>