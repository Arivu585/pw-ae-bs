<?php
	class Database
	{
		private $host=HOST_NAME;
		private $user=HOST_USER;
		private $pwd=HOST_PWD;
		private $db=HOST_DB;
		
		public function __construct()
		{
			$con='mysql:host='.$this->host.';
				dbname='.$this->db;
			$options=array(
				PDO::ATTR_PERSISTENT=>true,
				PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION
			);
			try
			{
				$this->con=new PDO($con,$this->user,$this->pwd,$options);
			}
			catch(PDOException $e)
			{
				$this->error=$e->getMessage();
				echo $this->error;
			}
		}
		
		public function begin()
		{
			$this->con->beginTransaction();
		}
		
		public function commit()
		{
			$this->con->commit();
		}
		
		public function rollback()
		{
			$this->con->rollback();
		}
		
		//prepare statement
		
		public function query($sql)
		{
			$this->stmt=$this->con->prepare($sql);
		}
		
		//bind values
		
		public function bind($param,$value,$type=null)
		{
			if(is_null($type))
			{
				switch(true)
				{
					case is_int($value):
						$type=PDO::PARAM_INT;
					break;
					case is_bool($value):
						$type=PDO::PARAM_BOOL;
					break;
					case is_null($value):
						$type=PDO::PARAM_NULL;
					break;
					default:
						$type=PDO::PARAM_STR;
					break;
				}
			}
			$this->stmt->bindvalue($param,$value,$type);
		}
		
		//execute the prepared statement
		public function execute()
		{
			return $this->stmt->execute();
		}
		
		//get result set
		public function resultSet()
		{
			$this->execute();
			return $this->stmt->fetchAll(PDO::FETCH_OBJ);
		}
		
		//get single record
		public function single()
		{
			$this->execute();
			return $this->stmt->fetch(PDO::FETCH_OBJ);
		}
		
		public function rowCount()
		{
			return $this->stmt->rowCount();
		}
		
		//get last insert id
		public function lastInsertId()
		{
			return $this->con->lastInsertId();
		}
		
		
	}
?>