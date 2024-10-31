

//+------------------------------------------------------------------+

//| Expert initialization function |

//+------------------------------------------------------------------+

input string inputFile = "hello.txt";
input string inputDirec = "Files";

//+------------------------------------------------------------------+
//| |
//+------------------------------------------------------------------+
int OnInit()
{


ResetLastError() ;

int fileHandle = FileOpen(inputFile, FILE_WRITE | FILE_TXT | FILE_CSV, ';');

FileSeek(fileHandle,0,SEEK_END)  ;
if(fileHandle != INVALID_HANDLE)
{

PrintFormat("hello file is available for reading. File name is " + inputFile) ;

FileWrite(fileHandle, AccountBalance()) ;
FileWrite(fileHandle, AccountEquity())  ;


FileClose(fileHandle) ;

PrintFormat("data is read and file will be closed",inputFile);

}

else
{

PrintFormat("failed to open file, error ID is: " + GetLastError()) ;

}

//---

return(INIT_SUCCEEDED) ;

}

//+------------------------------------------------------------------+

//| Expert deinitialization function |

//+------------------------------------------------------------------+

void OnDeinit(const int reason)

{

//---

}

//+------------------------------------------------------------------+

//| Expert tick function |

//+------------------------------------------------------------------+

void OnTick()

{

//---


ResetLastError() ;

int fileHandle=FileOpen("hello.txt",FILE_WRITE|FILE_TXT,';');

if(fileHandle != INVALID_HANDLE)
{
FileSeek(fileHandle,0,SEEK_END)                                               ;
PrintFormat("hello file is available for reading. File name is " + inputFile) ;

FileWrite(fileHandle, "Ticket", "Symbol", "Type", "Lots", "OpenPrice", "ClosePrice", "Profit", "OpenTime", "CloseTime");

int totalOrders = OrdersHistoryTotal()                                                           ;
for(int i = 0                                                                                    ; i < totalOrders; i++)
{
if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY)) 
{
int orderType = OrderType()                                                                      ;
string typeString = (orderType == OP_BUY) ? "BUY" : (orderType == OP_SELL) ? "SELL" : "UNKNOWN";

FileWrite(fileHandle,
OrderTicket(),
OrderSymbol(),
typeString,
OrderLots(),
OrderOpenPrice(),
OrderClosePrice(),
OrderProfit(),
TimeToString(OrderOpenTime()),
TimeToString(OrderCloseTime())) ;
}
}
;



FileClose(fileHandle) ;

PrintFormat("data is read and file will be closed",inputFile);

}

else
{

PrintFormat("failed to open file, error ID is: " + GetLastError()) ;

}

//---

}

//+------------------------------------------------------------------+
//+------------------------------------------------------------------+
