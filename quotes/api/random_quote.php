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
    
    function getFileData(){
        $dir = "assets/quotes/";
        $files = scandir($dir);
        return file_get_contents($dir.$files[rand(0, count($files)-1)]);
    }
    
    function splitByLine($data) {
        return explode(PHP_EOL, $data);
    }

    
   
	$lines = splitByLine(getFileData());
    
    $randomLine = $lines[rand(0, count($lines)-1)];
    $quote = new Quote($randomLine);
    
    header('Content-Type: application/json');
    echo json_encode($quote->toArray(), true);
    
    
?>