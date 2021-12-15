$(document).ready(function () {
          
    $('#home').click(function(){
        home()
    })

    $('#about').click(function(){
        about()
    })

    $('#contact').click(function(){
        contact()
    })
})

  function home() {
      $('section').html('<h1>More NEWSSS</h1>')
  }

  function about() {
    $('section').html('<h1>ALO galera</h1>')
  }

  function contact() {
      $('section').load('views/contact.html')
  }

  function contact() {
      $('section').load('views/contact.html', function(){
        $('#btnContact').click(function(){
            let name = $('#name').val()
            let email = $('#email').val()
            let phone = $('#phone').val()
            let cep = $('#cep').val()
            let subject= $('#subject').val()

            getLocal(cep, function(local){
                let contact = new Contact(name, email, phone, cep, 
                subject, local)
                $('section').load('views/contactView.html', function(){
                    $('#name').html(contact.name)
                    $('#email').html(contact.email)
                    $('#phone').html(contact.phone)
                    $('#subject').html(contact.subject)
                    $('#local').html(contact.local)
                })
            })
        })
    })
  }

  class Contact {
      constructor(_name, _email, _phone, _cep, _subject, _local) {
            this.name = _name
            this.email = _email
            this.phone = _phone
            this.cep = _cep
            this.subject = _subject
            this.local = _local
        }
  }

  function getLocal(cep, callBack) {
      $.getJSON('http://viacep.com.br/ws/'+cep+'/json', function
      (data){
            return callBack(data.localidade)
      })
  }