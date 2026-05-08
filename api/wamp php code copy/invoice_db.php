<?php
	class invoiceDB{
		private $db;
		
		public function __construct(){
			$this->db = new Database();
		}
		
		public function invoiceAdd($info){
			$this->db->query("insert into tbl_invoice (ino,idate,bcid,scid,itotal,ipaid,ipend,ipay) values (:a,:b,:c,:d,:e,:f,:g,:h)");
			$this->db->bind(":a",$info["ino"]);
			$this->db->bind(":b",$info["idate"]);
			$this->db->bind(":c",$info["bcid"]);
			$this->db->bind(":d",$info["scid"]);
			$this->db->bind(":e",$info["itotal"]);
			$this->db->bind(":f",$info["ipaid"]);
			$this->db->bind(":g",$info["ipend"]);
			$this->db->bind(":h",$info["ipay"]);
			
			if($this->db->execute()){
				$iid=$this->db->lastInsertId();
				for($i=0;$i<count($info["products"]);$i++){
					$this->db->query("insert into tbl_invoice_products (iid,pid,qty,price,rtotal) values ('{$iid}',:a,:b,:c,:d)");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["products"][$i]["qty"]);
					$this->db->bind(":c",$info["products"][$i]["rate"]);
					$this->db->bind(":d",$info["products"][$i]["rtotal"]);
					$this->db->execute();
					$this->db->query("insert into tbl_stock (iid,pid,out_stock,date,stype) values ('{$iid}',:a,:b,:c,'Invoice')");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["products"][$i]["qty"]);
					$this->db->bind(":c",$info["idate"]);
					$this->db->execute();
				}
				return true;
			}else{
				return false;
			}
		}
		
		public function invoiceEdit($id,$info){
			$this->db->query("delete from tbl_invoice_products where iid=:iid");
			$this->db->bind(":iid",$id);
			$this->db->execute();
			$this->db->query("delete from tbl_stock where iid=:iid");
			$this->db->bind(":iid",$id);
			$this->db->execute();
			
			$this->db->query("update tbl_invoice set ino=:a,idate=:b,bcid=:c,scid=:d,itotal=:e,ipaid=:f,ipend=:g,ipay=:h where iid=:iid");
			$this->db->bind(":iid",$id);
			$this->db->bind(":a",$info["ino"]);
			$this->db->bind(":b",$info["idate"]);
			$this->db->bind(":c",$info["bcid"]);
			$this->db->bind(":d",$info["scid"]);
			$this->db->bind(":e",$info["itotal"]);
			$this->db->bind(":f",$info["ipaid"]);
			$this->db->bind(":g",$info["ipend"]);
			$this->db->bind(":h",$info["ipay"]);
			if($this->db->execute()){
				$iid=$id;
				for($i=0;$i<count($info["products"]);$i++){
					$this->db->query("insert into tbl_invoice_products (iid,pid,qty,price,rtotal) values ('{$iid}',:a,:b,:c,:d)");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["products"][$i]["qty"]);
					$this->db->bind(":c",$info["products"][$i]["rate"]);
					$this->db->bind(":d",$info["products"][$i]["rtotal"]);
					$this->db->execute();
					
					$this->db->query("insert into tbl_stock (iid,pid,out_stock,date,stype) values ('{$iid}',:a,:b,:c,'Invoice')");
					$this->db->bind(":a",$info["products"][$i]["pid"]);
					$this->db->bind(":b",$info["products"][$i]["qty"]);
					$this->db->bind(":c",$info["idate"]);
					$this->db->execute();
				}
				return true;
			}else{
				return false;
			}
		}
		
		public function invoiceSingle($id){
			$this->db->query("select * from tbl_invoice i inner join tbl_invoice_products ip on i.iid=ip.iid inner join tbl_products p on p.pid=ip.pid where i.iid=:iid");
			$this->db->bind(":iid",$id);
			return $this->db->resultSet();
		}
		
		public function invoicePay($pay){
			$this->db->query("select *,sum(ipend) as balance from tbl_invoice i inner join tbl_customer c on i.bcid=c.cid where i.ipay=:pay group by c.cid");
			$this->db->bind(":pay",$pay);
			return $this->db->resultSet();
		}
		
		public function invoiceCreditAll($id){
			$this->db->query("select * from tbl_invoice i inner join tbl_customer c on i.bcid=c.cid where i.bcid=:id");
			$this->db->bind(":id",$id);
			return $this->db->resultSet();
		}
		
		public function invoiceAll(){
			$this->db->query("select * from tbl_invoice i inner join tbl_customer c on i.bcid=c.cid order by iid desc");
			return $this->db->resultSet();
		}
		
		public function invoiceDelete($id){
			$this->db->query("delete from tbl_invoice where iid=:iid");
			$this->db->bind(":iid",$id);
			if($this->db->execute()){
				$this->db->query("delete from tbl_invoice_products where iid=:iid");
				$this->db->bind(":iid",$id);
				if($this->db->execute()){
					$this->db->query("delete from tbl_stock where iid=:iid");
					$this->db->bind(":iid",$id);
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