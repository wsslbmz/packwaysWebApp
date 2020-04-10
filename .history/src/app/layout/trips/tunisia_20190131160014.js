export function loadGovAndDelegOfTunisia(gouvernorat, delegation) {
    console.log('testttt');    
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {        
        var json = (data);              
        $.each( json , function (index, value)
        {          
          gouvernorat.append('<option value="' + index + '">' +  index  + '</option>');          
        });

        gouvernorat.change( function()
        {
            var gouv = $(this).val();            
            var deleg = json[ gouv ];

            $('option', delegation).remove();
            delegation.append('<option value="">-- Delegation --</option>');

            $.each( deleg, function (index, value)
            {
              delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');              
            });
        });
  });			
}

export function getGovAndDelegFromIndex(indexGov, indexDeleg, address) {
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
        adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'] + ' ' + adr;
        address.val(adr);
      }      
    });
  });
}

export function findGovAndDelegByZipCode(key, gouvernorat, delegation, address, zip) {
  zip.keyup(function() {
    var el = $(this);
  
    if ((el.val().length == 4) && (is_int(el.val()))) {
     
      $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) { 
      var json = (data);
      var adr = '';     
      var gov = '';
      var address2 = '';
      var temp = '';
      key = el.val();
      console.log('keyyy', key);
      $('option', gouvernorat).remove();
      $('option', delegation).remove();
      $.each( json , function (index, value)
      {           
        adr = index;
        temp = index;
        var deleg = json[ index ];
        $.each( deleg, function (index, value)
        {                
          if (String(value['cp']) === String(key)) { 
            //address2 = '';                   
            delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');
            gov = '';
            gov = temp;
            adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'] + ' ' + adr;
            //address2 = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'];
            
            //console.log('adrrrr ', adr);
            //return;
          }        

        });
                
      }); 
      var optionText = $("#delegation option:selected").text();
      //console.log("Selected Option Text: "+optionText);
      address2 = optionText + ' ' + gov;
      console.log('address2 ', address2);
      address.val(address2);
      gouvernorat.append('<option value="' + gov + '">' +  gov  + '</option>');   
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