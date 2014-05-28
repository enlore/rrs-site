$(document).ready(function () {
    // time to validate!
    $form = $('#sponsor-form form')  
    $form.on('submit', function (e) {
        e.preventDefault() 

        $this = $(e.target)

        var errors = false
        if ($this.find('[name=business_name]').val() === '') {
            console.log('Need to know your business\' name!')
            errors = true
        }

        if ($this.find('[name=individual_name]').val() === '') {
            console.log('Tell us who you are!')
            errors = true
        }

        var $address = $this.find('input[name=address]')
        if ($address.val() === '') {
            $form.find('#address-flash').addClass('active')
            $address.addClass('error')
            console.log('Please provide an address.')
            errors = true
        }

        if ($this.find('[name=zip_code]').val() === '') {
            console.log('We definitely need your zip code.')
            errors = true
        }

        if ($this.find('[name=business_phone]').val() === '' && $this.find('[name=cell_phone]').val() === '') {
            console.log('Can you give us at least one phone number?')
            errors = true
        }

        if (errors) 
            return

        console.log('woo we caught the event')
        e.target.submit()
    })

    $('#sponsor-us').on('click', function (e) {
        $('#sponsor-form').toggleClass('active')
    })

    $('#fresh-meat-button').on('click', function (e) {
        console.log('butts')
        $('#fresh-meat-form').toggleClass('active') 
    })
})
