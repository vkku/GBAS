var submissionSSKey = '1V1IQl0Baxlk576QEMGiXoeyaY3Rqnl_i18SOj8mwzek';
var folderId = "0B1mLcnk8kTFURjB2V2VOSExTZ2M";
var x = 0;
var filesUploaded = [];
var zone, building;

function doGet(e) {
  return HtmlService
    .createTemplateFromFile('Form')
    .evaluate() // evaluate MUST come before setting the Sandbox mode
    .setTitle('GBAS-CSV-Upload');
  
}


function sheetLog(formData)
{
  Logger.log(formData)
  var sheet = SpreadsheetApp.openById(submissionSSKey).getSheets()[0];
  var lastRow = sheet.getLastRow();
  var targetRange = sheet.getRange(lastRow+1, 1, 1, 2).setValues([[formData[0],formData[1]]]);
  //sheet.getRange(lastRow+1, 1, 1, 2).setValues([[formData[0],formData[1]]]);
}



function uploadFileToDrive(data,base64Data, fileName) {
  //Logger.log(myForm.zone);
  try{
    var splitBase = base64Data.split(','),
        type = splitBase[0].split(';')[0].replace('data:','');

    var byteCharacters = Utilities.base64Decode(splitBase[1]);
    var ss = Utilities.newBlob(byteCharacters, type);
    ss.setName(fileName);

    var dropbox = "uploadedCSV"; // Folder Name
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }
    var file = folder.createFile(ss); //the document to be written
    var sheet = SpreadsheetApp.openById(submissionSSKey).getSheets()[0];
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow+1, 1, 1, 8).setValues([[data[0],data[1],data[2],data[3],data[4],file,file.getUrl(),data[5]]]);
    /*here
    
    // Fill in response template
    if(x == 0)
    {
  //var template = HtmlService.createTemplateFromFile('Thanks.html');
  var name = template.name = form.zone;
  var department = template.department = asForm.building;
  var message = template.message = asForm.propertyAddress;
  var email = template.email = asForm.projectDescription;     
      x++;
    }
  var fileUrl = template.fileUrl = file.getUrl();

  // Record submission in spreadsheet
  var sheet = SpreadsheetApp.openById(submissionSSKey).getSheets()[0];
  var lastRow = sheet.getLastRow();
    if(x == 1)
  var targetRange = sheet.getRange(lastRow+1, 1, 1, 5).setValues([[name,department,message,email,fileUrl]]);
    else
      var targetRange = sheet.getRange(lastRow+1, 1, 1, 1).setValues([[fileUrl]]);

  // Return HTML text for display in page.
  return template.evaluate().getContent();
  
  //here
    */
    //return file.getName();
  }catch(e){
    return 'Error: ' + e.toString();
  }
}
