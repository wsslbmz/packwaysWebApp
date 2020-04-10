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

export function findGovAndDelegByZipCode(key, gouvernorat, delegation) {
  $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) { 
    var json = (data);
    var adr = '';     
    var gov = ''; 
    console.log('keyyy', key);
    $.each( json , function (index, value)
    {     
      gov = index;
      adr = index;
      var deleg = json[ index ];
      $.each( deleg, function (index, value)
      {
        $('option', gouvernorat).remove();
        gouvernorat.append('<option value="' + gov + '">' +  gov  + '</option>');
        if (String(value['cp']) === String(key)) {
          $('option', delegation).remove();
          delegation.append('<option value="' + index + '">' +  value['localite'] + ' - ' + value['delegation'] + ' - ' + value['cp'] + '</option>');
          adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'] + ' ' + adr;
          console.log('adrrrr ', adr);
          //return;
        }

      });
              
    });    
  });

}