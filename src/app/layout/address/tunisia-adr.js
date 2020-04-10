export var globalJsVarUp = [];
export function loadAdrOfTunisia(gouvernorat, delegation) {
    console.log('testtttvvvv');    
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) { 
      console.log('testtttvvvv111');       
        var json = (data);              
        $.each( json , function (index, value)
        {          
          gouvernorat.append('<option value="' + index + '">' +  index  + '</option>');          
        });

        /* gouvernorat.change( function()
        {
            var gouv = $(this).val();            
            var deleg = json[ gouv ];

            $('option', delegation).remove();
            delegation.append('<option value="">-- Delegation --</option>');

            $.each( deleg, function (index, value)
            {
              delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');              
            });
        }); */
  });			
}

export function getDelegFromGov(valGov, delegation, valZp, tunisiaData) {  
  var ville = null;
  console.log('valZp: ', valZp);
  if ((valZp.length == 4) && (is_int(valZp))) {
    globalJsVarUp = [];
    console.log('1111111');
    var keyNum = parseInt(valZp);
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {
      var json = (data);
      var deleg = json[ valGov ];
      //$('option', delegation).remove();
      //delegation.append('<option value="">-- Delegation --</option>');
      $.each( deleg, function (index, value){
        var cpNum = parseInt(value['cp']);
        if (cpNum === keyNum) {
          //delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>'); 
          var adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'];
          globalJsVarUp.push(adr); 
          ville = value['delegation'] + ', ' + value['cp'];                
        }  
      });
      
    });
  } else {
    globalJsVarUp = [];
    console.log('222222');
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {
      var json = (data);
      var deleg = json[ valGov ];
      //$('option', delegation).remove();
      //delegation.append('<option value="">-- Delegation --</option>');
      $.each( deleg, function (index, value){
            //delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');  
            var adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'];
            globalJsVarUp.push(adr); 
            ville = value['delegation'] + ', ' + value['cp'];                                
      });
    });

  } 
  if(ville != null){
    globalJsVarUp.unshift(ville);
  } 
}

export function getAdrFromIndex(indexGov, indexDeleg, zp, address) {
  console.log('testtttvvvv22');
  $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {
    console.log('testtttvvvv2211'); 
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

export function findAdrByZipCode(key, gouvernorat, delegation, address, zip) {
  var ville = null;
  zip.keyup(function() {
    delegation.val('');
    globalJsVarUp = [];
    var el = $(this);
  
    if ((el.val().length == 4) && (is_int(el.val()))) {
      /* if(tunisiaData.length > 0){
        tunisiaData.splice(0,tunisiaData.length);
      }  */     
     
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
      //$('option', delegation).remove();
      //delegation.append('<option value="">-- Delegation --</option>');      
      $.each( json , function (index, value)
      {           
        adr = index;
        temp = index;
        var deleg = json[ index ];
        $.each( deleg, function (index, value)
        {  
          var cpNum = parseInt(value['cp']);              
          if (cpNum === keyNum) { 
            if ($.inArray(temp, govArray) === -1) {
              govArray.push(temp);
              gouvernorat.append('<option value="' + temp + '">' +  temp  + '</option>');
            }            
            
            if (govArray[0] === temp) {
              //delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');
              var adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'];
              globalJsVarUp.push(adr);
              ville = value['delegation'] + ', ' + value['cp'];
            }
            gov = '';
            gov = temp;
            adr = value['localite'] + ', ' + value['delegation'] + ', ' + value['cp'] + ', ' + adr;            
          }        

        });
                
      }); 
      if(ville != null){
        globalJsVarUp.unshift(ville);
      }
      //var optionText = $("#delegationUp option:selected").text();
      //console.log("Selected Option Text: "+optionText);
      //address2 = optionText + ' ' + gov;
      //console.log('address2 ', address2);
      address.val(address2);
      //gouvernorat.append('<option value="' + gov + '">' +  gov  + '</option>');   
    });
   
    } else {
      loadAdrOfTunisia(gouvernorat, delegation);
    }
  
  });

  /* var options = {
    url: "https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json",
  
    getValue: "delegation",
  
    list: {
      match: {
        enabled: true
      }
    }
  };
  
  gouvernorat2.easyAutocomplete(options); */
  

}

function is_int(value){ 
  if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
    return true;
  } else { 
    return false;
  } 
}
