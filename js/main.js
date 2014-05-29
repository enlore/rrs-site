$(document).ready(function () {
    // time to validate!
    function validatePhoneFields(form) {
        return form.find('input[name="business_phone"]').val() === '' && form.find('input[name="cell_phone"]').val() === ''   
    }

    $form = $('#sponsor-form form')  

    $form.on('submit', function (e) {
        e.preventDefault() 

        $this = $(e.target)
        console.log('bname value: ', $this.find('input[name="business_name"]').val())

        var errors = false

        if ($this.find('input[name="business_name"]').val() === '') {
            console.log('Need to know your business\' name!')

            $this.find('label[name="business_name"]').text('Need to know your business\' name!')
            $this.find('label[name="business_name"]').addClass('error-label')

            $this.find('input[name=business_name]').addClass('error')

            errors = true
        } else {
            $this.find('label[name="business_name"]').removeClass('error-label')
            $this.find('input[name="business_name"]').removeClass('error')
        }

        if ($this.find('input[name="individual_name"]').val() === '') {
            console.log('Tell us who you are!')

            $this.find('label[name="individual_name"]').text('Tell us who you are!')

            $this.find('label[name="individual_name"]').addClass('error-label')
            $this.find('input[name="individual_name"]').addClass('error')

            errors = true
        } else {
            $this.find('label[name="individual_name"]').removeClass('error-label')
            $this.find('input[name="individual_name"]').removeClass('error')
        }

        if (validatePhoneFields($this)) {
            console.log('Can you give us at least one phone number?')

            $this.find('label[name="business_phone"]').text('Can you give us at least one phone number?')
            $this.find('label[name="cell_phone"]').text('Business or cell.')

            $this.find('label[name$="phone"]').addClass('error-label')
            $this.find('input[name$="phone"]').addClass('error')

            errors = true
        } else {
            $this.find('label[name$="phone"]').removeClass('error-label')
            $this.find('input[name$="phone"]').removeClass('error')
             
        }

        if (errors) 
            return errors

        console.log('woo we caught the event')
        e.target.submit()
    })

    // active class togglers
    $('#sponsor-us').on('click', function (e) {
        $('#sponsor-form').toggleClass('active')
    })

    $('#fresh-meat-button').on('click', function (e) {
        $('#fresh-meat-form').toggleClass('active') 
    })
})
