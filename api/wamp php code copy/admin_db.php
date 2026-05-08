<?php
	class adminDB{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function adminSingle($id){
			$this->db->query("select * from tbl_admin where aid=:id");
			$this->db->bind(":id",$id);
			return $this->db->single();
		}
		
		public function adminPassEdit($id,$info){
			$this->db->query("update tbl_admin set apass=:a where aid=:id");
			$this->db->bind(":id",$id);
			$this->db->bind(":a",$info["pass"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
	}
?>