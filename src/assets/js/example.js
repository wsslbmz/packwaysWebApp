export function test() {
    console.log('test');
    /* var ajaxJson = $.getJSON( "https://raw.githubusercontent.com/marwein/tunisia/master/tunisia.json")
  .complete(function( data ) {
      var json = (data.responseJSON);
      var gouvernorat = $( '#gouvernorat' );
      var delegation = $( '#delegation' );

        $.each( json , function (index, value)
        {
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
  }); */			
}