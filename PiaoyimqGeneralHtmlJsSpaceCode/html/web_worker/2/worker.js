﻿onmessage = function(event) {
    //还原整数数组
    var intArray= JSON.parse(event.data);
    var returnStr;
    returnStr="";
    for(var i=0;i<intArray.length;i++)
    {
        //能否被5整除
        if(parseInt(intArray[i])%5==0)    
        {
            if(returnStr!="")
                returnStr+=";";
            //将能被5整除的数字拼接成字符串
            returnStr+=intArray[i];    
        }
    }
    //返回拼接字符串
    postMessage(returnStr); 
    //关闭子线程          
    close();                         
}
