$(document).ready(function () {
    $('#sponsor-us').on('click', function (e) {
        $('#sponsor-form').toggleClass('active')
    })

    $('#fresh-meat-button').on('click', function (e) {
        console.log('butts')
        $('#fresh-meat-form').toggleClass('active') 
    })
})
