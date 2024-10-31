input string inputFile = "balance-and-equity.txt";
int fileHandle;
datetime lastLogTime = 0; 

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   ResetLastError();

   fileHandle = FileOpen("balance-and-equity.txt", FILE_READ | FILE_WRITE | FILE_TXT | FILE_CSV, ';');
   if(fileHandle != INVALID_HANDLE)
   {
      FileSeek(fileHandle, 0, SEEK_END);
      if (FileSize(fileHandle) == 0) 
         FileWrite(fileHandle, "Date", "Account Balance", "Account Equity");
      
      FileClose(fileHandle);
      PrintFormat("File setup complete. Logging to: %s", inputFile);
   }
   else
   {
      PrintFormat("Failed to open file on init. Error ID: %d", GetLastError());
   }

   EventSetTimer(86400);
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Timer function for daily logging                                 |
//+------------------------------------------------------------------+
void OnTimer()
{

  string currentDate = TimeToString(TimeCurrent(), TIME_DATE);

      fileHandle = FileOpen("balance-and-equity.txt", FILE_READ | FILE_WRITE | FILE_TXT | FILE_CSV, ';');
      if (fileHandle != INVALID_HANDLE)
      {
         FileSeek(fileHandle, 0, SEEK_END); 
         FileWrite(fileHandle, TimeToString(TimeCurrent(), TIME_DATE), AccountBalance(), AccountEquity());
         FileClose(fileHandle);
         lastLogTime = currentDate;
         Print("Daily balance logged successfully.");
      }
      else
      {
         PrintFormat("Failed to open file in OnTimer.Error ID: %d", GetLastError());
      }
   
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   EventKillTimer();
}
