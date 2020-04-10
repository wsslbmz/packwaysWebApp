export function loadGovAndDelegOfTunisia(gouvernorat, delegation) {
    console.log('testttt');    
    $.getJSON('https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json', function (data) {        
        var json = (data);      
        $.each( json , function (index, value)
        {
          console.log(index);
          gouvernorat.append('<option value="' + index + '">' +  index  + '</option>');
        });

        gouvernorat.change( function()
        {
            var gouv = $(this).val();
            alert(gouv);
            var deleg = json[ gouv ];

            $('option', delegation).remove();
            delegation.append('<option value="">-- Delegation --</option>');

            $.each( deleg, function (index, value)
            {
              delegation.append('<option value="' + index + '">' + value['cp'] + ' - ' +  value['localite'] + ' - ' + value['delegation'] + '</option>');
            });
        });
  });			
}