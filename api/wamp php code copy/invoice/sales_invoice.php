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
			$this->Cell(25,5,"Invoice No",0,0,"L");
			$this->Cell(2,5,":",0,0,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(0,5,$this->datas["bcustomer"]["ino"],0,0,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(0,5,"Cell : 89002 37789",0,1,"R");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(25,5,"Invoice Date",0,0,"L");
			$this->Cell(2,5,":",0,0,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(0,5,$this->datas["bcustomer"]["idate"],0,1,"L");
			
			$this->SetFont("Arial","B",20);
			$this->Cell(0,6,"VR BILLING SOFTWARE",0,1,"C");
			
			$this->SetFont("Arial","",10);
			$this->Cell(0,6,"2nd Floor, Navanidhi Complex, AVR Circle, Junction Main Rd, Salem - 636005",0,1,"C");
			$this->Cell(0,6,"Email : vrsofttech.contact@gmail.com",0,1,"C");
			
			$this->SetFont("Arial","B",15);
			$this->Cell(0,8,"SALES INVOICE","TB",1,"C");
			
			$this->SetFont("Arial","B",12);
			$this->Cell(95,10,"Bill To:","R",0,"L");
			
			$this->SetFont("Arial","B",12);
			$this->Cell(0,10,"Ship To:",0,1,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(85,5,$this->datas["bcustomer"]["cname"],"R",0,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(0,5,$this->datas["scustomer"]["cname"],0,1,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(85,5,$this->datas["bcustomer"]["city"],"R",0,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(0,5,$this->datas["scustomer"]["city"],0,1,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(85,5,$this->datas["bcustomer"]["address"],"R",0,"L");
			
			$this->SetFont("Arial","",10);
			$this->Cell(10,5,"",0,0,"L");
			$this->Cell(0,5,$this->datas["scustomer"]["address"],0,1,"L");
			
			$this->SetFont("Arial","B",11);
			$this->Cell(20,10,"SNo",1,0,"C");
			$this->Cell(75,10,"Product Name",1,0,"C");
			$this->Cell(35,10,"QTY",1,0,"C");
			$this->Cell(30,10,"Rate",1,0,"C");
			$this->Cell(30,10,"Amount",1,1,"C");
			
			$no_lines=0;
			foreach($this->datas["product"] as $i=>$row)
			{
				$i++;
				$no_lines++;
				$this->SetFont("Arial","",12);
				$this->Cell(20,10,$i,"LR",0,"C");
				$this->Cell(75,10,$row["pname"],"LR",0,"L");
				$this->Cell(35,10,$row["qty"],"LR",0,"C");
				$this->Cell(30,10,$row["rate"],"LR",0,"R");
				$this->Cell(30,10,$row["rtotal"],"LR",1,"R");
			}
			
			for($i=0;$i<11-$no_lines;$i++)
			{
				$this->SetFont("Arial","",8);
				$this->Cell(20,10," ","LR",0,"C");
				$this->Cell(75,10," ","LR",0,"L");
				$this->Cell(35,10," ","LR",0,"C");
				$this->Cell(30,10," ","LR",0,"R");
				$this->Cell(30,10," ","LR",1,"R");
			}
			
			$this->SetFont("Arial","B",11);
			$this->Cell(130,10,"Amount In Words","TRL",0,"L");
			
			$this->SetFont("Arial","B",10);
			$this->Cell(30,10,"Net Amount",1,0,"L");
			$this->SetFont("Arial","",10);
			$this->Cell(30,10,$this->datas["bcustomer"]["itotal"],1,1,"R");
			
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
			$this->Cell(50,5," HASTHAMPATTI",0,0,"L");
			
			$this->SetFont('Arial','B',11);
			$this->Cell(60,8,"Customer Signature",0,0,"L");
			
			$this->SetFont('Arial','B',11);
			$this->Cell(50,8,"Authorized Signature",0,1,"L");
			
		}
	}
	$sql="select * from tbl_invoice i inner join tbl_customer c on i.bcid=c.cid where i.iid='{$_GET["id"]}'";
	$res=$con->query($sql);
	$in["bcustomer"]=$res->fetch_assoc();
	
	$sql="select * from tbl_invoice i inner join tbl_customer c on i.scid=c.cid where i.iid='{$_GET["id"]}'";
	$res=$con->query($sql);
	$in["scustomer"]=$res->fetch_assoc();
	
	$sql="select * from tbl_invoice i inner join tbl_invoice_products ip on i.iid=ip.iid inner join tbl_products p on p.pid=ip.pid where i.iid='{$_GET["id"]}'";
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