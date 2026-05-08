<?php
	class stockDB{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function stockAdd($info){
			$this->db->query("insert into tbl_stock (date,pid,in_stock,phrate,stype) values (:a,:b,:c,:d,'Stock')");
			$this->db->bind(":a",$info["date"]);
			$this->db->bind(":b",$info["pid"]);
			$this->db->bind(":c",$info["qty"]);
			$this->db->bind(":d",$info["phrate"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
		public function stockSingle($id){
			$this->db->query("select * from tbl_stock s inner join tbl_products p on s.pid=p.pid where sid=:sid and stype='stock' ");
			$this->db->bind(":sid",$id);
			return $this->db->single();
		}
		
		public function stockAll(){
			$this->db->query("select * from tbl_stock s inner join tbl_products p on s.pid=p.pid where stype='stock' order by s.sid desc ");
			return $this->db->resultSet();
		}
		
		public function stockQty($id){
			$this->db->query("select  sum(s.in_stock)-sum(s.out_stock) as cqty,sum(s.in_stock) as tqty,sum(s.out_stock) sqty,p.pid,p.pname from tbl_stock s inner join tbl_products p on s.pid=p.pid group by s.pid");
			return $this->db->resultSet();
		}
		
		public function stockEdit($id,$info){
			$this->db->query("update tbl_stock set date=:a,pid=:b,in_stock=:c,phrate=:d where sid=:sid and stype='stock'");
			$this->db->bind(":sid",$id);
			$this->db->bind(":a",$info["date"]);
			$this->db->bind(":b",$info["pid"]);
			$this->db->bind(":c",$info["qty"]);
			$this->db->bind(":d",$info["phrate"]);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
		
		public function stockDelete($id){
			$this->db->query("delete from tbl_stock where sid=:sid");
			$this->db->bind(":sid",$id);
			if($this->db->execute()){
				return true;
			}else{
				return false;
			}
		}
	}
?>