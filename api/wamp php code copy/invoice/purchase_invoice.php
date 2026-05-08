<?php
	include"_config.php";
	
	require("fpdf/fpdf.php");
	
	header("Access-Control-Allow-Origin:*");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	
	class PDF extends fpdf
	{
		function body()
		{
			$this->SetY(12);
			$this->SetFont("Arial","B",10);
			$this->Cell(30,5,"Bill No",0,0,"L");
			$this->Cell(2,5,":",0,0,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(0,5,$this->datas["bcustomer"]["phno"],0,0,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(0,5,"Cell : 89002 37789",0,1,"R");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(30,5,"Purchase Date",0,0,"L");
			$this->Cell(2,5,":",0,0,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(0,5,$this->datas["bcustomer"]["phdate"],0,1,"L");
			
			$this->SetFont("Arial","B",20);
			$this->Cell(0,6,"VR BILLING SOFTWARE",0,1,"C");
			
			$this->SetFont("Arial","",10);
			$this->Cell(0,6,"2nd Floor, Navanidhi Complex, AVR Circle, Junction Main Rd, Salem - 636005",0,1,"C");
			$this->Cell(0,6,"Email : vrsofttech.contact@gmail.com",0,1,"C");
			
			$this->SetFont("Arial","B",15);
			$this->Cell(0,8,"PURCHASE INVOICE","TB",1,"C");
			
			$this->SetFont("Arial","B",12);
			$this->Cell(95,10,"Bill From:",0,1,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(85,5,$this->datas["bcustomer"]["cname"],0,1,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(85,5,$this->datas["bcustomer"]["city"],0,1,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(85,5,$this->datas["bcustomer"]["address"],0,1,"L");
			
			$this->SetFont("Arial","B",11);
			$this->Cell(20,10,"SNo",1,0,"C");
			$this->Cell(75,10,"Product Name",1,0,"C");
			$this->Cell(35,10,"QTY",1,0,"C");
			$this->Cell(30,10,"Rate",1,0,"C");
			$this->Cell(30,10,"Amount",1,1,"C");
			
			foreach($this->datas["product"] as $i=>$row)
			{
				$i++;
				$this->SetFont("Arial","",12);
				$this->Cell(20,10,$i,"LR",0,"C");
				$this->Cell(75,10,$row["pname"],"LR",0,"L");
				$this->Cell(35,10,$row["qty"],"LR",0,"C");
				$this->Cell(30,10,$row["phrate"],"LR",0,"R");
				$this->Cell(30,10,$row["rtotal"],"LR",1,"R");
			}
			
			$this->SetFont("Arial","",12);
			$this->Cell(20,10," ","LR",0,"C");
			$this->Cell(75,10," ","LR",0,"L");
			$this->Cell(35,10," ","LR",0,"C");
			$this->Cell(30,10," ","LR",0,"R");
			$this->Cell(30,10," ","LR",1,"R");
			
			$this->SetFont("Arial","B",11);
			$this->Cell(130,10,"Amount In Words","TRL",0,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(30,10,"Net Amount",1,0,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(30,10,$this->datas["bcustomer"]["phtotal"],1,1,"R");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,10,"",0,0,"C");
			$this->Cell(120,10,"--- Rupees Only",0,1,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(190,5,"","B",0,"C");	
			$this->Ln();
		}
		function Footer()
		{
			$this->Sety(-70);
			$this->SetFont("Arial","B",12);
			$this->Cell(0,8,"Declaration",0,1,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(0,2,"We declare that invoice shows the actual price of the goods described and that all particulars are true and correct.",0,1,"L");
			
			$this->SetFont('Arial','B',12);
			$this->Cell(0,15,"Bank Details:",0,1,"L");
			
			$this->SetFont('Arial','B',12);
			$this->Cell(120,5,"VR BILLING SOFTWARE",0,0,"L");
			$this->Cell(0,5,"For VR BILLING SOFTWARE",0,1,"L");
			
			$this->SetFont('Arial','B',10);
			$this->Cell(20,5,"Bank Name",0,0,"L");
			$this->Cell(1,5,":",0,0,"L");
			$this->SetFont('Arial','',10);
			$this->Cell(1,5," UNION BANK OF INDIA",0,1,"L");
			
			$this->SetFont('Arial','B',10);
			$this->Cell(20,5,"A/c. No",0,0,"L");
			$this->Cell(1,5,":",0,0,"L");
			$this->SetFont('Arial','',10);
			$this->Cell(1,5," 584101010050371",0,1,"L");
			
			$this->SetFont('Arial','B',10);
			$this->Cell(20,5,"IFSC Code",0,0,"L");
			$this->Cell(1,5,":",0,0,"L");
			$this->SetFont('Arial','',10);
			$this->Cell(1,5," UBIN0558419",0,1,"L");
			
			$this->SetFont('Arial','B',10);
			$this->Cell(20,5,"Branch",0,0,"L");
			$this->Cell(1,5,":",0,0,"L");
			$this->SetFont('Arial','',10);
			$this->Cell(100,5," HASTHAMPATTI",0,0,"L");
			
			$this->SetFont('Arial','B',11);
			$this->Cell(50,8,"Authorized Signature",0,1,"L");
			
		}
	}
	$sql="select * from tbl_purchase ph inner join tbl_customer c on ph.bcid=c.cid where ph.phid='{$_GET["id"]}'";
	$res=$con->query($sql);
	$in["bcustomer"]=$res->fetch_assoc();
	
	$sql="select * from tbl_purchase ph inner join tbl_purchase_products php on ph.phid=php.phid inner join tbl_products p on p.pid=php.pid where ph.phid='{$_GET["id"]}'";
	$res=$con->query($sql);
	
	while($row=$res->fetch_assoc())
	{
		$in["product"][] =$row;
	}
	
	$pdf=new PDF("P","mm","A4");
	$pdf->AddPage();
	$pdf->datas=$in;
	$pdf->rect(10,10,190,280);
	$pdf->body();
	$pdf->Output();
?>