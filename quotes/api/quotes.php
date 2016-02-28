<?php
    class Quote {
        private $quote;
        private $author;
        private $category;
        
        function __construct($raw) 
        {
            $arr = explode(";", $raw);
            $this->quote = isset($arr[0])?$arr[0]:"";
            $this->author = isset($arr[1])?$arr[1]:"";
            $this->category = isset($arr[2])?$arr[2]:"";
        }
        
        public function getAuthor() {
            return $this->author;
        }
        public function getQuote() {
            return $this->quote;
        }
        public function getCategory() {
            return $this->category;
        }
        public function toArray() {
            return array(
                    "author"=>$this->getAuthor(),
                    "quote"=>$this->getQuote(),
                    "category"=>$this->getCategory()
                );
        }
    }

    $dir = "assets/quotes/";
    $files = scandir($dir);
    
    $randomFile = $files[rand(0, count($files)-1)];
    
    $data = file_get_contents($dir.$randomFile);
    
    $quotes = array();
	$lines = explode(PHP_EOL, $data);
	foreach($lines as $line)
	{
       $q = new Quote($line);
	   $quotes[] = $q->toArray();
    }
    
    header('Content-Type: application/json');
    echo json_encode($quotes, true);

?>