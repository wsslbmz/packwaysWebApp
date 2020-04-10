export var globalJsVar = [];

export function loadGovAndDelegOfTunisia(gouvernorat, delegation, key) {
    console.log('testttt');            
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {        
        var json = (data);              
        $.each( json , function (index, value)
        {          
          gouvernorat.append('<option value="' + index + '">' +  index  + '</option>');          
        });                
  });			
}

export function getDelegFromGov(valGov, delegation, valZp, tunisiaData) {  
  var ville = null;
  console.log('valZp: ', valZp);
  if ((valZp.length == 4) && (is_int(valZp))) {
    globalJsVar = [];
    console.log('1111111');
    var keyNum = parseInt(valZp);
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {
      var json = (data);
      var deleg = json[ valGov ];      
      $.each( deleg, function (index, value){
        var cpNum = parseInt(value['cp']);
        if (cpNum === keyNum) {          
          var adr = value['localite'] + ',  ' + value['delegation'] + ', ' + value['cp'];
          globalJsVar.push(adr); 
          ville = value['delegation'] + ', ' + value['cp'];                
        }  
      });
      
    });
  } else {
    globalJsVar = [];
    console.log('222222');
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {
      var json = (data);
      var deleg = json[ valGov ];      
      $.each( deleg, function (index, value){            
            var adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'];
            globalJsVar.push(adr); 
            ville = value['delegation'] + ', ' + value['cp'];                                
      });
    });

  } 
  if(ville != null){
    globalJsVar.unshift(ville);
  } 
}

export function getGovAndDelegFromIndex(indexGov, indexDeleg, zp, address) {
  $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) { 
    var json = (data);
    var adr = '';      
    $.each( json , function (index, value)
    {     
      if (index == indexGov) {
        var gouv = indexGov;
        adr = index;
      }         
    });
    console.log('indexxxx', adr);
    var deleg = json[ indexGov ];
    $.each( deleg, function (index, value)
    {
      if (index == indexDeleg) {
        adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'] + ', ' + adr;
        address.val(adr);
        zp.val(value['cp']);
      }      
    });
  });
}

export function findGovAndDelegByZipCode(key, gouvernorat, delegation, address, zip, tunisiaData) {  
  var ville = null;
  zip.keyup(function() {
    delegation.val('');
    globalJsVar = [];
    var el = $(this);
  
    if ((el.val().length == 4) && (is_int(el.val()))) {
     
      $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) { 
      var json = (data);
      var adr = '';     
      var gov = '';
      var address2 = '';
      var temp = '';
      var govArray = [];
      key = el.val();
      var keyNum = parseInt(key);
      console.log('keyyy', key);
      $('option', gouvernorat).remove();           
      $.each( json , function (index, value)
      {           
        adr = index;
        temp = index;
        var deleg = json[ index ];
        $.each( deleg, function (index, value)
        {      
          var cpNum = parseInt(value['cp']);    
          if (cpNum === keyNum) {
            console.log('gov temp', temp);
            if ($.inArray(temp, govArray) === -1) {
              govArray.push(temp);
              gouvernorat.append('<option value="' + temp + '">' +  temp  + '</option>');
            }            
            
            if (govArray[0] === temp) {
              //delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');
              var adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'];
              globalJsVar.push(adr);
              ville = value['delegation'] + ', ' + value['cp'];
            }            
            gov = '';
            gov = temp;
            adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'] + ', ' + adr;
            /* var adr2 = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'] + ' ' + adr;
            tunisiaData.push(adr2); */
            //address2 = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'];
            
            //console.log('adrrrr ', adr);
            //return;
          }        

        });
                
      }); 
      if(ville != null){
        globalJsVar.unshift(ville);
      } 
      //var optionText = $("#delegation option:selected").text();
      //console.log("Selected Option Text: "+optionText);
      //address2 = optionText + ' ' + gov;
      //console.log('address2 ', address2);
      address.val(gov);
      //gouvernorat.append('<option value="' + gov + '">' +  gov  + '</option>');   
      console.log('globalJsVar... ', globalJsVar);
      
    });
   
    } else {
      loadGovAndDelegOfTunisia(gouvernorat, delegation);
    }
  
  });  
  

}

function is_int(value){ 
  if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
    return true;
  } else { 
    return false;
  } 
}

export function autocompleteFromJson(delegInput, tunisiaData) {
  delegInput.keyup(function() {
      $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {    
        var json = (data);
        $.each( json , function (index, value)
        {                 
          var deleg = json[ index ];
          $.each( deleg, function (index, value)
          {                                                                      
              var adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'];
              tunisiaData.push(adr);                       
          });
                  
        });
      });
  });
  
}
