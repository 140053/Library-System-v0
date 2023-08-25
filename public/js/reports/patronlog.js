function formatDate(inputDate) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const date = new Date(inputDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
  
    const formattedDate = `${month}-${String(day).padStart(2, '0')}-${year} ${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  
    return formattedDate;
  }

$(document).ready(function() {
    /*
    $('#patronlog').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/api/getLogby",
            "type": "POST"
        },
       // Initialize with an empty array
    }).on('xhr.dt', function (e, settings, json, xhr) {
        console.log('Received JSON:', json); // Log the entire JSON response
        
        
        
        
    });
    */
    $('#patronlog').DataTable( {
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print', 'pageLength'
      ],
      lengthMenu: [
          [ 10, 25, 50, -1 ],
          [ '10 rows', '25 rows', '50 rows', 'Show all' ]
      ],

  } );
    
});
