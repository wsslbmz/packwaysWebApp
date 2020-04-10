export function loadGovAndDelegOfTunisia(gouvernorat, delegation, address) {
    console.log('testttt');    
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {        
        var json = (data);      
        var adr = '';
        $.each( json , function (index, value)
        {          
          gouvernorat.append('<option value="' + index + '">' +  index  + '</option>');
          adr = index;
        });

        gouvernorat.change( function()
        {
            var gouv = $(this).val();            
            var deleg = json[ gouv ];

            $('option', delegation).remove();
            delegation.append('<option value="">-- Delegation --</option>');

            $.each( deleg, function (index, value)
            {
              delegation.append('<option value="' + index + '">' +  value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'] + '</option>');
              adr = value['localite'] + ' ' + value['delegation'] + ' ' + value['cp'] + ' ' + adr;
              address.val(adr);
            });
        });
  });			
}
